import React, { useEffect, useState } from 'react';
import MainNavigation from '../../components/navigation/MainNavigation';
import PostFeed from '../../components/postfeed/PostFeed';
import { getPosts, updatePost, deletePost, createPost } from '../../api/api';

const MainPage: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [newPostContent, setNewPostContent] = useState<string>('');
  const [newPostTitle, setNewPostTitle] = useState<string>('');
  const token = localStorage.getItem('token');
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await getPosts(token || '');
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [token]);

  const handleUpdatePost = async (postId: number, updatedContent: string) => {
    try {
      const updatedPost = await updatePost(postId, { content: updatedContent });
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, content: updatedPost.content } : post
        )
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
      const newPost = await createPost(
        {
          content: newPostContent,
          title: newPostTitle,
        },
        token || ''
      );
      setPosts((prevPosts) => [...prevPosts, newPost]);
      setNewPostContent('');
      setNewPostTitle('');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div>
      <MainNavigation />
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

export default MainPage;
