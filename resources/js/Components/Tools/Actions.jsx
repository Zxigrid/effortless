import React from 'react'
import { Link } from '@inertiajs/react'
import { Edit, Trash2, DownloadCloud, UploadCloud } from 'react-feather'

const Actions = ({children}) => {
  return (
    <div className="flex items-center gap-2 px-3">
      {children}
    </div>
  )
}

const EditData = ({link}) => {
  return (
    <Link
      as='Button'
      href={link}
      className="btn-action-sm warning"
    >
      <Edit className='w-4 h-4' />
    </Link>
  )
}

const DeleteData = ({onClick}) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className='btn-action-sm error'>
      <Trash2 className='w-4 h-4' />
    </button>
  )
}

const StatusChange = ({data, onClick}) => {
  return (
    <button
      className={`btn-action-sm
        ${data.status == 'published' ? 'warning' : 'success'}`
      }
      onClick={onClick}
    >
      {
        data.status == 'published' ? (
          <DownloadCloud className='w-4 h-4' />
        ) : (
          <UploadCloud className='w-4 h-4' />
        )
      }
    </button>
  )
}

Actions.Edit = EditData
Actions.Delete = DeleteData
Actions.Status = StatusChange
export default Actions
