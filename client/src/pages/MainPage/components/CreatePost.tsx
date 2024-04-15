import Button from '../../../components/common/Button';

type Props = {
  newPostContent: string;
  handleCreatePost: () => void;
  setNewPostContent: (content: string) => void;
};

const CreatePost = (props: Props) => {
  return (
    <div className='w-full max-w-md mx-auto mb-4 rounded-lg  bg-customMediumGray p-3 shadow-lg'>
      <div className='p-2 rounded-t-lg '>
        <textarea
          placeholder="What's happening?"
          value={props.newPostContent}
          onChange={(e) => props.setNewPostContent(e.target.value)}
          id='comment'
          rows={4}
          className='w-full p-4 text-lg text-gray-900 border-0 bg-customLightGray rounded-lg focus:ring-0 dark:text-white dark:placeholder-gray-400 focus:outline-none'
          required
        />
      </div>
      <div className='flex justify-end px-3 py-2'>
        <Button
          onClick={props.handleCreatePost}
          color='customBlue'
          textColor='white'
          text='Post'
          textSize='lg'
          width='32'
        />
      </div>
    </div>
  );
};

export default CreatePost;
