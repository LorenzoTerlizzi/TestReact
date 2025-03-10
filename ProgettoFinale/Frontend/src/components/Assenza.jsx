
import React, { useEffect, useState, useMemo } from 'react';
import { Container, Table, Form } from 'react-bootstrap';
import { fetchPosts } from '../api';

const Assenza = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  useEffect(() => {
    const getPosts = async () => {
      const data = await fetchPosts();
      setPosts(data);
    };
    getPosts();
  }, []);

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedPosts = useMemo(() => {
    let sorted = [...posts];

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
  }, [posts, sortColumn, sortDirection]);

  const filteredPosts = useMemo(() => {
    return sortedPosts.filter((post) => {
      const search = searchTerm.toLowerCase();
      return (
        post.giorno.toLowerCase().includes(search) ||
        post.id.toString().includes(search) ||
        post.persona.toLowerCase().includes(search) ||
        post.tipo.toLowerCase().includes(search)
      );
    });
  }, [sortedPosts, searchTerm]);

  const getSortIndicator = (column) => {
    if (sortColumn === column) {
      return sortDirection === 'asc' ? ' ▲' : ' ▼';
    }
    return '';
  };

  return (
    <Container className="mt-4">
      <h1>Assenze</h1>
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
            <th onClick={() => handleSort('id')}>ID{getSortIndicator('giorno')}</th>
            <th onClick={() => handleSort('persona')}>Persona{getSortIndicator('id')}</th>
            <th onClick={() => handleSort('tipo')}>Tipo{getSortIndicator('persona')}</th>
            <th onClick={() => handleSort('giorno')}>Giorno{getSortIndicator('tipo')}</th>
          </tr>
        </thead>
        <tbody>
          {filteredPosts.map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.persona}</td>
              <td>{post.tipo}</td>
              <td>{post.giorno}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Assenza;