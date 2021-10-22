import Bookmarks from '@components/User/Bookmarks'
import { personalRoute } from '@utils/redirects'
import { GetServerSidePropsContext } from 'next'

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return await personalRoute(context)
}

export default Bookmarks
