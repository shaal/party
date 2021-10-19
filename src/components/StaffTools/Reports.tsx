import { gql, useQuery } from '@apollo/client'
import { GridItemEight, GridItemFour, GridLayout } from '@components/GridLayout'
import UserProfile from '@components/shared/UserProfile'
import { Card, CardBody } from '@components/ui/Card'
import { EmptyState } from '@components/ui/EmptyState'
import { ErrorMessage } from '@components/ui/ErrorMessage'
import { PageLoading } from '@components/ui/PageLoading'
import { Spinner } from '@components/ui/Spinner'
import { ShieldCheckIcon } from '@heroicons/react/outline'
import React from 'react'
import useInView from 'react-cool-inview'

import { StaffToolsReportsQuery } from './__generated__/Reports.generated'
import Sidebar from './Sidebar'

export const STAFF_TOOLS_REPORTS_QUERY = gql`
  query StaffToolsReportsQuery($after: String) {
    reports(first: 10, after: $after) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          id
          message
          user {
            id
            username
            isVerified
            profile {
              id
              avatar
              name
            }
          }
        }
      }
    }
  }
`

const StaffToolsReports: React.FC = () => {
  const { data, loading, error, fetchMore } = useQuery<StaffToolsReportsQuery>(
    STAFF_TOOLS_REPORTS_QUERY,
    {
      variables: {
        after: null
      },
      pollInterval: 10000
    }
  )
  const reports = data?.reports?.edges?.map((edge) => edge?.node)
  const pageInfo = data?.reports?.pageInfo

  const { observe } = useInView({
    threshold: 1,
    onChange: ({ observe, unobserve }) => {
      unobserve()
      observe()
    },
    onEnter: () => {
      if (pageInfo?.hasNextPage) {
        fetchMore({
          variables: {
            after: pageInfo?.endCursor ? pageInfo?.endCursor : null
          }
        })
      }
    }
  })

  if (loading) return <PageLoading message="Loading reports" />

  return (
    <GridLayout>
      <GridItemFour>
        <Sidebar />
      </GridItemFour>
      <GridItemEight>
        <Card>
          <CardBody className="divide-y">
            <ErrorMessage title="Failed to load reports" error={error} />
            {(reports?.length as number) < 1 && (
              <EmptyState
                icon={<ShieldCheckIcon className="h-8 w-8 text-brand-500" />}
                message="No reports to process!"
                hideCard
              />
            )}
            {reports?.map((report: any) => (
              <div key={report?.id} className="py-3">
                <div className="space-y-2">
                  <div className="font-bold text-sm">Reported by</div>
                  <UserProfile user={report?.user} />
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
        {pageInfo?.hasNextPage && (
          <span ref={observe} className="flex justify-center p-5">
            <Spinner size="md" />
          </span>
        )}
      </GridItemEight>
    </GridLayout>
  )
}

export default StaffToolsReports
