import React from 'react'

const FileInput = ({ label, name, onChange, error }) => {
  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text text-graphite">{label}</span>
      </div>
      <input name={name} onChange={onChange} type="file" className={`file-input file-input-bordered w-full rounded-md ${!error ? 'file-input-primary' : 'file-input-error'}`} />
      {
        error && (
          <div className="label">
            <span className="label-text-alt -mt-1 text-error">{error}</span>
          </div>
        )
      }
    </label>
  )
}

export default FileInput
