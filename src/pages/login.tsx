import { unauthenticatedRoute } from '@utils/redirects'
import { GetServerSideProps } from 'next'

import LoginForm from '../components/Auth/LoginForm'

export const getServerSideProps: GetServerSideProps = unauthenticatedRoute

export default LoginForm
