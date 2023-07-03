export default defineEventHandler(async (event) => {
  const { user } = event.context;
  if (!user) {
    return sendRedirect(event, '/login', 302);
  }
  return {
    name: user.name,
    email: user.email,
  };
});
