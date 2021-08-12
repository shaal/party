import { GetServerSideProps } from 'next'
import SignUpForm from 'src/components/Auth/SignUpForm'
import { unauthenticatedRoute } from 'src/utils/redirects'

export const getServerSideProps: GetServerSideProps = unauthenticatedRoute

export default SignUpForm
