import React from 'react'

const TextInput = ({ label="label", type="text", name="name", onChange, value, disabled }) => {
  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text text-graphite">{label}</span>
      </div>
      <input name={name} onChange={onChange} value={value} type={type} placeholder="Type here" className="input input-bordered w-full" disabled={disabled} />
    </label>

  )
}

export default TextInput
