import React, { useState } from 'react'
import { ChevronDownIcon, PencilIcon } from '@heroicons/react/24/outline'

// Mock data for the graph
const mockData = {
  day: [10, 15, 8, 12, 20, 18, 25],
  month: [300, 450, 380, 420, 500, 480, 550],
  year: [5000, 5500, 6000, 5800, 6200, 6500, 7000]
}

// Mock data for the posts
const mockPosts = [
  { id: 1, branch: 'Downtown', time: '2023-05-15 09:30', peopleServed: 50, status: 'pending' },
  { id: 2, branch: 'Westside', time: '2023-05-15 10:15', peopleServed: 35, status: 'approved' },
  { id: 3, branch: 'Southend', time: '2023-05-15 11:00', peopleServed: 45, status: 'rejected' },
  { id: 4, branch: 'Eastville', time: '2023-05-15 12:30', peopleServed: 60, status: 'pending' },
]

const MealServingsAndPostHistory: React.FC = () => {
  const [timeFrame, setTimeFrame] = useState<'day' | 'month' | 'year'>('day')
  const [posts, setPosts] = useState(mockPosts)
  const [editingId, setEditingId] = useState<number | null>(null)

  const handleStatusChange = (id: number, newStatus: string) => {
    setPosts(posts.map(post => post.id === id ? { ...post, status: newStatus } : post))
    setEditingId(null)
  }

  const getMaxValue = (data: number[]) => Math.max(...data)
  const getMinValue = (data: number[]) => Math.min(...data)

  const renderGraph = () => {
    const data = mockData[timeFrame]
    const maxValue = getMaxValue(data)
    const minValue = getMinValue(data)
    const height = 200
    const width = 300
    const padding = 20
    const graphHeight = height - 2 * padding
    const graphWidth = width - 2 * padding

    const xStep = graphWidth / (data.length - 1)
    const yScale = graphHeight / (maxValue - minValue)

    const points = data.map((value, index) => {
      const x = padding + index * xStep
      const y = height - padding - (value - minValue) * yScale
      return `${x},${y}`
    }).join(' ')

    return (
      <svg width={width} height={height} className="mt-4">
        {/* Y-axis */}
        <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#718096" strokeWidth="1" />
        
        {/* X-axis */}
        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#718096" strokeWidth="1" />
        
        {/* Data line */}
        <polyline
          fill="none"
          stroke="#3B82F6"
          strokeWidth="2"
          points={points}
        />
        
        {/* Data points */}
        {data.map((value, index) => {
          const x = padding + index * xStep
          const y = height - padding - (value - minValue) * yScale
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r="4"
              fill="#3B82F6"
            />
          )
        })}
        
        {/* Y-axis labels */}
        <text x={5} y={padding} textAnchor="start" fontSize="12" fill="#4A5568">{maxValue}</text>
        <text x={5} y={height - padding} textAnchor="start" fontSize="12" fill="#4A5568">{minValue}</text>
        
        {/* X-axis labels */}
        <text x={padding} y={height - 5} textAnchor="middle" fontSize="12" fill="#4A5568">1</text>
        <text x={width - padding} y={height - 5} textAnchor="middle" fontSize="12" fill="#4A5568">{data.length}</text>
      </svg>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Meal Servings and Post History</h2>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-700">Total Meal Servings</h3>
          <div className="relative">
            <select
              value={timeFrame}
              onChange={(e) => setTimeFrame(e.target.value as 'day' | 'month' | 'year')}
              className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            >
              <option value="day">Day</option>
              <option value="month">Month</option>
              <option value="year">Year</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <ChevronDownIcon className="h-4 w-4" />
            </div>
          </div>
        </div>
        {renderGraph()}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Post History</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Branch</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">People Served</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {posts.map((post) => (
                <tr key={post.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.branch}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.time}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.peopleServed}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {editingId === post.id ? (
                      <select
                        value={post.status}
                        onChange={(e) => handleStatusChange(post.id, e.target.value)}
                        className="block w-full bg-white border border-gray-300 text-gray-700 py-1 px-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      >
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    ) : (
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        post.status === 'approved' ? 'bg-green-100 text-green-800' :
                        post.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {post.status}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {editingId === post.id ? (
                      <button
                        onClick={() => setEditingId(null)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Done
                      </button>
                    ) : (
                      <button
                        onClick={() => setEditingId(post.id)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default MealServingsAndPostHistory

