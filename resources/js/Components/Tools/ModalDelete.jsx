import React from 'react'
import { AlertTriangle } from 'react-feather'
import { router } from '@inertiajs/react'
import Modal from '../Ui/Modal'

const ModalDelete = ({link, data}) => {
  const handleDelete = () => {
    router.delete(link)
  }
  return (
    <Modal
      id={'modal_delete'}
      Icon={AlertTriangle}
      classNameIcon={'modal-icon error'}
      title="Hapus Postingan"
      description={`Yakin ingin menghapus "${data}"?`}
      cancel={
        <button className='btn-action-sm default'>
          Batalkan
        </button>
      }
      approve={
        <button onClick={handleDelete} className='btn-action-sm error'>
          Hapus
        </button>
      }
    />
  )
}

export default ModalDelete
