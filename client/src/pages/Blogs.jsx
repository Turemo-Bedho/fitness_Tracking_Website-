import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import BlogCard from "../components/cards/BlogCard";
import BlogForm from "../components/BlogForm";

const Container = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 22px 0px;
  overflow-y: scroll;
  background-color: ${({ theme }) => theme.background};
`;

const Wrapper = styled.div`
  flex: 1;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  gap: 22px;
  @media (max-width: 600px) {
    gap: 12px;
    padding: 0 16px;
  }
`;

const Title = styled.div`
  font-size: 32px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 700;
  text-align: center;
  margin-bottom: 40px;
`;

const ToggleButton = styled.button`
  padding: 10px 16px;
  font-size: 16px;
  color: ${({ theme }) => theme.button_text};
  background-color: ${({ theme }) => theme.button_background};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  position: fixed;
  top: 100px;
  right: 20px;
  z-index: 100;
  &:hover {
    background-color: ${({ theme }) => theme.button_hover};
  }
`;

const Blogs = () => {
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/blogs");
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const addPost = async (newPost) => {
    try {
      const response = await axios.post("http://localhost:5000/api/blogs", newPost);
      console.log(response.data.message);
      fetchPosts();
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <Container>
      <Wrapper>
        <Title>Latest Blogs</Title>
        {showForm && <BlogForm addPost={addPost} closeForm={toggleForm} />}
        <ToggleButton onClick={toggleForm}>
          {showForm ? "Close Form" : "Add New Post"}
        </ToggleButton>
        {posts.map((post) => (
          post && post.title && post.content ? (
            <BlogCard key={post.post_id} title={post.title} content={post.content} />
          ) : null
        ))}
      </Wrapper>
    </Container>
  );
};

export default Blogs;
