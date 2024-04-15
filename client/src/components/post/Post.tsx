interface PostProps {
  id: number;
  content: string;
  onUpdatePost: (postId: number, updatedContent: string) => void;
  onDeletePost: (postId: number) => void;
}

const Post: React.FC<PostProps> = ({
  id,
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
    <li className=''>
      <div>
        <p>{content}</p>
        <button onClick={handleUpdateClick}>Update</button>
        <button onClick={handleDeleteClick}>Delete</button>
      </div>
    </li>
  );
};

export default Post;
