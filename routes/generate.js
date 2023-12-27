import { Router } from "express";
import axios from "axios";

import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

import _ from "lodash";
import { format } from "date-fns";

import {
    Coupon,
    CreditCard,
    Delivery,
    Giveaway,
    Image,
    Order,
    Product,
    User,
    Variant,
} from "../models/index.js";
import data from "../data/index.js";

const saltRounds = 10;

// user
const numOfUsers = 1000;

// product
const numOfProducts = 2000;
const maximumNumOfImages = 5;
const maximumNumOfVariants = 5;
const rateOfGiveaway = 0.4;
const maximumStock = 250;
const maximumPrice = 25000;

// order
const numOfOrders = 5000;
const maximumVariantInOrder = 5;
const minimumFee = 5;
const maximumFee = 150;
const rateOfUsingCoupon = 0.4;
const minimumDiscount = 10;
const maximumDiscount = 100;

const {
    cardTypes,
    categories,
    regions,
    descriptions,
    sizes,
    colors,
    statusTypes,
    paymentMethodTypes,
    deliveryNames,
} = data;

const route = Router();

function getRandomTime(start, end) {
    const startTime = start.getTime(); // 取得開始時間的毫秒數
    const endTime = end.getTime(); // 取得結束時間的毫秒數

    // 產生介於兩個時間之間的隨機毫秒數
    const randomTime = startTime + Math.random() * (endTime - startTime);

    const resultTime = new Date(randomTime); // 將隨機毫秒數轉換成日期物件

    return resultTime;
}

function generateFakeCreditCardNumber() {
    const getRandomNumber = (min, max) =>
        Math.floor(Math.random() * (max - min + 1)) + min;

    const generateNumberArray = (length) => {
        const arr = [];
        for (let i = 0; i < length; i++) {
            arr.push(getRandomNumber(0, 9));
        }
        return arr;
    };

    const cardNumberArray = generateNumberArray(16); // 產生一組16位數字的陣列

    // Luhn 演算法，用於生成驗證數字
    let sum = 0;
    for (let i = cardNumberArray.length - 1; i >= 0; i--) {
        let cardNum = cardNumberArray[i];
        if ((cardNumberArray.length - i) % 2 === 0) {
            cardNum *= 2;
            if (cardNum > 9) {
                cardNum -= 9;
            }
        }
        sum += cardNum;
    }

    // const checkDigit = (sum * 9) % 10;

    // cardNumberArray.push(checkDigit); // 將驗證數字加入陣列中

    return cardNumberArray.join(""); // 將陣列轉換為字串作為信用卡號返回
}

route.post("/users", async (req, res) => {
    const startTime = new Date("2024-06-30"); // 設定開始時間
    const endTime = new Date("2028-12-31"); // 設定結束時間

    try {
        // get random user data from "random user" api
        const { data } = await axios.get(
            `https://randomuser.me/api/?results=${numOfUsers}`
        );
        const users = data.results;

        for (const user of users) {
            const { gender, name, location, email, login, phone } = user;

            const { first, last } = name;
            const { password } = login;
            const { street, city, state, country, postcode } = location;

            // hash a password
            bcrypt.genSalt(saltRounds, async (err, salt) => {
                if (err) {
                    return res.status(500).send(err);
                }

                bcrypt.hash(password, salt, async (err, hash) => {
                    if (err) {
                        return res.status(500).send(err);
                    }

                    // create a new user
                    const newUser = await User.create({
                        name: `${first} ${last}`,
                        email,
                        password: hash,
                        gender,
                        phone,
                        address: `No. ${street.number}, ${street.name}., ${city} ${postcode}, ${state}, ${country}`,
                    });

                    const randomTime = getRandomTime(startTime, endTime);
                    // create a new credit card for new user
                    const newCard = await CreditCard.create({
                        number: generateFakeCreditCardNumber(),
                        expiry_date: format(randomTime, "yyyy-MM-dd"), // 格式化時間
                        type: cardTypes[_.random(0, cardTypes.length - 1)],
                    });

                    // association
                    await newCard.setUser(newUser);
                });
            });
        }

        return res.status(201).send("Create New Users Successfully");
    } catch (error) {
        return res.status(500).send("Database Error");
    }
});

route.post("/products", async (req, res) => {
    try {
        for (let i = 0; i < numOfProducts; i++) {
            // find a random user
            let foundUser = await User.findOne({
                where: { id: _.random(1, numOfUsers) },
            });

            // create a new product
            const newProduct = await Product.create({
                name: `product ${i + 1}`,
                category: categories[_.random(0, categories.length - 1)],
                place: regions[_.random(0, regions.length - 1)],
                description: descriptions[_.random(0, descriptions.length - 1)],
                main_image: `https://picsum.photos/seed/${uuidv4()}/200/300`,
            });

            // association
            await newProduct.setUser(foundUser);

            // add 1 ~ 5 variants for new product
            for (let i = 0; i < _.random(1, maximumNumOfVariants); i++) {
                const newVariant = await Variant.create({
                    size: sizes[_.random(0, sizes.length - 1)],
                    color: colors[_.random(0, colors.length - 1)],
                    stock: _.random(0, maximumStock),
                    price: _.random(0, maximumPrice),
                });

                // association
                await newVariant.setProduct(newProduct);
            }

            // add 0 ~ 5 images for new product
            for (let i = 0; i < _.random(0, maximumNumOfImages); i++) {
                const newImage = await Image.create({
                    url: `https://picsum.photos/seed/${uuidv4()}/200/300`,
                });

                // association
                await newImage.setProduct(newProduct);
            }

            // add giveaway randomly
            if (_.random(0, 1, true) <= rateOfGiveaway) {
                const newGiveaway = await Giveaway.create({
                    main_image: `https://picsum.photos/seed/${uuidv4()}/200/300`,
                });

                // 15% find a new seller for giveaway
                if (_.random(0, 1, true) <= 0.15) {
                    foundUser = await User.findOne({
                        where: { id: _.random(1, numOfUsers) },
                    });
                }

                // association
                await newGiveaway.setProduct(newProduct);
                await newGiveaway.setUser(foundUser);
            }
        }

        return res.status(201).send("Create New Products Successfully");
    } catch (error) {
        console.log(error);
        return res.status(500).send("Database Error");
    }
});

route.post("/orders", async (req, res) => {
    try {
        for (let i = 0; i < numOfOrders; i++) {
            const useCoupon = _.random(0, 1, true) <= rateOfUsingCoupon;

            // get last index of variant
            const { id: numOfVariants } = await Variant.findOne({
                order: [["id", "DESC"]],
            });

            // find a random user
            let foundUser = await User.findOne({
                where: { id: _.random(1, numOfUsers) },
            });

            const fee = _.random(minimumFee, maximumFee);
            let variants = [];
            let price = 0; // calculate price ( without fee )
            const status = statusTypes[_.random(0, statusTypes.length - 1)];
            const paymentMethod =
                paymentMethodTypes[_.random(0, paymentMethodTypes.length - 1)];

            // add 1 ~ 5 variants for new order
            for (let i = 0; i < _.random(1, maximumVariantInOrder); i++) {
                // find a random variant

                const foundVariant = await Variant.findOne({
                    where: { id: _.random(1, numOfVariants) },
                });

                price += foundVariant.price;
                variants.push(foundVariant);
            }

            // create a new coupon
            const startTime = new Date("2024-01-01"); // 設定開始時間
            const endTime = new Date("2024-12-31"); // 設定結束時間
            const randomTime = getRandomTime(startTime, endTime);

            // one coupon only can have discount or rate
            let discount = 0;
            let rate = 1;
            if (_.random(0, 1, true) >= 0.5) {
                discount = _.random(minimumDiscount, maximumDiscount);
            } else {
                rate = _.random(2, 19) / 20;
            }

            const newCoupon = await Coupon.create({
                discount,
                rate,
                expiry_date: format(randomTime, "yyyy-MM-dd"),
            });
            await newCoupon.setUser(foundUser);

            // randomly use coupon for order
            if (useCoupon) {
                price = Math.max(price - discount, 0);
                price = Math.max(_.toInteger(price * rate), 0);

                await Coupon.update(
                    { has_used: true },
                    { where: { id: newCoupon.id } }
                );
            }

            // create a new order
            const newOrder = await Order.create({
                price,
                fee,
                total_price: price + fee,
                status,
                payment_method: paymentMethod,
            });

            // create a new delivery
            if (status !== "cancel") {
                const startTime = new Date("2023-01-01"); // 設定開始時間
                const endTime = new Date("2023-12-31"); // 設定結束時間

                const randomTime = getRandomTime(startTime, endTime);
                const newDelivery = await Delivery.create({
                    name: deliveryNames[_.random(0, deliveryNames.length - 1)],
                    transport_time: format(randomTime, "yyyy-MM-dd hh:mm:ss"), // 格式化時間
                });

                await newOrder.setDelivery(newDelivery);
            }

            // association
            await newOrder.setUser(foundUser);

            if (useCoupon) {
                await newOrder.setCoupon(newCoupon);
            }

            for (const variant of variants) {
                await variant.addOrder(newOrder);
            }
        }

        return res.status(200).send("Create New Orders Successfully");
    } catch (error) {
        console.log(error);
        return res.status(500).send("Database Error");
    }
});

export default route;
