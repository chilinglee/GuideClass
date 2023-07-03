import { DataTypes, Model } from 'sequelize';

export class OrderModel extends Model {}

OrderModel.init(
  {
    order_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    buyer: {
      type: DataTypes.STRING(36),
      allowNull: false,
    },
    plan: {
      type: DataTypes.ENUM('1-1', '3000-2700', '20000-16000'),
      allowNull: false,
    },
    count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_point: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    transaction_no: {
      type: DataTypes.STRING(22),
    },
    pay_status: {
      type: DataTypes.ENUM('paid', 'failed', 'unpaid'),
      defaultValue: 'unpaid',
    },
  },
  {
    sequelize,
    modelName: 'Order',
    tableName: 'orders',
    timestamps: true,
    createdAt: 'created_on',
    updatedAt: false,
  }
);
