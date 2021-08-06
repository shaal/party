import { GetServerSideProps } from 'next'
import { authenticatedRoute } from '~/utils/redirects'
import ChangePassword from '~/components/EditProfile/ChangePassword'

export const getServerSideProps: GetServerSideProps = authenticatedRoute

export default ChangePassword
