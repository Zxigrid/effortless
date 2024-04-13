import React from 'react'

export default function DataSection({children}) {
  return (
    <div className="w-full overflow-x-auto bg-neutral rounded-md p-3 shadow">
      {children}
    </div>
  )
}
