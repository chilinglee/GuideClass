import { ReservationModel } from '../../models/reservation.model';
import { OrderModel } from '../../models/order.model';

export default defineEventHandler(async (event) => {
  const { user } = event.context;

  if (!user) {
    throw createError({
      statusCode: 401,
      message: '請先登入',
    });
  }

  let reservations = await ReservationModel.findAll({
    where: {
      user_id: user.user_id,
    },
  });

  let orders = await OrderModel.findAll({
    where: {
      buyer: user.user_id,
    },
  });

  reservations = reservations.map((r) => {
    return {
      created_on: r.created_on,
      type: '購課',
      point: r.class_fee * -1,
    };
  });

  orders = orders.map((o) => {
    return {
      created_on: o.created_on,
      type: '購買點數',
      point: o.total_point,
    };
  });

  const histories = reservations
    .concat(orders)
    .sort((a, b) => {
      //asc 排序
      return a.created_on - b.created_on;
    })
    .reduce((acc, cur, curIndex) => {
      //計算 subtotal 小計
      const _acc = [...acc];
      if (curIndex === 0) {
        cur['subtotal'] = 0 + cur.point;
      } else {
        const last = _acc.pop(); //取得最後一筆資料
        cur['subtotal'] = last.subtotal + cur.point;
      }
      acc.push(cur);
      return acc;
    }, [])
    .sort((a, b) => {
      //desc 排序
      return b.created_on - a.created_on;
    });

  return histories;
});
