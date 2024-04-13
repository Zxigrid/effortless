import React from 'react'
import { Moon, Sun } from 'react-feather'

export default function ThemeToggle() {
  return (
    <label className="swap swap-rotate text-grey-steel">
      <input type="checkbox" className="theme-controller" defaultValue="dashDark" />
      {/* sun icon */}
      <Sun className="swap-on w-6 h-6" />
      {/* moon icon */}
      <Moon className="swap-off w-6 h-6" />
    </label>
  )
}
