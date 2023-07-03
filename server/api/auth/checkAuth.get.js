export default defineEventHandler(async (event) => {
  const { user = null } = event.context;
  const isLogin = user ? true : false;
  return {
    isLogin,
    name: user?.name,
    email: user?.email,
    point: user?.point,
  };
});
