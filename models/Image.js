import sequelize from "../db.js";

import { DataTypes } from "sequelize";

const Image = sequelize.define("image", {
    url: {
        type: DataTypes.STRING,
    },
});

await Image.sync();

export default Image;
