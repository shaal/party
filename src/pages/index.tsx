import { GetServerSideProps } from 'next'

import Landing from '@components/Landing'
import { unauthenticatedRoute } from '@utils/redirects'

export const getServerSideProps: GetServerSideProps = unauthenticatedRoute

export default Landing
