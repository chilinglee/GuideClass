export default defineEventHandler(async (event) => {
  const { user } = event.context;
  if (!user) {
    throw createError({
      statusCode: 401,
      message: '請先登入',
    });
  }
  return {
    name: user.name,
    email: user.email,
  };
});
