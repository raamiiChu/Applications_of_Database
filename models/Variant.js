import sequelize from "../db.js";

import { DataTypes } from "sequelize";

const Variant = sequelize.define("variant", {
    size: {
        type: DataTypes.STRING,
    },
    color: {
        type: DataTypes.STRING,
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

await Variant.sync();

export default Variant;
