import React from 'react'
import { 
  UsersIcon, CakeIcon, UserGroupIcon, ClipboardDocumentCheckIcon 
} from '@heroicons/react/24/outline'

const DashboardOverview = () => {
  const stats = [
    { name: 'Total Meals Served', value: '1,234,567', icon: CakeIcon },
    { name: 'Active Branches', value: '42', icon: UsersIcon },
    { name: 'Posts Today', value: '156', icon: ClipboardDocumentCheckIcon },
    { name: 'Total People Served', value: '987,654', icon: UserGroupIcon },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Dashboard Overview</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div key={item.name} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-500">
                <item.icon className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-700">{item.name}</h3>
                <p className="text-2xl font-bold text-gray-900">{item.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Meal Distribution Trend</h3>
          <div className="h-64 bg-gray-200 rounded-md flex items-center justify-center">
            <span className="text-gray-500">Chart Placeholder</span>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Branch Performance</h3>
          <div className="h-64 bg-gray-200 rounded-md flex items-center justify-center">
            <span className="text-gray-500">Chart Placeholder</span>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Recent Activity</h3>
        <ul className="space-y-4">
          {[1, 2, 3].map((item) => (
            <li key={item} className="bg-gray-50 rounded-md p-4">
              <p className="text-sm text-gray-600">Branch Manager posted a new update</p>
              <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default DashboardOverview

