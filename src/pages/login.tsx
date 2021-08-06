import { GetServerSideProps } from 'next'

import LoginForm from '~/components/Auth/LoginForm'
import { unauthenticatedRoute } from '~/utils/redirects'

export const getServerSideProps: GetServerSideProps = unauthenticatedRoute

export default LoginForm
