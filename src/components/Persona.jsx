
import React, { useEffect, useState } from 'react';
import { Container, Table, Form } from 'react-bootstrap';
import { fetchUsers } from '../api';

const Persona = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  useEffect(() => {
    const getUsers = async () => {
      const data = await fetchUsers();
      setUsers(data);
    };
    getUsers();
  }, []);

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedUsers = React.useMemo(() => {
    let sorted = [...users];

    if (sortColumn) {
      sorted.sort((a, b) => {
        const aValue = a[sortColumn];
        const bValue = b[sortColumn];

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortDirection === 'asc'
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        } else {
          return sortDirection === 'asc'
            ? (aValue > bValue ? 1 : aValue < bValue ? -1 : 0)
            : (aValue < bValue ? 1 : aValue > bValue ? -1 : 0);
        }
      });
    }

    return sorted;
  }, [users, sortColumn, sortDirection]);

  const filteredUsers = React.useMemo(() => {
    return sortedUsers.filter((user) => {
      const search = searchTerm.toLowerCase();
      return (
        user.nome.toLowerCase().includes(search) ||
        user.cognome.toLowerCase().includes(search) ||
        user.posizione.toLowerCase().includes(search) ||
        user.stipendio.toString().includes(search)
      );
    });
  }, [sortedUsers, searchTerm]);

  const getSortIndicator = (column) => {
    if (sortColumn === column) {
      return sortDirection === 'asc' ? ' ▲' : ' ▼';
    }
    return '';
  };

  return (
    <Container className="mt-4">
      <h1>Persona</h1>
      <Form.Control
        type="text"
        placeholder="Cerca..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-3"
      />
      <Table striped bordered hover variant="info">
        <thead>
          <tr>
            <th onClick={() => handleSort('nome')}>Nome{getSortIndicator('nome')}</th>
            <th onClick={() => handleSort('cognome')}>Cognome{getSortIndicator('cognome')}</th>
            <th onClick={() => handleSort('posizione')}>Posizione{getSortIndicator('posizione')}</th>
            <th onClick={() => handleSort('stipendio')}>Stipendio{getSortIndicator('stipendio')}</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.nome}</td>
              <td>{user.cognome}</td>
              <td>{user.posizione}</td>
              <td className="text-end">{user.stipendio}€</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Persona;