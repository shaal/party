import Redis from 'ioredis'
import { NextApiRequest, NextApiResponse } from 'next'
import { Octokit } from 'octokit'
import { ERROR_MESSAGE, IS_PRODUCTION } from 'src/constants'

const redis = new Redis(process.env.REDIS_URL)

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { owner, repo, id, warmup } = req.query

  if (warmup) {
    return res.status(200).json({ status: 'Warmed up!' })
  }

  if (owner && repo && id) {
    try {
      const cacheKey = `ghissue-${owner}-${repo}-${id}`
      let cache: any = await redis.get(cacheKey)
      cache = JSON.parse(cache)
      if (cache) {
        res.setHeader('Cache-Control', 'max-age=0, s-maxage=864000')
        return res.status(200).json(cache)
      } else {
        const accessTokens: any = process.env.GITHUB_ACCESS_TOKENS?.split(',')
        const accessToken =
          accessTokens[Math.floor(Math.random() * accessTokens.length)]
        const octokit = new Octokit({ auth: accessToken })
        const issue = await octokit.rest.issues.get({
          owner: owner as string,
          repo: repo as string,
          issue_number: id as any
        })
        redis.set(
          cacheKey,
          JSON.stringify(issue.data),
          'EX',
          IS_PRODUCTION ? 864000 : 5
        )

        res.setHeader('Cache-Control', 'max-age=0, s-maxage=864000')
        return res.status(200).json(issue.data)
      }
    } catch (error: any) {
      return res.status(500).send({
        status: 'error',
        message: ERROR_MESSAGE
      })
    }
  } else {
    return res.status(500).send({
      status: 'error',
      message: 'Owner, Repo and ID is required'
    })
  }
}

export default handler
