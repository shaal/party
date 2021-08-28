import { GetServerSideProps } from 'next'

import SecuritySettings from '~/components/User/Settings/Security'
import { authenticatedRoute } from '~/utils/redirects'

export const getServerSideProps: GetServerSideProps = authenticatedRoute

export default SecuritySettings
