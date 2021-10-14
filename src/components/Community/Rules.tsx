import 'linkify-plugin-hashtag'
import 'linkify-plugin-mention'

import { gql, useQuery } from '@apollo/client'
import { Card, CardBody } from '@components/ui/Card'
import { Community } from 'src/__generated__/schema.generated'

import { CommunityRulesQuery } from './__generated__/Rules.generated'

export const COMMUNITY_RULES_QUERY = gql`
  query CommunityRulesQuery($slug: String!) {
    community(slug: $slug) {
      id
      rules {
        edges {
          node {
            id
            name
            description
          }
        }
      }
    }
  }
`

interface Props {
  community: Community
}

const Rules: React.FC<Props> = ({ community }) => {
  const { data, loading, error } = useQuery<CommunityRulesQuery>(
    COMMUNITY_RULES_QUERY,
    {
      variables: { slug: community?.slug },
      skip: !community?.slug
    }
  )
  const rules = data?.community?.rules?.edges?.map((edge) => edge?.node)

  const RulesCard = ({ loading, children }: any) => {
    return (
      <Card className="mb-4">
        <CardBody>
          <div className="text-lg font-bold">{community?.name} Rules</div>
          {loading}
        </CardBody>
        {children}
      </Card>
    )
  }

  if (loading) return <RulesCard loading="Loading rules..." />

  return (
    <RulesCard>
      <div className="divide-y">
        {rules?.map((rule: any, index: number) => (
          <div
            className="px-5 py-3 flex items-baseline space-x-3"
            key={rule.id}
          >
            <div className="font-bold text-brand-500 text-xl">{index + 1}.</div>
            <div className="space-y-1">
              <div className="font-bold">{rule.name}</div>
              <div className="text-sm">{rule.description}</div>
            </div>
          </div>
        ))}
      </div>
    </RulesCard>
  )
}

export default Rules
