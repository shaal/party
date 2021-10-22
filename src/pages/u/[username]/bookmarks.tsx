import Bookmarks from '@components/User/Bookmarks'
import { authenticatedRoute } from '@utils/redirects'
import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = authenticatedRoute

export default Bookmarks
