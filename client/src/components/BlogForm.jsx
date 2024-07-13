import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Input = styled.input`
  padding: 8px;
  font-size: 16px;
`;

const Textarea = styled.textarea`
  padding: 8px;
  font-size: 16px;
  height: 200px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const BlogForm = ({ addPost, closeForm }) => {
  const [authorId, setAuthorId] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBlog = { author_id: authorId, title, content };

    try {
      await addPost(newBlog);
      setMessage('Blog post added successfully');
      setAuthorId('');
      setTitle('');
      setContent('');
      closeForm();
    } catch (error) {
      console.error('Error adding blog post:', error);
      setMessage('Error adding blog post');
    }
  };

  return (
    <FormContainer>
      <h2>Add New Blog Post</h2>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Author ID"
          value={authorId}
          onChange={(e) => setAuthorId(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <Textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <Button type="submit">Add Blog Post</Button>
      </form>
      {message && <p>{message}</p>}
    </FormContainer>
  );
};

BlogForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  closeForm: PropTypes.func.isRequired,
};

export default BlogForm;
