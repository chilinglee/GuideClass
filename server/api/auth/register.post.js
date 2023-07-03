import { UserModel } from '../../models/user.model';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import moment from 'moment';
const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { name, email, password, confirmPassword } = body;
  // 內容不可為空
  if (!name || !email || !password || !confirmPassword) {
    throw createError({
      statusCode: 400,
      message: '註冊失敗，欄位未填寫正確！',
    });
  }

  // 是否為 Email
  if (!validator.isEmail(email)) {
    throw createError({
      statusCode: 400,
      message: '註冊失敗，Email 格式不正確 !',
    });
  }

  // 密碼正確
  if (password !== confirmPassword) {
    throw createError({
      statusCode: 400,
      message: '註冊失敗，密碼不一致！',
    });
  }

  // 密碼强度
  if (!validator.isStrongPassword(password, { minSymbols: 0 })) {
    throw createError({
      statusCode: 400,
      message: '註冊失敗，密碼需大於 8 碼，並包含數字、英文字母大小寫!',
    });
  }

  const enc_password = await bcryptjs.hash(password, 12);
  const user = await UserModel.create({
    name,
    email,
    password: enc_password,
  });

  const token = jwt.sign(
    {
      id: user.user_id,
    },
    config.JWT_SECRET,
    { expiresIn: '7d' }
  );

  setCookie(event, 'access_token', token, {
    maxAge: 60 * 60 * 24 * 7,
    //httpOnly: true,
    expires: moment().add(7, 'd').toDate(),
    secure: process.env.NODE_ENV === 'production',
  });

  return {
    name: user.name,
    email: user.email,
    token,
  };
});
