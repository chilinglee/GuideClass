import { ReservationModel } from '../../models/reservation.model';
import { CommentModel } from '../../models/comment.model';
export default defineEventHandler(async (event) => {
  try {
    const { reservation_id, rate, comment } = await readBody(event);
    if (typeof rate !== 'number' || rate < 1 || rate > 5) {
      throw createError({
        statusCode: 400,
        message: '評價星級應為 1 ~ 5 的數字',
      });
    }

    if (comment.length > 800) {
      throw createError({
        statusCode: 400,
        message: '評價留言最多 800 字',
      });
    }

    const reservation = await ReservationModel.findByPk(reservation_id);

    const result = await sequelize.transaction(async (t) => {
      await ReservationModel.update(
        {
          is_commented: '1',
        },
        {
          where: {
            reservation_id: reservation_id,
          },
          transaction: t,
        }
      );
      const newComment = await CommentModel.create(
        {
          reservation_id,
          user_id: reservation.user_id,
          teacher_id: reservation.teacher_id,
          rate,
          comment,
        },
        {
          transaction: t,
        }
      );
      return newComment;
    });

    return result;
  } catch (error) {
    throw createError({
      statusCode: error.statusCode ?? 500,
      message: error.message ?? '系統發生錯誤，請稍後再試！',
    });
  }
});
