import React from 'react'

const FileInput = ({ label, name, onChange, value }) => {
  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text text-graphite">{label}</span>
      </div>
      <input name={name} onChange={onChange} type="file" className="file-input file-input-bordered file-input-primary w-full rounded-md" />
    </label>
  )
}

export default FileInput
