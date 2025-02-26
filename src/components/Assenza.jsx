import React, { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import { fetchPosts } from '../api';

const Assenza = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const data = await fetchPosts();
      setPosts(data);
    };
    getPosts();
  }, []);

  return (
    <Container className="mt-4">
      <h1>Assenze</h1>
      <Table striped bordered hover variant="info">
        <thead>
          <tr>
            <th>Giorno</th>
            <th>Id</th>
            <th>Persona</th>
            <th>Tipo</th>
          </tr>
        </thead>
        <tbody>
          {posts.map(post => (
            <tr key={post.id}>
              <td>{post.giorno}</td>
              <td>{post.id}</td>
              <td>{post.persona}</td>
              <td>{post.tipo}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* {posts.map(post => (
        <Card key={post.id} className="mb-3">
          <Card.Body>
            <Card.Title>{post.title}</Card.Title>
            <Card.Text>{post.body}</Card.Text>
          </Card.Body>
        </Card>
      ))} */}
    </Container>
  );
};

export default Assenza;