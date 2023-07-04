import { ReservationDetailModel } from '../../models/reservationDetail.model';
export default defineEventHandler(async (event) => {
  const { user } = event.context;

  if (!user) {
    throw createError({
      statusCode: 401,
      message: '請先登入',
    });
  }

  let reservations = await ReservationDetailModel.findAll({
    where: {
      user_id: user.user_id,
    },
  });

  reservations = reservations.sort((a, b) => {
    return (
      new Date(b.full_reservation_time) - new Date(a.full_reservation_time)
    );
  });

  return reservations;
});
