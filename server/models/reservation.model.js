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
    reservation_period: {
      type: DataTypes.ENUM('1', '2', '3', '4'),
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
