import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react/cjs/react.development';
import Header from '../../components/Header';
import PostProvider from '../../components/Post/context/PostProvider';
import Post from '../../components/Post/Post';
import Spinner from '../../components/Spinner';
import { getOnePost } from '../../services/getOnePost';

const PostPage = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const isMounted = useRef(true);
  const navigate = useNavigate();

  useEffect(() => {
    isMounted.current = true;
    async function getData() {
      const response = await getOnePost(id);
      console.log(response);
      if (!response) {
        setLoading(false);
        navigate('/');
      }
      if (isMounted.current && response) {
        setData(response.post);
        setLoading(false);
      }
    }
    getData();

    return () => {
      isMounted.current = false;
    };
  }, [id]);

  return (
    <div>
      <Header>
        <h1>Foto</h1>
      </Header>
      {loading || !data ? (
        <Spinner fullScreen={true} />
      ) : (
        <main>
          <PostProvider data={data}>
            <Post />
          </PostProvider>
        </main>
      )}
    </div>
  );
};

export default PostPage;
