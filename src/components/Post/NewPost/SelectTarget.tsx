import { Button } from '@components/UI/Button'
import { Modal } from '@components/UI/Modal'
import { Community, Product } from '@graphql/types.generated'
import { GlobeIcon } from '@heroicons/react/outline'
import { useState } from 'react'

import Targets from './Targets'

interface Props {
  setSelectedTarget: React.Dispatch<React.SetStateAction<any>>
}

const SelectTarget: React.FC<Props> = ({ setSelectedTarget }) => {
  const [selected, setSelected] = useState<Product | Community | null>()
  const [showModal, setShowModal] = useState<boolean>(false)

  return (
    <div className="px-2">
      <Button
        type="button"
        className="text-xs"
        size="sm"
        outline
        icon={
          selected ? (
            <img
              src={selected?.avatar as string}
              className="h-4 w-4 rounded"
              alt={`${selected?.name}'`}
            />
          ) : (
            <GlobeIcon className="h-4 w-4 text-brand-500" />
          )
        }
        onClick={() => setShowModal(!showModal)}
      >
        {selected ? selected?.name : 'Everywhere'}
      </Button>
      <Modal
        onClose={() => setShowModal(!showModal)}
        title="Where to post?"
        show={showModal}
      >
        <Targets
          setSelectedTarget={setSelectedTarget}
          setSelected={setSelected}
          setShowModal={setShowModal}
        />
      </Modal>
    </div>
  )
}

export default SelectTarget
