import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '../App'

export default function BooksTab({ showNotification, handleApiError }) {
  const [books, setBooks] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const fetchBooks = async (query = '') => {
    try {
      const url = query ? `${API_URL}/books/search?query=${encodeURIComponent(query)}` : `${API_URL}/books`
      const response = await axios.get(url)
      setBooks(response.data)
    } catch (error) {
      handleApiError(error)
    }
  }

  useEffect(() => {
    fetchBooks()
  }, [])

  const handleAddBook = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${API_URL}/books`, { title, author })
      showNotification('Book added successfully!')
      setTitle('')
      setAuthor('')
      fetchBooks()
    } catch (error) {
      handleApiError(error)
    }
  }

  return (
    <section className="tab-content">
      <div className="card">
        <h2>Add a New Book</h2>
        <form onSubmit={handleAddBook}>
          <div className="form-group">
            <label>Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Author</label>
            <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />
          </div>
          <button type="submit" className="btn primary">Add Book</button>
        </form>
      </div>
      
      <div className="card mt-4">
        <div className="d-flex justify-between align-center mb-2">
          <h2>Book Catalog</h2>
          <div className="search-bar">
            <input 
              type="text" 
              placeholder="Search by title or author..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={() => fetchBooks(searchQuery)} className="btn secondary">Search</button>
          </div>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Author</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {books.map(book => (
                <tr key={book.bookId}>
                  <td>{book.bookId}</td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>
                    <span className={`status-badge ${book.availability ? 'available' : 'unavailable'}`}>
                      {book.availability ? 'Available' : 'Issued'}
                    </span>
                  </td>
                </tr>
              ))}
              {books.length === 0 && (
                <tr><td colSpan="4" style={{textAlign: 'center'}}>No books found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
