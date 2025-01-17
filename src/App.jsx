import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import DashboardOverview from './components/DashboardOverview'

function App() {
  const [currentSection, setCurrentSection] = useState('Dashboard Overview')

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar currentSection={currentSection} setCurrentSection={setCurrentSection} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            {currentSection === 'Dashboard Overview' && <DashboardOverview />}
            {/* Add other sections here */}
          </div>
        </main>
      </div>
    </div>
  )
}

export default App

