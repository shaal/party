import Bookmarks from '@components/User/Bookmarks'
import { personalRoute } from '@utils/redirects'
import { GetServerSidePropsContext } from 'next'

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const auth = await personalRoute(context)
  if ('redirect' in auth) return auth

  return { props: {} }
}

export default Bookmarks
