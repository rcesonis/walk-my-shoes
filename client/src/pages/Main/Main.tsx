import React, { useEffect, useState } from 'react';
import Navigation from '../../components/navigation/Navigation';
import PostFeed from '../../components/postfeed/PostFeed';
import { getPublicPosts, updatePost, deletePost, createPost } from '../../api/api';

const Main: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [newPostContent, setNewPostContent] = useState<string>('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await getPublicPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleUpdatePost = async (postId: number, updatedContent: string) => {
    try {
      const updatedPost = await updatePost(postId, { content: updatedContent });
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post.id === postId ? { ...post, content: updatedPost.content } : post))
      );
    } catch (error) {
      console.error(`Error updating post ${postId}:`, error);
    }
  };

  const handleDeletePost = async (postId: number) => {
    try {
      await deletePost(postId);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error(`Error deleting post ${postId}:`, error);
    }
  };

  const handleCreatePost = async () => {
    if (!newPostContent.trim()) return;

    try {
      const newPost = await createPost({ content: newPostContent });
      setPosts((prevPosts) => [...prevPosts, newPost]);
      setNewPostContent('');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div>
      <Navigation />
      <PostFeed
        posts={posts}
        onUpdatePost={handleUpdatePost}
        onDeletePost={handleDeletePost}
        onCreatePost={handleCreatePost}
        newPostContent={newPostContent}
        setNewPostContent={setNewPostContent}
      />
    </div>
  );
};

export default Main;
