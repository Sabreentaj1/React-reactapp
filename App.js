import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://reqres.in/api/users?page=2');
      setUsers(response.data.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.first_name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="app">
      <input
        type="text"
        placeholder="Search by first name"
        value={searchText}
        onChange={handleSearchChange}
      />

      <div className="list-view">
        {filteredUsers.map((user) => (
          <div key={user.id} className="list-item">
            <div className="id">{user.id}</div>
            <img src={user.avatar} alt={user.first_name} />
            <div className="name">{user.first_name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
