import { GetServerSideProps } from 'next'

import NewProduct from '../../components/Products/New'
import { authenticatedRoute } from '../../utils/redirects'

export const getServerSideProps: GetServerSideProps = authenticatedRoute

export default NewProduct
