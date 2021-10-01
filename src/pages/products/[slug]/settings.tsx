import Settings from '@components/Product/Settings'
import { authenticatedRoute } from '@utils/redirects'
import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = authenticatedRoute

export default Settings
