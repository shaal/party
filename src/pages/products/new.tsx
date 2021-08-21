import { GetServerSideProps } from 'next'

import NewProduct from '~/components/Product/New'
import { authenticatedRoute } from '~/utils/redirects'

export const getServerSideProps: GetServerSideProps = authenticatedRoute

export default NewProduct
