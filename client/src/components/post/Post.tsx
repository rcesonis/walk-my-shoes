import React from 'react';

interface PostProps {
  id: number;
  author: string;
  content: string;
  onUpdatePost: (postId: number, updatedContent: string) => void;
  onDeletePost: (postId: number) => void;
}

const Post: React.FC<PostProps> = ({
  id,
  author,
  content,
  onUpdatePost,
  onDeletePost,
}) => {
  const handleUpdateClick = () => {
    const updatedContent = `Updated content for post ${id}`;
    onUpdatePost(id, updatedContent);
  };

  const handleDeleteClick = () => {
    onDeletePost(id);
  };

  return (
    <li>
      <div>
        <strong>{author}</strong>: {content}
      </div>
      <div>
        <button onClick={handleUpdateClick}>Update</button>
        <button onClick={handleDeleteClick}>Delete</button>
      </div>
    </li>
  );
};

export default Post;
