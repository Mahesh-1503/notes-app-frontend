import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Container>
      <Row className="justify-content-center text-center mb-5">
        <Col md={8}>
          <h1 className="display-4 mb-4">Welcome to Notes App</h1>
          <p className="lead">
            A simple and elegant way to organize your thoughts and ideas.
            Create, edit, and manage your notes with ease.
          </p>
          {!isAuthenticated && (
            <div className="mt-4">
              <Button
                as={Link}
                to="/register"
                variant="primary"
                size="lg"
                className="me-3"
              >
                Get Started
              </Button>
              <Button
                as={Link}
                to="/login"
                variant="outline-primary"
                size="lg"
              >
                Login
              </Button>
            </div>
          )}
        </Col>
      </Row>

      <Row className="mt-5">
        <Col md={4}>
          <Card className="h-100">
            <Card.Body className="text-center">
              <h3>Create Notes</h3>
              <p>
                Easily create and organize your notes with a simple and intuitive
                interface.
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100">
            <Card.Body className="text-center">
              <h3>Edit & Update</h3>
              <p>
                Modify your notes anytime, anywhere. Keep your thoughts up to
                date.
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100">
            <Card.Body className="text-center">
              <h3>Secure & Private</h3>
              <p>
                Your notes are private and secure. Access them only when you're
                logged in.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home; 