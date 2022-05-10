import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/Header';
import LeftArrowButton from '../../components/LeftArrowButton';
import PostProvider from '../../components/Post/context/PostProvider';
import Post from '../../components/Post/Post';
import Spinner from '../../components/Spinner';
import useGetPost from './hook/useGetPost';

const PostPage = () => {
  const { id } = useParams();
  const { loading, data, setData } = useGetPost(id);
  const navigate = useNavigate();
  const handleUpdatePost = (_, descripcion) => {
    setData({ ...data, descripcion });
  };
  const handleDeletePost = () => {
    navigate('/');
  };
  const handleLikePost = (post) => {
    setData(post);
  };

  return (
    <div>
      <Header>
        <div className="relative center w-full">
          <LeftArrowButton path="/" />
          <h1>Foto</h1>
        </div>
      </Header>
      {loading || !data ? (
        <Spinner fullScreen={true} />
      ) : (
        <main className="max-w-[935px] mx-auto">
          <PostProvider
            updatePost={handleUpdatePost}
            handleDeletePost={handleDeletePost}
            handleLikePostState={handleLikePost}
            data={data}
          >
            <Post />
          </PostProvider>
        </main>
      )}
    </div>
  );
};

export default PostPage;
