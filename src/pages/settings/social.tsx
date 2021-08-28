import { GetServerSideProps } from 'next'

import SocialSettingsPage from '~/components/User/Settings/social'
import { authenticatedRoute } from '~/utils/redirects'

export const getServerSideProps: GetServerSideProps = authenticatedRoute

export default SocialSettingsPage
