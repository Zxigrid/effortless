import React from 'react'
import { Link } from '@inertiajs/react'

const BreadCrumbs = ({ children }) => {
  return (
    <div className="text-sm breadcrumbs pt-0">
      <ul>
        {children}
      </ul>
    </div>
  )
}

const BreadLink = ({ value, ...props }) => {
  return (
    <li>
      <Link {...props} className="font-medium text-grey-steel hover:text-primary">
        {value}
      </Link>
    </li>
  )
}

const BreadDisabled = ({ value }) => {
  return (
    <li className="font-medium text-grey-steel">
      {value}
    </li>
  )
}

BreadCrumbs.Link = BreadLink;
BreadCrumbs.Disable = BreadDisabled;
export default BreadCrumbs;
