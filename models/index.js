import sequelize from "../db.js";

import Coupon from "./Coupon.js";
import CreditCard from "./CreditCard.js";
import Delivery from "./Delivery.js";
import Giveaway from "./Giveaway.js";
import Image from "./Image.js";
import Order from "./Order.js";
import Product from "./Product.js";
import User from "./User.js";
import Variant from "./Variant.js";

// 1 to 1
User.hasOne(CreditCard, { foreignKey: "user_id" });
CreditCard.belongsTo(User, { foreignKey: "user_id" });

Delivery.hasOne(Order, { foreignKey: "delivery_id" });
Order.belongsTo(Delivery, { foreignKey: "delivery_id" });

// 1 to many
User.hasMany(Product, { foreignKey: "seller_id" });
Product.belongsTo(User, { foreignKey: "seller_id" });

User.hasMany(Giveaway, { foreignKey: "seller_id" });
Giveaway.belongsTo(User, { foreignKey: "seller_id" });

User.hasMany(Order, { foreignKey: "user_id" });
Order.belongsTo(User, { foreignKey: "user_id" });

User.hasMany(Coupon, { foreignKey: "user_id" });
Coupon.belongsTo(User, { foreignKey: "user_id" });

Product.hasMany(Image, { foreignKey: "product_id" });
Image.belongsTo(Product, { foreignKey: "product_id" });

Product.hasMany(Giveaway, { foreignKey: "product_id" });
Giveaway.belongsTo(Product, { foreignKey: "product_id" });

Product.hasMany(Variant, { foreignKey: "product_id" });
Variant.belongsTo(Product, { foreignKey: "product_id" });

Coupon.hasMany(Order, { foreignKey: "coupon_id" });
Order.belongsTo(Coupon, { foreignKey: "coupon_id" });

// many to many
const VariantOrder = sequelize.define(
    "variant_order",
    {},
    { timestamps: false, freezeTableName: true }
);
Order.belongsToMany(Variant, { through: VariantOrder, foreignKey: "order_id" });
Variant.belongsToMany(Order, {
    through: VariantOrder,
    foreignKey: "variant_id",
});

await Coupon.sync({ alter: true });
await CreditCard.sync({ alter: true });
await Delivery.sync({ alter: true });
await Giveaway.sync({ alter: true });
await Image.sync({ alter: true });
await Order.sync({ alter: true });
await Product.sync({ alter: true });
await User.sync({ alter: true });
await Variant.sync({ alter: true });

await VariantOrder.sync({ alter: true });

export {
    Coupon,
    CreditCard,
    Delivery,
    Giveaway,
    Image,
    Order,
    Product,
    User,
    Variant,
};
