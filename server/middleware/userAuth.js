import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user.model';
const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  //const auth = getRequestHeader(event, 'Authorization');
  let token = getCookie(event, 'access_token');
  //let token = '';
  if (token) {
    //token = auth.split(' ')[1];
    let id = '';
    await jwt.verify(token, config.JWT_SECRET, (err, payload) => {
      if (err) {
        return sendRedirect(event, '/login', 302);
      }
      id = payload.id;
    });

    const currentUser = await UserModel.findByPk(id);
    event.context.user = currentUser;
  }
});
