export const historiesToObject = (usuario, histories) => {
  const autor = {
    name: usuario.name,
    foto: usuario.foto,
    userName: usuario.userName,
    _id: usuario.id,
  };
  return { autor, histories };
}