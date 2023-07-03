import { UserModel } from '../../models/user.model';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
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

  console.log(user.user_id);
  const token = jwt.sign({ id: user.user_id }, config.JWT_SECRET, {
    expiresIn: '7d',
  });

  return {
    name: user.name,
    email,
    token,
  };
});
