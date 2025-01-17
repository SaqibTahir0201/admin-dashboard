import React from 'react'
import { BellIcon, GlobeAltIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'

const Header: FC = () => {
  return (
    <header className="bg-white shadow-md py-4 px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center w-1/3">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
          <input
            className="ml-2 w-full bg-gray-100 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="search"
            placeholder="Search..."
          />
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-gray-500 hover:text-gray-700">
            <GlobeAltIcon className="h-6 w-6" />
          </button>
          <button className="text-gray-500 hover:text-gray-700 relative">
            <BellIcon className="h-6 w-6" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="flex items-center space-x-2">
            <img
              className="h-8 w-8 rounded-full"
              src="https://via.placeholder.com/150"
              alt="Admin avatar"
            />
            <span className="text-sm font-medium text-gray-700">Admin User</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

