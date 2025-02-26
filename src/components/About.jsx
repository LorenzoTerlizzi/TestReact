import React from 'react';
import { Container, Card } from 'react-bootstrap';

const About = () => {
  return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <Card.Title>About</Card.Title>
          <Card.Text>
            Questa applicazione è stata sviluppata come esame di Web 2. 
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default About;