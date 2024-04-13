import React from 'react'

export default function ToolSection({children}) {
  return (
    <div className="flex max-[460px]:flex-col-reverse items-end md:flex-row lg:items-center gap-3 lg:gap-0 justify-between">
      {children}
    </div>
  )
}
