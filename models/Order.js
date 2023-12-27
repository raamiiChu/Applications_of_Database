import sequelize from "../db.js";

import { DataTypes } from "sequelize";

const Order = sequelize.define("order", {
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { min: 0 },
    },
    fee: {
        type: DataTypes.INTEGER,
        validate: { min: 0 },
    },
    total_price: {
        type: DataTypes.INTEGER,
        validate: { min: 0 },
    },
    status: {
        type: DataTypes.ENUM,
        values: ["not_pay", "pending", "delivering", "done", "cancel"],
    },
    payment_method: {
        type: DataTypes.ENUM,
        values: ["cash", "credit_card"],
    },
});

await Order.sync();

export default Order;
