import { GetServerSideProps } from 'next'

import Waitlist from '~/components/Pages/Waitlist'
import { unauthenticatedRoute } from '~/utils/redirects'

export const getServerSideProps: GetServerSideProps = unauthenticatedRoute

export default Waitlist
