import React from 'react'
import { Link } from '@inertiajs/react'

export default function SidebarLink({ children, active = false, ...props }) {
  return (
    <Link {...props} className={`sidebar-item ${active && 'active'}`}>
      {children}
    </Link>
  )
}
