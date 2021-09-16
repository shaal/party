import { GetServerSideProps } from 'next'

import InviteSignup from '@components/Auth/Invite'
import { unauthenticatedRoute } from '@utils/redirects'

export const getServerSideProps: GetServerSideProps = unauthenticatedRoute

export default InviteSignup
