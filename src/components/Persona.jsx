import React, { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import { fetchUsers } from '../api';



const Persona = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const data = await fetchUsers();
      setUsers(data);
    };
    getUsers();
  }, []);

  return (
    <Container className="mt-4">
      <h1>Persona</h1>
      <Table striped bordered hover variant="info">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Cognome</th>
            <th>Posizione</th>
            <th>Stipendio</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.nome}</td>
              <td>{user.cognome}</td>
              <td>{user.posizione}</td>
              <td className='text-end'>{user.stipendio}€</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Persona;