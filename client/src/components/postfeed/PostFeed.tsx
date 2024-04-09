import React from 'react';
import Post from '../post/Post';

interface PostData {
  id: number;
  title: string;
  content: string;
}

interface PostFeedProps {
  posts: PostData[];
  onUpdatePost: (postId: number, updatedContent: string) => void;
  onDeletePost: (postId: number) => void;
  onCreatePost: (newPostContent: string, newPostTitle: string) => void;
  newPostContent: string;
  newPostTitle: string;
  setNewPostContent: React.Dispatch<React.SetStateAction<string>>;
  setNewPostTitle: React.Dispatch<React.SetStateAction<string>>;
}

const PostFeed: React.FC<PostFeedProps> = ({
  posts,
  onUpdatePost,
  onDeletePost,
  onCreatePost,
  newPostContent,
  newPostTitle,
  setNewPostContent,
  setNewPostTitle,
}) => {
  const handleCreatePost = () => {
    if (!newPostContent.trim()) return;

    onCreatePost(newPostContent, newPostTitle);
    setNewPostContent('');
    setNewPostTitle('');
  };

  return (
    <div>
      <h1>Public Posts</h1>
      <ul>
        {posts.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            title={post.title}
            content={post.content}
            onUpdatePost={onUpdatePost}
            onDeletePost={onDeletePost}
          />
        ))}
      </ul>

      <h2>Create New Post</h2>
      <div>
        <input
          type='text'
          placeholder='Title'
          value={newPostTitle}
          onChange={(e) => setNewPostTitle(e.target.value)}
        />
        <input
          type='text'
          placeholder='Enter post content'
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
        />
        <button onClick={handleCreatePost}>Create Post</button>
      </div>
    </div>
  );
};

export default PostFeed;
