// import React, { useEffect, useState } from 'react';
// import { Container, Table } from 'react-bootstrap';
// import { fetchAttivita } from '../api';

// const Attivita = () => {
//   const [works, setWork] = useState([]);
  
//     useEffect(() => {
//       const getWork = async () => {
//         const data = await fetchAttivita();
//         setWork(data);
//       };
//       getWork();
//     }, []);
//   return (
//     <Container className="mt-4">
//     <h1>Attivita non proggetuali</h1>
//       <Table striped bordered hover variant="info">
//         <thead>
//           <tr>
//             <th>Giorno</th>
//             <th>Id</th>
//             <th>Ore durata</th>
//             <th>Persone</th>
//             <th>Tipo</th>
//           </tr>
//         </thead>
//         <tbody>
//           {works.map(work => (
//             <tr key={work.id}>
//               <td>{work.giorno}</td>
//               <td>{work.id}</td>
//               <td>{work.oredurata}</td>
//               <td>{work.persona}</td>
//               <td>{work.tipo}</td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </Container>
//   );
// };

// export default Attivita;
import React, { useEffect, useState, useMemo } from 'react';
import { Container, Table, Form } from 'react-bootstrap';
import { fetchAttivita } from '../api';

const Attivita = () => {
  const [works, setWork] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  useEffect(() => {
    const getWork = async () => {
      const data = await fetchAttivita();
      setWork(data);
    };
    getWork();
  }, []);

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedWorks = useMemo(() => {
    let sorted = [...works];

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
  }, [works, sortColumn, sortDirection]);

  const filteredWorks = useMemo(() => {
    return sortedWorks.filter((work) => {
      const search = searchTerm.toLowerCase();
      return (
        work.giorno.toLowerCase().includes(search) ||
        work.id.toString().includes(search) ||
        work.oredurata.toString().includes(search) ||
        work.persona.toLowerCase().includes(search) ||
        work.tipo.toLowerCase().includes(search)
      );
    });
  }, [sortedWorks, searchTerm]);

  const getSortIndicator = (column) => {
    if (sortColumn === column) {
      return sortDirection === 'asc' ? ' ▲' : ' ▼';
    }
    return '';
  };

  return (
    <Container className="mt-4">
      <h1>Attivita non proggetuali</h1>
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
            <th onClick={() => handleSort('giorno')}>Giorno{getSortIndicator('giorno')}</th>
            <th onClick={() => handleSort('id')}>Id{getSortIndicator('id')}</th>
            <th onClick={() => handleSort('oredurata')}>Ore durata{getSortIndicator('oredurata')}</th>
            <th onClick={() => handleSort('persona')}>Persone{getSortIndicator('persona')}</th>
            <th onClick={() => handleSort('tipo')}>Tipo{getSortIndicator('tipo')}</th>
          </tr>
        </thead>
        <tbody>
          {filteredWorks.map((work) => (
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