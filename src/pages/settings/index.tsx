import { GetServerSideProps } from 'next'
import { authenticatedRoute } from '~/utils/redirects'
import EditProfile from '~/components/EditProfile'

export const getServerSideProps: GetServerSideProps = authenticatedRoute

export default EditProfile
