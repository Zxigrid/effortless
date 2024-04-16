import React from 'react'
import { Search } from 'react-feather'

export default function SearchBar() {
  return (
    <form action="#" className="w-full md:flex-1 max-[460px]:flex-auto">
      <label className="input shadow-sm flex items-center gap-2 bg-neutral w-full sm:w-6/12 lg:w-7/12 xl:w-6/12 rounded-md h-10 min-h-10">
        <Search className="text-graphite opacity-40" />
        <input type="text" className="grow w-full border-0 focus:ring-transparent px-0" placeholder="Cari data disini ..." />
      </label>
    </form>

  )
}
