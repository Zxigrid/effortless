import React from 'react'

const Table = ({children}) => {
  return (
    <table className="dash-table">
      {/* head */}
      {children}
    </table>

  )
}

const TableHead = ({children}) => {
  return(
    <thead>
      <tr>
        {children}
      </tr>
    </thead>
  )
}

const TableBody = ({children}) => {
  return(
    <tbody>
      {children}
    </tbody>
  )
}

Table.Head = TableHead
Table.Body = TableBody
export default Table
