import { UserModel } from '../../models/user.model';
import bcryptjs from 'bcryptjs';
import validator from 'validator';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { name, email, password, confirmPassword } = body;
  const { user } = event.context;
  if (!user) {
    throw createError({
      statusCode: 401,
      message: '請先登入',
    });
  }
  // 內容不可為空
  if (!name || !email || !password || !confirmPassword) {
    throw createError({
      statusCode: 400,
      message: '更新失敗，欄位未填寫正確！',
    });
  }

  // 是否為 Email
  if (!validator.isEmail(email)) {
    throw createError({
      statusCode: 400,
      message: '更新失敗，Email 格式不正確 !',
    });
  }

  // 密碼正確
  if (password !== confirmPassword) {
    throw createError({
      statusCode: 400,
      message: '更新失敗，密碼不一致！',
    });
  }

  // 密碼强度
  if (!validator.isStrongPassword(password, { minSymbols: 0 })) {
    throw createError({
      statusCode: 400,
      message: '更新失敗，密碼需大於 8 碼，並包含數字、英文字母大小寫!',
    });
  }

  const enc_password = await bcryptjs.hash(password, 12);
  await UserModel.update(
    {
      name,
      email,
      password: enc_password,
    },
    { where: { user_id: user.user_id } }
  );

  const newUser = await UserModel.findByPk(user.user_id);

  return {
    name: newUser.name,
    email: newUser.email,
  };
});
