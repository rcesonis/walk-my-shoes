import Post from '../post/Post';
import CreatePost from '../../pages/MainPage/components/CreatePost';

interface PostData {
  id: number;
  content: string;
}

interface PostFeedProps {
  posts: PostData[];
  onUpdatePost: (postId: number, updatedContent: string) => void;
  onDeletePost: (postId: number) => void;
  onCreatePost: (newPostContent: string) => void;
  newPostContent: string;
  setNewPostContent: React.Dispatch<React.SetStateAction<string>>;
}

const PostFeed: React.FC<PostFeedProps> = ({
  posts,
  onUpdatePost,
  onDeletePost,
  onCreatePost,
  newPostContent,
  setNewPostContent,
}) => {
  const handleCreatePost = () => {
    if (!newPostContent.trim()) return;

    onCreatePost(newPostContent);
    setNewPostContent('');
  };

  console.log('posts:', posts);
  return (
    <div className='flex flex-col m-4 items-center'>
      <CreatePost
        newPostContent={newPostContent}
        handleCreatePost={handleCreatePost}
        setNewPostContent={setNewPostContent}
      />
      <ul className='flex mx-5 bg-customMediumGray max-w-2xl border'>
        {posts.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            content={post.content}
            onUpdatePost={onUpdatePost}
            onDeletePost={onDeletePost}
          />
        ))}
      </ul>
    </div>
  );
};

export default PostFeed;
