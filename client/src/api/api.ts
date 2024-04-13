import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
    authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});
export const getPosts = async () => {
  try {
    const response = await api.get('/api/post');
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

export const createPost = async (postData: any) => {
  try {
    const response = await api.post('/api/post', postData);
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

export const updatePost = async (postId: number, postData: any) => {
  try {
    const response = await api.put(`/api/post/${postId}`, postData);
    return response.data;
  } catch (error) {
    console.error(`Error updating post with ID ${postId}:`, error);
    throw error;
  }
};

export const deletePost = async (postId: number) => {
  try {
    const response = await api.delete(`/api/post/${postId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting post with ID ${postId}:`, error);
    throw error;
  }
};
