import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '../App'

export default function MembersTab({ showNotification, handleApiError }) {
  const [members, setMembers] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const fetchMembers = async () => {
    try {
      const response = await axios.get(`${API_URL}/members`)
      setMembers(response.data)
    } catch (error) {
      handleApiError(error)
    }
  }

  useEffect(() => {
    fetchMembers()
  }, [])

  const handleRegisterMember = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${API_URL}/members`, { name, email })
      showNotification('Member registered successfully!')
      setName('')
      setEmail('')
      fetchMembers()
    } catch (error) {
      handleApiError(error)
    }
  }

  return (
    <section className="tab-content">
      <div className="card">
        <h2>Register Member</h2>
        <form onSubmit={handleRegisterMember}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <button type="submit" className="btn primary">Register</button>
        </form>
      </div>

      <div className="card mt-4">
        <h2>Registered Members</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {members.map(member => (
                <tr key={member.memberId}>
                  <td>{member.memberId}</td>
                  <td>{member.name}</td>
                  <td>{member.email}</td>
                </tr>
              ))}
              {members.length === 0 && (
                <tr><td colSpan="3" style={{textAlign: 'center'}}>No members registered.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
