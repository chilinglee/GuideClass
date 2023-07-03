import { TeacherScheduleModel } from '../../models/teacherSchedule.model';
import moment from 'moment';

export default defineEventHandler(async (event) => {
  const id = event.context.params.id;
  const query = getQuery(event);
  const schedule = await TeacherScheduleModel.findAll({
    where: {
      teacher_id: id,
      is_reserved: '0',
    },
  });

  //initDate 或 24 小時後時間較晚者為撈取 schedule 資料的起始值
  const initDate = moment(new Date(query.initDate)).isAfter(
    moment().add(1, 'd')
  )
    ? moment(new Date(query.initDate))
    : moment().add(1, 'd');
  const lastDate = moment(new Date(query.lastDate));

  const weekSchedule = schedule.filter((x) => {
    return (
      moment(new Date(x.full_available_time).toISOString()).isAfter(initDate) &&
      moment(new Date(x.full_available_time).toISOString()).isSameOrBefore(
        lastDate
      )
    );
  });

  return weekSchedule.reduce((acc, cur) => {
    const key = moment(new Date(cur.available_date)).format('MM/DD');
    if (acc[key]) {
      acc[key].push(cur.full_available_time);
    } else {
      acc[key] = [cur.full_available_time];
    }
    return acc;
  }, {});
});
