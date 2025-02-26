import React, { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import { fetchAttivita } from '../api';

const Attivita = () => {
  const [works, setWork] = useState([]);
  
    useEffect(() => {
      const getWork = async () => {
        const data = await fetchAttivita();
        setWork(data);
      };
      getWork();
    }, []);
  return (
    <Container className="mt-4">
    <h1>Attivita non proggetuali</h1>
      <Table striped bordered hover variant="info">
        <thead>
          <tr>
            <th>Giorno</th>
            <th>Id</th>
            <th>Ore durata</th>
            <th>Persone</th>
            <th>Tipo</th>
          </tr>
        </thead>
        <tbody>
          {works.map(work => (
            <tr key={work.id}>
              <td>{work.giorno}</td>
              <td>{work.id}</td>
              <td>{work.oredurata}</td>
              <td>{work.persona}</td>
              <td>{work.tipo}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Attivita;