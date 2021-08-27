import { GetServerSideProps } from 'next'

import Signup from '~/components/Auth/Signup'
import { unauthenticatedRoute } from '~/utils/redirects'

export const getServerSideProps: GetServerSideProps = unauthenticatedRoute

export default Signup
