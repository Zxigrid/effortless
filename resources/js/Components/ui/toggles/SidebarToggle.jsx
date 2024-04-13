import React from 'react'
import { Menu } from 'react-feather'

export default function SidebarToggle() {
  return (
    <label for="sidebar" class="btn bg-base-100 hover:bg-base-200/80 border-0 h-10 min-h-10 rounded-md text-graphite lg:hidden">
      <Menu/>
    </label>
  )
}
