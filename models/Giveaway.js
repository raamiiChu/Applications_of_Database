import sequelize from "../db.js";

import { DataTypes } from "sequelize";

const Giveaway = sequelize.define("giveaway", {
    main_image: {
        type: DataTypes.STRING,
    },
});

await Giveaway.sync();

export default Giveaway;
