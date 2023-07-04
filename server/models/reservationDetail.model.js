import { DataTypes, Model } from 'sequelize';

export class ReservationDetailModel extends Model {}

ReservationDetailModel.init(
  {
    reservation_id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.STRING(36),
    },
    teacher_id: {
      type: DataTypes.STRING(36),
    },
    reservation_date: {
      type: DataTypes.DATE,
    },
    reservation_time: {
      type: DataTypes.TIME,
    },
    class_fee: {
      type: DataTypes.INTEGER,
    },
    created_on: {
      type: DataTypes.DATE,
    },
    is_deleted: {
      type: DataTypes.ENUM('0', '1'),
    },
    t_id: {
      type: DataTypes.STRING(36),
    },
    teacher_name: {
      type: DataTypes.STRING(20),
    },
    teacher_title: {
      type: DataTypes.STRING(20),
    },
    teacher_photo: {
      type: DataTypes.STRING(200),
    },
    full_reservation_time: {
      type: DataTypes.VIRTUAL,
      get() {
        return (
          new Date(this.reservation_date).toDateString() +
          ' ' +
          this.reservation_time
        );
      },
      set(value) {
        throw new Error('full_reservation_time connot be set');
      },
    },
    status: {
      type: DataTypes.VIRTUAL,
      get() {
        const class_time =
          new Date(this.reservation_date).toDateString() +
          ' ' +
          this.reservation_time;
        if (this.is_deleted === '1') {
          return '已取消';
        } else if (new Date() > new Date(class_time)) {
          return '已完成';
        } else {
          return '即將上課';
        }
      },
      set(value) {
        throw new Error('status connot be set');
      },
    },
  },
  {
    sequelize,
    modelName: 'ReservationDetail',
    tableName: 'reservationDetail',
    timestamps: false,
  }
);
