import { TeacherModel } from '../../models/teacher.model';
import { TeacherScheduleModel } from '../../models/teacherSchedule.model';
import { UserModel } from '../../models/user.model';
import { ReservationModel } from '../../models/reservation.model';
import moment from 'moment';

export default defineEventHandler(async (event) => {
  try {
    const { teacher_id, reserve_time } = await readBody(event);
    const { user } = event.context;

    const teacher = await TeacherModel.findByPk(teacher_id);
    //確認 user 點數足夠
    if (user.point < teacher.price) {
      setResponseStatus(event, 400);
      return createError({ statusCode: 400, message: '點數不足' });
    }

    //確認教師時段尚未被預約
    let schedule = await TeacherScheduleModel.findAll({
      where: {
        teacher_id: teacher_id,
      },
    });

    schedule = schedule.filter((x) =>
      moment(new Date(x.full_available_time).toISOString()).isSame(
        moment(new Date(reserve_time).toISOString())
      )
    )[0];

    if (schedule.is_reserved == '1') {
      return createError({
        statusCode: 400,
        message: '該時段已被預約',
      });
    }

    //確認學生該時段未有其他課程
    let reservations = await ReservationModel.findAll({
      where: {
        user_id: user.user_id,
      },
    });

    reservations = reservations.filter((x) =>
      moment(new Date(x.full_reservation_time).toISOString()).isSame(
        moment(new Date(reserve_time).toISOString())
      )
    );

    if (reservations.length > 0) {
      return createError({
        statusCode: 400,
        message: '該時段已有其他預約記錄，請勿再同時段預約多位教師上課。',
      });
    }

    //transaction
    //扣 user 點數 & 記錄 reservation
    const result = await sequelize.transaction(async (t) => {
      await UserModel.update(
        {
          point: user.point - teacher.price,
        },
        {
          where: {
            user_id: user.user_id,
          },
          transaction: t,
        }
      );

      await TeacherScheduleModel.update(
        { is_reserved: '1', reserved_by: user.user_id },
        {
          where: {
            teacher_schedule_id: schedule.teacher_schedule_id,
          },
          transaction: t,
        }
      );

      const reservation = await ReservationModel.create(
        {
          user_id: user.user_id,
          teacher_id: teacher_id,
          reservation_date: moment(new Date(reserve_time).toISOString()).format(
            'yyyy-MM-DD'
          ),
          reservation_time: moment(new Date(reserve_time).toISOString()).format(
            'HH:mm:ss'
          ),
          class_fee: teacher.price,
        },
        {
          transaction: t,
        }
      );

      return reservation;
    });

    return result;
    // If the execution reaches tsahis line, the transaction has been committed successfully
    // `result` is whatever was returned from the transaction callback (the `user`, in this case)
  } catch (error) {
    throw createError({
      statusCode: error.statusCode ?? 500,
      message: error.message ?? error.statusMessage ?? '',
    });
    // If the execution reaches this line, an error occurred.
    // The transaction has already been rolled back automatically by Sequelize!
  }
});
