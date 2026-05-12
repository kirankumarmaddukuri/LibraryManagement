import { useState, useEffect } from 'react'
import axios from 'axios'
import BooksTab from './components/BooksTab'
import MembersTab from './components/MembersTab'
import IssueTab from './components/IssueTab'
import './App.css'

export const API_URL = 'http://localhost:8080'

function App() {
  const [activeTab, setActiveTab] = useState('books')
  const [notification, setNotification] = useState(null)

  const showNotification = (message, isError = false) => {
    setNotification({ message, isError })
    setTimeout(() => setNotification(null), 5000)
  }

  const handleApiError = (error) => {
    const msg = error.response?.data?.error || Object.values(error.response?.data || {})[0] || error.message || 'An error occurred'
    showNotification(msg, true)
  }

  return (
    <div className="app-wrapper">
      <header className="header">
        <div className="container">
          <h1>📚 Library Book Management System</h1>
          <nav className="tabs">
            <button 
              className={`tab-btn ${activeTab === 'books' ? 'active' : ''}`}
              onClick={() => setActiveTab('books')}
            >Books</button>
            <button 
              className={`tab-btn ${activeTab === 'members' ? 'active' : ''}`}
              onClick={() => setActiveTab('members')}
            >Members</button>
            <button 
              className={`tab-btn ${activeTab === 'issue' ? 'active' : ''}`}
              onClick={() => setActiveTab('issue')}
            >Issue / Return</button>
          </nav>
        </div>
      </header>

      <main className="container">
        {notification && (
          <div className={`notification ${notification.isError ? 'error' : 'success'}`}>
            <span>{notification.message}</span>
            <button onClick={() => setNotification(null)}>&times;</button>
          </div>
        )}

        {activeTab === 'books' && <BooksTab showNotification={showNotification} handleApiError={handleApiError} />}
        {activeTab === 'members' && <MembersTab showNotification={showNotification} handleApiError={handleApiError} />}
        {activeTab === 'issue' && <IssueTab showNotification={showNotification} handleApiError={handleApiError} />}
      </main>
    </div>
  )
}

export default App
