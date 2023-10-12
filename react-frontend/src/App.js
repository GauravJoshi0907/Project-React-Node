import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_ENDPOINT = 'https://jsonplaceholder.typicode.com/users';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDetails, setShowDetails] = useState({});

  const perPage = 3;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_ENDPOINT);
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalPages = Math.ceil(users.length / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const visibleUsers = users.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const toggleDetails = (userId) => {
    setShowDetails((prevState) => ({
      ...prevState,
      [userId]: !prevState[userId]
    }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="App">
      <h1 id ="heading">React-Node Project</h1>
      <div className="user-list">
        {visibleUsers.map((user) => (
          <div key={user.id} className="user-item">
            <h1>{user.name}</h1>
            <div>
              <div className="details">
                <span>Email: {user.email}</span>
                <span>Phone: {user.phone}</span>
                <span>Website: {user.website}</span>
              </div>
              <div className={showDetails[user.id] ? "more-details visible" : "more-details"}>
              <div className="special-tags-container">
                <div className="special-tag">
                  <span>Name:</span>{user.name}
                </div>
                <div className="special-tag">
                  <span>Username:</span>{user.username}
                </div>
              </div>
                <p className="special-margin"><strong>Address:</strong></p>
                  <ul className='details'>
                    <li><strong>Street:</strong> {user.address.street}</li>
                    <li><strong>Suite:</strong> {user.address.suite}</li>
                    <li><strong>City:</strong> {user.address.city}</li>
                    <li><strong>Zipcode:</strong> {user.address.zipcode}</li>
                    <li><strong>Latitude:</strong> {user.address.geo.lat}</li>
                    <li><strong>Longitude:</strong> {user.address.geo.lng}</li>
                  </ul>
                  <p className="special-margin"><strong>Company:</strong></p>
                  <ul className='details'>
                  <li><strong>Name:</strong> {user.company.name}</li>
                  <li><strong>Catch Phrase:</strong> {user.company.catchPhrase}</li>
                  <li><strong>Business:</strong> {user.company.bs}</li>
                  </ul>
              </div>
            </div>
            <button
              onClick={() => toggleDetails(user.id)}
              className={showDetails[user.id] ? "hide-details-button" : "view-details-button"}
            >
              {showDetails[user.id] ? "Hide Details" : "View Details"}
            </button>
          </div>
        ))}
      </div>
      <div className="pagination">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={index + 1 === currentPage ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
