import Order from "../models/order.js";
import Product from "../models/product.js";

export async function createOrder(req, res) {
    if (req.user == null) {
        res.status(401).json({
            message: "You are not logged in"
        })
        return
    }

    const body = req.body;
    const orderData = {
        orderID : "",
        email : req.user.email,
        name : body.name,
        address : body.address,
        phoneNumber : body.phoneNumber,
        billItems : [],
        total : 0
    };

    Order.find()
        .sort({
            orderID : -1
        })
        .limit(1)
        .then(async (lastBills) => {
            if (lastBills.length == 0) {
                orderData.orderID = "ORD0001";
            } else {
                const lastBill = lastBills[0];
                const lastBillID = lastBill.orderID; // ORD0061
                const lastOrderNumber = lastBillID.replace("ORD", ""); // 0061
                const lastOrderNumberInt = parseInt(lastOrderNumber); // 61
                const newOrderNumber = lastOrderNumberInt + 1; // 62
                const newOrderNumberString = newOrderNumber.toString().padStart(4, "0"); // 0062
                orderData.orderID = "ORD" + newOrderNumberString; // ORD0062
            }

            for (let i = 0; i < body.billItems.length; i++) {
                const product = await Product.findOne({
                    productId : body.billItems[i].productId
                });
                
                if (product == null) {
                    res.status(404).json({
                        message: "Product with Product ID " + body.billItems[i].productId + " not found"
                    })
                    return
                }

                // console.log(product);
                
                orderData.billItems[i] = {
                    productId : product.productId,
                    productName : product.productName,
                    price : product.price,
                    image : product.image,
                    quantity : body.billItems[i].quantity
                }

                orderData.total = orderData.total + (product.price * body.billItems[i].quantity);

            }


            const order = new Order(orderData);
            order.save().then(() => {
                res.status(201).json({
                    message: "Order created successfully"
                })
            }).catch((err) => {
                console.log(err);
                res.status(500).json({
                    message: "Order not created"
                })
            })
        });
}

export function getOrders(req, res) {
    if (req.user == null) {
        res.status(401).json({
            message: "Unauthorized. You are not logged in"
        })
        return
    }

    if (req.user.role == "admin") {
        Order.find().then((orders) => {
            res.status(200).json({
                message: "Orders fetched successfully",
                orders: orders
            })
        }).catch((err) => {
            console.log(err);
            res.status(500).json({
                message: "Orders fetched failed"
            })
        })
        return
    } else {
        Order.find({
            email : req.user.email
        }).then((orders) => {
            res.status(200).json({
                message: "Orders fetched successfully",
                orders: orders
            })
        }).catch((err) => {
            console.log(err);
            res.status(500).json({
                message: "Orders fetched failed"
            })
        })
    }

}