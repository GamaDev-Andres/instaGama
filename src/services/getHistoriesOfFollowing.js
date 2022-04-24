// export const getHistoriesOfFollowing = async () => {
//   try {
//     const historiesOfFollowing = await Promise.all(
//       state?.user?.following.map((el) => getHistoriesUser(el))
//     );
//     return historiesOfFollowing;
//   } catch (error) {
//     console.log(error);
//   }
// }, 