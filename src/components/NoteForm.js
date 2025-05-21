import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const NoteForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  useEffect(() => {
    if (isEditing) {
      fetchNote();
    }
  }, [id]);

  const fetchNote = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/notes/${id}`);
      const { title, content } = response.data;
      setTitle(title);
      setContent(content);
    } catch (err) {
      setError('Failed to fetch note');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);

      if (isEditing) {
        await axios.put(`${API_URL}/api/notes/${id}`, {
          title,
          content,
        });
      } else {
        await axios.post(`${API_URL}/api/notes`, {
          title,
          content,
        });
      }

      navigate('/notes');
    } catch (err) {
      setError('Failed to save note');
    }
    setLoading(false);
  };

  return (
    <div className="d-flex justify-content-center">
      <Card style={{ width: '800px' }}>
        <Card.Body>
          <h2 className="text-center mb-4">
            {isEditing ? 'Edit Note' : 'Create Note'}
          </h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={10}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </Form.Group>
            <div className="d-flex justify-content-between">
              <Button
                variant="secondary"
                onClick={() => navigate('/notes')}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                variant="primary"
              >
                {loading ? 'Saving...' : isEditing ? 'Update Note' : 'Create Note'}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default NoteForm; 