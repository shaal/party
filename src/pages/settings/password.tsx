import { authenticatedRoute } from '@utils/redirects'
import { GetServerSideProps } from 'next'

import ChangePassword from '../../components/User/Settings/ChangePassword'

export const getServerSideProps: GetServerSideProps = authenticatedRoute

export default ChangePassword
