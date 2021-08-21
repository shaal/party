import { unauthenticatedRoute } from '~/utils/redirects'
import { GetServerSideProps } from 'next'

import SignUpForm from '../components/Auth/SignUpForm'

export const getServerSideProps: GetServerSideProps = unauthenticatedRoute

export default SignUpForm
