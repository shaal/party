import { GetServerSideProps } from 'next'

import EditProfile from '~/components/EditProfile'
import { authenticatedRoute } from '~/utils/redirects'

export const getServerSideProps: GetServerSideProps = authenticatedRoute

export default EditProfile
