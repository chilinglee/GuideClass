import { UserModel } from '../../models/user.model';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import moment from 'moment';
const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, password } = body;

  if (!email || !password) {
    throw createError({
      statusCode: 400,
      message: 'email & password 為必填欄位',
    });
  }

  const user = await UserModel.findOne({ where: { email } });
  if (!user) {
    throw createError({
      statusCode: 401,
      message: '登入資訊錯誤',
    });
  }

  const auth = await bcryptjs.compare(password, user.password);
  if (!auth) {
    throw createError({
      statusCode: 401,
      message: '登入資訊錯誤',
    });
  }
  const token = jwt.sign({ id: user.user_id }, config.JWT_SECRET, {
    expiresIn: '7d',
  });

  setCookie(event, 'access_token', token, {
    maxAge: 60 * 60 * 24 * 7,
    //httpOnly: true,
    expires: moment().add(7, 'd').toDate(),
    secure: process.env.NODE_ENV === 'production',
  });

  return {
    name: user.name,
    email,
    token,
  };
});
