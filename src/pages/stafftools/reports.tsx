import StaffToolsReports from '@components/StaffTools/Reports'
import { staffRoute } from '@utils/redirects'
import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = staffRoute

export default StaffToolsReports
