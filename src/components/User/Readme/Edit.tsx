import { gql, useMutation } from '@apollo/client'
import { Button } from '@components/UI/Button'
import { Form, useZodForm } from '@components/UI/Form'
import { Modal } from '@components/UI/Modal'
import { TextArea } from '@components/UI/TextArea'
import {
  EditProfileReadmeMutation,
  EditProfileReadmeMutationVariables
} from '@graphql/types.generated'
import React from 'react'
import toast from 'react-hot-toast'
import { object, string } from 'zod'

const editReadmeSchema = object({
  readme: string()
})

interface Props {
  readme: string
  showReadmeModal: boolean
  setShowReadmeModal: React.Dispatch<React.SetStateAction<boolean>>
}

const EditReadme: React.FC<Props> = ({
  readme,
  showReadmeModal,
  setShowReadmeModal
}) => {
  const [editProfileReadme] = useMutation<
    EditProfileReadmeMutation,
    EditProfileReadmeMutationVariables
  >(
    gql`
      mutation EditProfileReadme($input: EditProfileReadmeInput!) {
        editProfileReadme(input: $input) {
          profile {
            readme
          }
        }
      }
    `,
    {
      onError(error) {
        toast.error(error.message)
      },
      onCompleted() {
        setShowReadmeModal(false)
        toast.success('Readme successfully updated!')
      }
    }
  )

  const form = useZodForm({
    schema: editReadmeSchema,
    defaultValues: { readme }
  })

  return (
    <Modal
      title="Edit README"
      show={showReadmeModal}
      size="lg"
      onClose={() => setShowReadmeModal(false)}
    >
      <Form
        form={form}
        className="px-5 py-3.5"
        onSubmit={({ readme }) => {
          editProfileReadme({
            variables: { input: { readme } }
          })
        }}
      >
        <TextArea {...form.register('readme')} />
      </Form>
      <div className="px-5 py-3.5 flex space-x-3 border-t">
        <Button variant="success">Save</Button>
      </div>
    </Modal>
  )
}

export default EditReadme
