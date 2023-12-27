import sequelize from "../db.js";

import { DataTypes } from "sequelize";

const CreditCard = sequelize.define("credit_card", {
    number: {
        type: DataTypes.STRING,
    },
    expiry_date: {
        type: DataTypes.STRING,
    },
    type: {
        type: DataTypes.STRING,
    },
});

await CreditCard.sync();

export default CreditCard;
