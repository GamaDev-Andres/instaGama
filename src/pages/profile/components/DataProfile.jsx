const DataProfile = () => {
  const data = [
    { type: 'publicaciones', number: 10 },
    { type: 'seguidores', number: 125 },
    { type: 'seguidos', number: 345 },
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

export default DataProfile;
