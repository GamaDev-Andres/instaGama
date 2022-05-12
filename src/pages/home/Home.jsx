import { useCallback, useEffect, useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';

import Header from '../../components/Header';
import ListOfPosts from '../../components/ListOfPosts';
import Spinner from '../../components/Spinner';
import { getPostsOfFollowing } from '../../services/getPostsOfFollowing';
import Histories from './components/Histories';
import HistoriesProvider from './context/HistoriesProvider';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const isMounted = useRef(true);

  useEffect(() => {
    setLoading(true);
    getPostsOfFollowing().then((res) => {
      if (isMounted.current) {
        setPosts(
          res.posts.map((el) => {
            const { id, ...post } = el;
            post._id = id;
            return post;
          })
        );
        setLoading(false);
      }
      return () => {
        isMounted.current = false;
      };
    });
  }, []);

  const handleUpdatePost = useCallback(
    (idPost, data) => {
      setPosts(
        posts.map((el) =>
          el._id === idPost ? { ...el, descripcion: data } : el
        )
      );
    },
    [posts]
  );

  const handleDeletePost = useCallback(
    (idPost) => {
      setPosts(posts.filter((el) => el._id !== idPost));
    },
    [posts]
  );

  const handleLikePost = useCallback(
    (newPost) => {
      setPosts(posts.map((el) => (el._id === newPost._id ? newPost : el)));
    },
    [posts]
  );

  return (
    <>
      <Helmet>
        <title>InstaGama</title>
      </Helmet>
      <main className="min-h-screen">
        <Header>
          <h1 className="font-black italic text-xl">InstaGama</h1>
        </Header>
        <div className="max-w-[935px] min-h-[calc(100vh-45px)] flex flex-col gap-0 sm:gap-8 mx-auto">
          <HistoriesProvider>
            <Histories />
          </HistoriesProvider>
          {loading ? (
            <Spinner fullScreen={true} />
          ) : (
            <ListOfPosts
              arrPosts={posts}
              handleDeletePost={handleDeletePost}
              handleLikePost={handleLikePost}
              handleUpdatePost={handleUpdatePost}
            />
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
