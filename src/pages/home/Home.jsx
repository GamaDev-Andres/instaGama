import { useCallback, useEffect, useState } from 'react';

import Header from '../../components/Header';
import ListOfPosts from '../../components/ListOfPosts';
import Spinner from '../../components/Spinner';
import { getPostsOfFollowing } from '../../services/getPostsOfFollowing';
import Histories from './components/Histories';

const Home = () => {
  const [posts, setPosts] = useState(null);
  useEffect(() => {
    getPostsOfFollowing().then((res) => {
      setPosts(
        res.posts.map((el) => {
          const { id, ...post } = el;
          post._id = id;
          return post;
        })
      );
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
    <main className="min-h-screen">
      <Header>
        <h1 className="font-black italic text-xl">InstaGama</h1>
      </Header>
      <div className="max-w-[600px] min-h-[calc(100vh-45px)] flex flex-col gap-0 sm:gap-8 mx-auto">
        <Histories />
        {!posts ? (
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
  );
};

export default Home;
