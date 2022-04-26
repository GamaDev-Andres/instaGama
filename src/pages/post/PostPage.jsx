import { Link, useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/Header';
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
          <Link className="absolute px-4 left-0 top-0 bottom-0" to="/">
            <i className="fa-solid fa-arrow-left"></i>
          </Link>
          <h1>Foto</h1>
        </div>
      </Header>
      {loading || !data ? (
        <Spinner fullScreen={true} />
      ) : (
        <main>
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
