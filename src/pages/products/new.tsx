import { authenticatedRoute } from '@utils/redirects'
import { GetServerSideProps } from 'next'

import NewProduct from '../../components/Product/New'

export const getServerSideProps: GetServerSideProps = authenticatedRoute

export default NewProduct
