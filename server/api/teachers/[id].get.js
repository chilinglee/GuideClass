import { TeacherModel } from '../../models/teacher.model';

export default defineEventHandler(async (event) => {
  const id = event.context.params.id;
  return TeacherModel.findByPk(id);
});
