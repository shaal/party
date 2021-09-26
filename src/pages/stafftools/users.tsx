import StaffToolsUsers from '@components/StaffTools/Users'
import { staffRoute } from '@utils/redirects'
import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = staffRoute

export default StaffToolsUsers
