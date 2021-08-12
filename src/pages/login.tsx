import { GetServerSideProps } from 'next'
import LoginForm from 'src/components/Auth/LoginForm'
import { unauthenticatedRoute } from 'src/utils/redirects'

export const getServerSideProps: GetServerSideProps = unauthenticatedRoute

export default LoginForm
