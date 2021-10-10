import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'

import { resolveSession } from './sessions'

export async function unauthenticatedRoute(
  context: GetServerSidePropsContext,
  redirect: string = '/home'
) {
  const session = await resolveSession(context)

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
  context: GetServerSidePropsContext,
  redirect = '/login'
): Promise<GetServerSidePropsResult<{}>> {
  const session = await resolveSession(context)

  if (!session) {
    return {
      redirect: {
        destination: `${redirect}?redirect=${encodeURIComponent(
          context.resolvedUrl
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
  context: GetServerSidePropsContext,
  redirect = '/'
): Promise<GetServerSidePropsResult<{}>> {
  const session = await resolveSession(context)

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
