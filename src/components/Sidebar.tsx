import React from 'react'
import { 
  ChartPieIcon, UsersIcon, ClockIcon, CubeIcon, ChartBarIcon, 
  BellIcon, CogIcon, QuestionMarkCircleIcon 
} from '@heroicons/react/24/outline'

interface SidebarProps {
  currentSection: string
  setCurrentSection: (section: string) => void
}

const Sidebar = ({ currentSection, setCurrentSection }: SidebarProps) => {
  const navItems = [
    { name: 'Dashboard Overview', icon: ChartPieIcon },
    { name: 'User Management', icon: UsersIcon },
    { name: 'Meal Servings & Post History', icon: ClockIcon },
    { name: 'Meal Inventory & Feedback', icon: CubeIcon },
    { name: 'Reports & Analytics', icon: ChartBarIcon },
    { name: 'Notifications', icon: BellIcon },
    { name: 'Settings', icon: CogIcon },
    { name: 'Support', icon: QuestionMarkCircleIcon },
  ]

  return (
    <div className="bg-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <div className="flex items-center justify-center">
        <span className="text-2xl font-semibold text-gray-800">FoodCharity</span>
      </div>
      <nav>
        {navItems.map((item) => (
          <a
            key={item.name}
            href="#"
            className={`flex items-center space-x-2 py-2.5 px-4 rounded transition duration-200 ${
              currentSection === item.name ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => setCurrentSection(item.name)}
          >
            <item.icon className="h-6 w-6" />
            <span>{item.name}</span>
          </a>
        ))}
      </nav>
    </div>
  )
}

export default Sidebar
