import { GetServerSideProps } from 'next'
import { unauthenticatedRoute } from '~/utils/redirects'
import SignUpForm from '~/components/Auth/SignUpForm'

export const getServerSideProps: GetServerSideProps = unauthenticatedRoute

export default SignUpForm
