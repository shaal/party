import StaffToolsDashboard from '@components/StaffTools'
import { staffRoute } from '@utils/redirects'
import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = staffRoute

export default StaffToolsDashboard
