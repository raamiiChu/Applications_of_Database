import sequelize from "../db.js";

import { DataTypes } from "sequelize";

const Delivery = sequelize.define("delivery", {
    name: {
        type: DataTypes.STRING,
    },
    transport_time: {
        type: DataTypes.DATE,
    },
});

await Delivery.sync();

export default Delivery;
