import sequelize from "../db.js";

import { DataTypes } from "sequelize";

const Coupon = sequelize.define("coupon", {
    discount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    rate: {
        type: DataTypes.FLOAT,
        defaultValue: 1,
    },
    has_used: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    expiry_date: {
        type: DataTypes.DATE,
    },
});

await Coupon.sync();

export default Coupon;
