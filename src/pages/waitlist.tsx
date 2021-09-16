import Waitlist from '@components/Pages/Waitlist'
import { unauthenticatedRoute } from '@utils/redirects'
import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = unauthenticatedRoute

export default Waitlist
