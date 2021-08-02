import { GetServerSideProps } from 'next'
import { authenticatedRoute } from '~/utils/redirects'

export const getServerSideProps: GetServerSideProps = authenticatedRoute

export { EditProfile as default } from '~/components/EditProfile'
