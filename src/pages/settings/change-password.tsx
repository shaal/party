import { GetServerSideProps } from 'next'

import ChangePassword from '~/components/Profile/Settings/ChangePassword'
import { authenticatedRoute } from '~/utils/redirects'

export const getServerSideProps: GetServerSideProps = authenticatedRoute

export default ChangePassword
