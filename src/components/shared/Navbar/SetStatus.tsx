import { gql, useMutation } from '@apollo/client'
import { CURRENT_USER_QUERY } from '@components/SiteLayout'
import { Button } from '@components/UI/Button'
import { Form, useZodForm } from '@components/UI/Form'
import { Input } from '@components/UI/Input'
import { Modal } from '@components/UI/Modal'
import AppContext from '@components/utils/AppContext'
import {
  EditStatusMutation,
  EditStatusMutationVariables
} from '@graphql/types.generated'
import { useContext } from 'react'
import toast from 'react-hot-toast'
import { object, string } from 'zod'

const editStatusSchema = object({
  emoji: string(),
  text: string().max(50, {
    message: '💝 Status text should not exceed 50 characters'
  })
})

interface Props {
  showStatusModal: boolean
  setShowStatusModal: React.Dispatch<React.SetStateAction<boolean>>
}

const SetStatus: React.FC<Props> = ({
  showStatusModal,
  setShowStatusModal
}) => {
  const { currentUser } = useContext(AppContext)
  const [editStatus] = useMutation<
    EditStatusMutation,
    EditStatusMutationVariables
  >(
    gql`
      mutation EditStatus($input: EditStatusInput!) {
        editStatus(input: $input) {
          emoji
          text
        }
      }
    `,
    {
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
      onError(error) {
        toast.error(error.message)
      },
      onCompleted() {
        setShowStatusModal(false)
        toast.success('Status successfully updated!')
      }
    }
  )

  const form = useZodForm({
    schema: editStatusSchema,
    defaultValues: {
      emoji: currentUser?.status?.emoji,
      text: currentUser?.status?.text
    }
  })

  return (
    <Modal
      onClose={() => setShowStatusModal(!showStatusModal)}
      title="Edit status"
      show={showStatusModal}
    >
      <Form
        form={form}
        className="space-y-4"
        onSubmit={({ emoji, text }) =>
          editStatus({
            variables: {
              input: { emoji, text }
            }
          })
        }
      >
        <div className="px-5 py-3.5 text-center">
          <Input
            placeholder="What's poppin?"
            prefix="🥰"
            {...form.register('text')}
          />
        </div>
        <div className="px-5 py-3.5 flex space-x-3 border-t">
          <Button variant="secondary" className="w-full">
            Clear status
          </Button>
          <Button variant="success" className="w-full">
            Set status
          </Button>
        </div>
      </Form>
    </Modal>
  )
}

export default SetStatus
