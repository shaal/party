import { GetServerSideProps } from 'next'

import Login from '@components/Auth/Login'
import { unauthenticatedRoute } from '@utils/redirects'

export const getServerSideProps: GetServerSideProps = unauthenticatedRoute

export default Login
