import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'

import { resolveSession } from './sessions'

export async function unauthenticatedRoute(
  ctx: GetServerSidePropsContext,
  redirect: string = '/home'
) {
  const session = await resolveSession(ctx)

  if (session) {
    return {
      redirect: {
        destination: redirect,
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}

export async function authenticatedRoute(
  ctx: GetServerSidePropsContext,
  redirect = '/login'
): Promise<GetServerSidePropsResult<{}>> {
  const session = await resolveSession(ctx)

  if (!session) {
    return {
      redirect: {
        destination: `${redirect}?redirect=${encodeURIComponent(
          ctx.resolvedUrl
        )}`,
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}

export async function staffRoute(
  ctx: GetServerSidePropsContext,
  redirect = '/'
): Promise<GetServerSidePropsResult<{}>> {
  const session = await resolveSession(ctx)

  if (!session?.isStaff) {
    return {
      redirect: {
        destination: redirect,
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}
