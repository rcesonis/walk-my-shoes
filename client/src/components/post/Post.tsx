import React from 'react';

interface PostProps {
  id: number;
  title: string;
  content: string;
  onUpdatePost: (postId: number, updatedContent: string) => void;
  onDeletePost: (postId: number) => void;
}

const Post: React.FC<PostProps> = ({
  id,
  title,
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
        <strong>{title}</strong>: {content}
      </div>
      <div>
        <button onClick={handleUpdateClick}>Update</button>
        <button onClick={handleDeleteClick}>Delete</button>
      </div>
    </li>
  );
};

export default Post;
