import { gql, useMutation } from '@apollo/client'
import { Switch } from '@headlessui/react'
import { StarIcon } from '@heroicons/react/outline'
import { StarIcon as StarIconSolid } from '@heroicons/react/solid'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { Topic } from '~/__generated__/schema.generated'
import { Button } from '~/components/ui/Button'

import {
  ToggleTopicStarMutation,
  ToggleTopicStarMutationVariables
} from './__generated__/Star.generated'

interface Props {
  topic: Topic
}

const Star: React.FC<Props> = ({ topic }) => {
  const [isStarted, setIsStarted] = useState<boolean>(false)
  const [toggleTopicStar] = useMutation<
    ToggleTopicStarMutation,
    ToggleTopicStarMutationVariables
  >(
    gql`
      mutation ToggleTopicStarMutation($input: ToggleTopicStarInput!) {
        toggleTopicStar(input: $input) {
          id
          name
          hasStarted
        }
      }
    `,
    {
      onError() {
        toast.error('Something went wrong!')
      },
      onCompleted(data) {
        if (data?.toggleTopicStar?.hasStarted) {
          toast.success(`Successfully starred #${data?.toggleTopicStar?.name}`)
        } else {
          toast.success(
            `Successfully unstarred #${data?.toggleTopicStar?.name}`
          )
        }
      }
    }
  )

  useEffect(() => {
    if (topic?.hasStarted) setIsStarted(topic?.hasStarted)
  }, [topic])

  const handleToggleStar = () => {
    toggleTopicStar({
      variables: {
        input: { id: topic?.id }
      }
    })
  }

  return (
    <Switch
      as={Button}
      checked={isStarted}
      onChange={() => {
        setIsStarted(!isStarted)
        handleToggleStar()
      }}
      size="sm"
      variant={isStarted ? 'danger' : 'success'}
      outline
    >
      {isStarted ? (
        <StarIconSolid className="h-4 w-4" />
      ) : (
        <StarIcon className="h-4 w-4" />
      )}
    </Switch>
  )
}

export default Star
