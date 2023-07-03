import { DataTypes, Model } from 'sequelize';

export class TeacherScheduleModel extends Model {}

TeacherScheduleModel.init(
  {
    teacher_schedule_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    teacher_id: {
      type: DataTypes.STRING(36),
    },
    available_date: {
      type: DataTypes.DATE,
    },
    available_time: {
      type: DataTypes.TIME,
    },
    is_reserved: {
      type: DataTypes.ENUM('0', '1'),
      defaultValue: '0',
    },
    reserved_by: {
      type: DataTypes.STRING(36),
    },
    full_available_time: {
      type: DataTypes.VIRTUAL,
      get() {
        return (
          new Date(this.available_date).toDateString() +
          ' ' +
          this.available_time
        );
      },
      set(value) {
        throw new Error('full_available_time connot be set');
      },
    },
  },
  {
    sequelize,
    modelName: 'TeacherSchedule',
    tableName: 'teacherSchedules',
    timestamps: true,
    createdAt: 'created_on',
    updatedAt: 'update_on',
  }
);
