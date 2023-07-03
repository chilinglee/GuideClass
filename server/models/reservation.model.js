import { DataTypes, Model } from 'sequelize';

export class ReservationModel extends Model {}

ReservationModel.init(
  {
    reservation_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.STRING(36),
      allowNull: false,
    },
    teacher_id: {
      type: DataTypes.STRING(36),
      allowNull: false,
    },
    reservation_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    reservation_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    class_fee: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    is_deleted: {
      type: DataTypes.ENUM('0', '1'),
      defaultValue: '0',
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
    modelName: 'Reservation',
    tableName: 'reservations',
    timestamps: true,
    createdAt: 'created_on',
    updatedAt: false,
  }
);
