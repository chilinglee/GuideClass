import { DataTypes, Model } from 'sequelize';

export class TeacherModel extends Model {}

TeacherModel.init(
  {
    teacher_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    language: {
      type: DataTypes.ENUM('ENG', 'JAP', 'KOR', 'SPA', 'DUT'),
    },
    name: {
      type: DataTypes.STRING(20),
    },
    title: {
      type: DataTypes.STRING(20),
    },
    tags: {
      type: DataTypes.JSON,
    },
    introduction: {
      type: DataTypes.STRING(500),
    },
    price: {
      type: DataTypes.INTEGER,
    },
    price_minutes: {
      type: DataTypes.INTEGER,
    },
    class_time: {
      type: DataTypes.JSON,
    },
    teacher_photo: {
      type: DataTypes.STRING(200),
    },
    reservation_count: {
      type: DataTypes.INTEGER,
    },
  },

  {
    sequelize,
    modelName: 'Teacher',
    tableName: 'teachers',
    timestamps: true,
    createdAt: 'created_on',
    updatedAt: 'update_on',
  }
);
