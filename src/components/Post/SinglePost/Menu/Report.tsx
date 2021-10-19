import { gql, useMutation } from '@apollo/client'
import { Modal } from '@components/ui/Modal'
import { Menu } from '@headlessui/react'
import { FlagIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import mixpanel from 'mixpanel-browser'
import React, { useState } from 'react'
import { Post } from 'src/__generated__/schema.generated'

import {
  DeletePostMutation,
  DeletePostMutationVariables
} from './__generated__/Delete.generated'

type Props = {
  post: Post
}

const Report: React.FC<Props> = ({ post }) => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [deletePost] = useMutation<
    DeletePostMutation,
    DeletePostMutationVariables
  >(
    gql`
      mutation DeletePostMutation($input: DeletePostInput!) {
        deletePost(input: $input)
      }
    `,
    {
      onError() {
        mixpanel.track('post.delete.failed')
      },
      onCompleted() {
        window.location.replace('/')
        mixpanel.track('post.delete.success')
      }
    }
  )

  return (
    <>
      <Menu.Item
        as="div"
        className={({ active }: any) =>
          clsx(
            { 'bg-gray-100 dark:bg-gray-800': active },
            'block px-4 py-1.5 text-sm text-red-500 m-2 rounded-lg cursor-pointer'
          )
        }
        onClick={() => {
          mixpanel.track('post.report.modal.open')
          setShowModal(!showModal)
        }}
      >
        <div className="flex items-center space-x-2">
          <FlagIcon className="h-4 w-4" />
          <div>Report Post</div>
        </div>
      </Menu.Item>
      <Modal
        onClose={() => {
          mixpanel.track('post.select_target.modal.close')
          setShowModal(!showModal)
        }}
        title="Report this post?"
        show={showModal}
      >
        WIP
      </Modal>
    </>
  )
}

export default Report
