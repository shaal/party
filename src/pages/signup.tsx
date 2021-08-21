import { GetServerSideProps } from 'next'

import SignUpForm from '~/components/Auth/SignUpForm'
import { unauthenticatedRoute } from '~/utils/redirects'

export const getServerSideProps: GetServerSideProps = unauthenticatedRoute

export default SignUpForm
