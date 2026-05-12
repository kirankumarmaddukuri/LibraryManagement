import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '../App'

export default function IssueTab({ showNotification, handleApiError }) {
  const [availableBooks, setAvailableBooks] = useState([])
  const [members, setMembers] = useState([])
  
  const [issueBookId, setIssueBookId] = useState('')
  const [issueMemberId, setIssueMemberId] = useState('')
  
  const [viewMemberId, setViewMemberId] = useState('')
  const [issues, setIssues] = useState([])

  const fetchData = async () => {
    try {
      const [booksRes, membersRes] = await Promise.all([
        axios.get(`${API_URL}/books/available`),
        axios.get(`${API_URL}/members`)
      ])
      setAvailableBooks(booksRes.data)
      setMembers(membersRes.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleIssueBook = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${API_URL}/issues/issue`, { 
        bookId: parseInt(issueBookId), 
        memberId: parseInt(issueMemberId) 
      })
      showNotification('Book issued successfully!')
      setIssueBookId('')
      setIssueMemberId('')
      fetchData() // Refresh available books
    } catch (error) {
      handleApiError(error)
    }
  }

  const fetchIssues = async (memberId) => {
    if (!memberId) {
      showNotification('Please select a member', true)
      return
    }
    try {
      const response = await axios.get(`${API_URL}/members/${memberId}/issues`)
      setIssues(response.data)
    } catch (error) {
      handleApiError(error)
    }
  }

  const handleReturnBook = async (issueId) => {
    if (!window.confirm('Are you sure you want to return this book?')) return
    try {
      await axios.put(`${API_URL}/issues/return/${issueId}`)
      showNotification('Book returned successfully!')
      fetchIssues(viewMemberId)
      fetchData() // Refresh available books
    } catch (error) {
      handleApiError(error)
    }
  }

  return (
    <section className="tab-content">
      <div className="card">
        <h2>Issue a Book</h2>
        <form onSubmit={handleIssueBook}>
          <div className="form-group">
            <label>Select Available Book</label>
            <select value={issueBookId} onChange={(e) => setIssueBookId(e.target.value)} required>
              <option value="">-- Select a Book --</option>
              {availableBooks.map(b => (
                <option key={b.bookId} value={b.bookId}>{b.title} (ID: {b.bookId})</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Select Member</label>
            <select value={issueMemberId} onChange={(e) => setIssueMemberId(e.target.value)} required>
              <option value="">-- Select a Member --</option>
              {members.map(m => (
                <option key={m.memberId} value={m.memberId}>{m.name} (ID: {m.memberId})</option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn primary">Issue Book</button>
        </form>
      </div>

      <div className="card mt-4">
        <h2>Member Issues</h2>
        <div className="form-group row-align">
          <label>Select Member to view issues:</label>
          <select value={viewMemberId} onChange={(e) => setViewMemberId(e.target.value)}>
            <option value="">-- Select a Member --</option>
            {members.map(m => (
              <option key={m.memberId} value={m.memberId}>{m.name} (ID: {m.memberId})</option>
            ))}
          </select>
          <button onClick={() => fetchIssues(viewMemberId)} className="btn secondary ml-2">View Issues</button>
        </div>
        <div className="table-container mt-2">
          <table>
            <thead>
              <tr>
                <th>Issue ID</th>
                <th>Book Title</th>
                <th>Issue Date</th>
                <th>Return Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {issues.map(issue => (
                <tr key={issue.issueId}>
                  <td>{issue.issueId}</td>
                  <td>{issue.book?.title}</td>
                  <td>{issue.issueDate}</td>
                  <td>{issue.returnDate || '-'}</td>
                  <td>
                    {issue.returnDate ? (
                      'Returned'
                    ) : (
                      <button 
                        className="btn danger" 
                        onClick={() => handleReturnBook(issue.issueId)}
                      >
                        Return Book
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {issues.length === 0 && (
                <tr><td colSpan="5" style={{textAlign: 'center'}}>No issues to display</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
