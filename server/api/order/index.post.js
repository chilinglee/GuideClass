import { OrderModel } from '../../models/order.model';
import { UserModel } from '../../models/user.model';

export default defineEventHandler(async (event) => {
  try {
    const { user } = event.context;
    const { plan, count, totalPrice, totalPoint } = await readBody(event);

    if (!user) {
      return sendRedirect(event, '/login', 302);
    }

    if (!(plan === '20000-16000' || plan === '3000-2700' || plan === '1-1')) {
      return createError({
        statusCode: 400,
        message: '方案資訊錯誤',
      });
    }

    if (typeof count !== 'number' || count <= 0) {
      return createError({
        statusCode: 400,
        message: '組數應大於 0 並為數值',
      });
    }

    if (typeof totalPrice !== 'number' || totalPrice <= 0) {
      return createError({
        statusCode: 400,
        message: '總計金額應大於 0 並為數值',
      });
    }

    if (typeof totalPoint !== 'number' || totalPoint <= 0) {
      return createError({
        statusCode: 400,
        message: '總計點數應大於 0 並為數值',
      });
    }

    const result = await sequelize.transaction(async (t) => {
      await UserModel.update(
        {
          point: user.point + totalPoint,
        },
        {
          where: {
            user_id: user.user_id,
          },
          transaction: t,
        }
      );

      const order = await OrderModel.create(
        {
          buyer: user.user_id,
          plan,
          count,
          total_price: totalPrice,
          total_point: totalPoint,
          pay_status: 'paid',
        },
        {
          transaction: t,
        }
      );

      return order;
    });

    return result;
  } catch (error) {
    throw createError({
      statusCode: error.statusCode ?? 500,
      message: error.message ?? error.statusMessage ?? '',
    });
  }
});
