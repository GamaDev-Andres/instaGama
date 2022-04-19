import propTypes from 'prop-types';

const DataProfile = ({ posts, followers, following }) => {
  // const { state } = useAuthContext();
  // const { following, followers, posts } =

  const data = [
    { type: 'publicaciones', number: posts?.length },
    { type: 'seguidores', number: followers?.length },
    { type: 'seguidos', number: following?.length },
  ];
  return (
    <div className="center py-3">
      {data.map((el) => (
        <div
          className="center-col text-sm flex-grow text-grisLetra"
          key={el.type}
        >
          <span className="font-semibold text-negro">{el.number}</span>
          {el.type}
        </div>
      ))}
    </div>
  );
};
DataProfile.propTypes = {
  posts: propTypes.array.isRequired,
  followers: propTypes.array.isRequired,
  following: propTypes.array.isRequired,
};
export default DataProfile;
