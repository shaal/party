import 'emoji-mart/css/emoji-mart.css'

import { gql, useMutation } from '@apollo/client'
import { CURRENT_USER_QUERY } from '@components/SiteLayout'
import { Button } from '@components/UI/Button'
import { Form, useZodForm } from '@components/UI/Form'
import { Input } from '@components/UI/Input'
import { Modal } from '@components/UI/Modal'
import AppContext from '@components/utils/AppContext'
import {
  ClearStatusMutation,
  ClearStatusMutationVariables,
  EditStatusMutation,
  EditStatusMutationVariables
} from '@graphql/types.generated'
import { Picker } from 'emoji-mart'
import { useTheme } from 'next-themes'
import { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { object, string } from 'zod'

const editStatusSchema = object({
  // emoji: string(),
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
  const { resolvedTheme } = useTheme()
  const { currentUser } = useContext(AppContext)
  const [displayEmojiPicker, setDisplayEmojiPicker] = useState(false)
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

  const [clearStatus] = useMutation<
    ClearStatusMutation,
    ClearStatusMutationVariables
  >(
    gql`
      mutation ClearStatus {
        clearStatus
      }
    `,
    {
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
      onError(error) {
        toast.error(error.message)
      },
      onCompleted() {
        form.reset()
        toast.success('Status cleared successfully!')
      }
    }
  )

  const form = useZodForm({
    schema: editStatusSchema,
    defaultValues: {
      //   emoji: currentUser?.status?.emoji,
      text: currentUser?.status?.text
    }
  })

  return (
    <Modal
      title="Edit status"
      show={true}
      onClose={() => setShowStatusModal(!showStatusModal)}
    >
      <Form
        form={form}
        className="space-y-4"
        onSubmit={({ text }) =>
          editStatus({
            variables: {
              input: { emoji: '👼', text }
            }
          })
        }
      >
        <div className="px-5 py-3.5 text-center">
          <Input
            placeholder="What's poppin?"
            prefix={
              <button
                type="button"
                onClick={() => setDisplayEmojiPicker(!displayEmojiPicker)}
              >
                👴
              </button>
            }
            {...form.register('text')}
          />
          <Modal
            title="Select emoji"
            show={displayEmojiPicker}
            onClose={() => setDisplayEmojiPicker(!displayEmojiPicker)}
          >
            <Picker
              style={{ width: 'auto', border: 'none' }}
              onClick={(emoji) => console.log(emoji)}
              theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
              showPreview={false}
              showSkinTones={false}
              emojiSize={20}
              color="#8b5cf6"
              native
            />
          </Modal>
        </div>
        <div className="px-5 py-3.5 flex space-x-3 border-t">
          <Button
            type="button"
            variant="secondary"
            className="w-full"
            onClick={() => clearStatus()}
          >
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
