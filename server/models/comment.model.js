import { DataTypes, Model } from 'sequelize';

export class CommentModel extends Model {}

CommentModel.init(
  {
    comment_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    reservation_id: {
      type: DataTypes.STRING(36),
      allowNull: false,
    },
    user_id: {
      type: DataTypes.STRING(36),
      allowNull: false,
    },
    teacher_id: {
      type: DataTypes.STRING(36),
      allowNull: false,
    },
    rate: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING(1000),
    },
  },
  {
    sequelize,
    modelName: 'Comment',
    tableName: 'comments',
    timestamps: true,
    createdAt: 'created_on',
    updatedAt: false,
  }
);
