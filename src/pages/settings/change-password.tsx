import { GetServerSideProps } from 'next'
import ChangePassword from 'src/components/Profile/Settings/ChangePassword'
import { authenticatedRoute } from 'src/utils/redirects'

export const getServerSideProps: GetServerSideProps = authenticatedRoute

export default ChangePassword
