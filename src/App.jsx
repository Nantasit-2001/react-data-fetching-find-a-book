import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); 

  const handleSearch = () => {
    if (!query) return;

    setLoading(true);
    setError(null);
    setBooks([]);

    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
      .then(response => {
        console.log('ข้อมูลจาก Google Books API:', response.data);
        setBooks(response.data.items || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('เกิดข้อผิดพลาด:', error);
        setError('ไม่สามารถค้นหาหนังสือได้');
        setLoading(false);
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Find a Book</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="ค้นหาที่นี่"
        style={{
          padding: '5px',
          width: '300px',
          marginBottom: '20px',
          border: '1px solid #ccc',
          borderRadius: '4px'
        }}
      />
      {loading && <p>กำลังค้นหา...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {books.length > 0 ? (
        <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
          {books.map(book => (
            <li key={book.id} style={{ marginBottom: '5px' }}>
              {book.volumeInfo.title}
            </li>
          ))}
        </ul>
      ) : (
        !loading && !error && <p>ไม่มีผลลัพธ์การค้นหา</p>
      )}
    </div>
  );
}

export default App;