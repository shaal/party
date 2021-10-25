import { gql, useMutation } from '@apollo/client'
import { Button } from '@components/UI/Button'
import AppContext from '@components/utils/AppContext'
import { Switch } from '@headlessui/react'
import { StarIcon } from '@heroicons/react/outline'
import { StarIcon as StarIconSolid } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Topic } from 'src/__generated__/schema.generated'
import { ERROR_MESSAGE } from 'src/constants'

import {
  ToggleTopicStarMutation,
  ToggleTopicStarMutationVariables
} from './__generated__/Star.generated'

interface Props {
  topic: Topic
}

const Star: React.FC<Props> = ({ topic }) => {
  const { currentUser } = useContext(AppContext)
  const router = useRouter()
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
          hasStarred
        }
      }
    `,
    {
      onError() {
        toast.error(ERROR_MESSAGE)
      },
      onCompleted(data) {
        if (data?.toggleTopicStar?.hasStarred) {
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
    if (topic?.hasStarred) setIsStarted(topic?.hasStarred)
  }, [topic])

  const handleToggleStar = () => {
    if (!currentUser)
      return router.push({
        pathname: '/login',
        query: { redirect: `/topics/${topic?.name}` }
      })
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
      variant={isStarted ? 'danger' : 'success'}
      icon={
        isStarted ? (
          <StarIconSolid className="h-4 w-4" />
        ) : (
          <StarIcon className="h-4 w-4" />
        )
      }
      outline
    />
  )
}

export default Star
