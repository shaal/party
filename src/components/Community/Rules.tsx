import 'linkify-plugin-hashtag'
import 'linkify-plugin-mention'

import { gql, useQuery } from '@apollo/client'
import { Card, CardBody } from '@components/ui/Card'
import { Spinner } from '@components/ui/Spinner'
import { ShieldCheckIcon } from '@heroicons/react/outline'
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
  showCardAndHeading?: boolean
}

const Rules: React.FC<Props> = ({ community, showCardAndHeading = true }) => {
  const { data, loading } = useQuery<CommunityRulesQuery>(
    COMMUNITY_RULES_QUERY,
    {
      variables: { slug: community?.slug },
      skip: !community?.slug
    }
  )
  const rules = data?.community?.rules?.edges?.map((edge) => edge?.node)

  const RulesCard = ({ children }: any) => {
    return (
      <Card
        className={`mb-4 ${showCardAndHeading ? '' : 'border-0 !shadow-none'}`}
      >
        {children}
      </Card>
    )
  }

  if (loading)
    return (
      <RulesCard>
        <CardBody>
          <div className="font-bold text-center space-y-2 text-sm">
            <Spinner size="md" className="mx-auto" />
            <div>Loading rules</div>
          </div>
        </CardBody>
      </RulesCard>
    )

  return (
    <RulesCard>
      {showCardAndHeading && (
        <div className="text-lg font-bold px-5 pt-4 pb-2">
          {community?.name} Rules
        </div>
      )}
      <div className="divide-y">
        {(rules?.length as number) < 1 && (
          <div className="grid justify-items-center space-y-2 px-5 py-3">
            <div>
              <ShieldCheckIcon className="h-5 w-5 text-brand-500" />
            </div>
            <div>No rules!</div>
          </div>
        )}
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
