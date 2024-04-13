import React from 'react'
import { Link } from '@inertiajs/react'
import { ChevronRight } from 'react-feather'

export default function DashboardCard({Icon, title='Title Example', total='0', ...props}) {
  return (
    <Link {...props} className="dashboard-card group">
      <div className="flex-1">
        <span className="card-icon group-hover:bg-white group-hover:text-primary">
          <Icon className="text-primary fill-primary" />
        </span>
        <span className="font-medium">
          <h1 className="text-3xl">{total}</h1>
          <h5 className="text-base text-grey-steel group-hover:text-white">{title}</h5>
        </span>
      </div>
      <ChevronRight />
    </Link>
  )
}
