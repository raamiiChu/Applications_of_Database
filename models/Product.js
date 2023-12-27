import sequelize from "../db.js";

import { DataTypes } from "sequelize";

const Product = sequelize.define("product", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.TEXT,
    },
    place: {
        type: DataTypes.STRING,
    },
    main_image: {
        type: DataTypes.STRING,
    },
});

await Product.sync();

export default Product;
