import Product from "../models/product.js";

export async function createProduct(req, res) {
    if (req.user == null) {
        res.status(401).json({
            message: "You are not logged in"
        })
        return
    }

    if (req.user.role != "admin") {
        res.status(403).json({
            message: "You are not authorized to create a product"
        })
        return
    }

    const product = new Product(req.body);

    // product.save().then(() => {
    //     res.status(201).json({
    //         message: "Product created successfully"
    //     })
    // }).catch((err) => {
    //     // console.log(err);
    //     res.status(500).json({
    //         message: "Product not created"
    //     })
    // })

    try {
        await product.save();
        res.status(201).json({
            message: "Product created successfully"
        })
    } catch (err) {
        // console.log(err);
        res.status(500).json({
            message: "Product not created"
        })
    }
}

export function getProducts(req, res) {
    Product.find().then((products) => {
        res.status(200).json({
            message: "Products fetched successfully",
            products: products
        })
    }).catch((err) => {
        // console.log(err);
        res.status(500).json({
            message: "Products fetched failed"
        })
    })
}

export function deleteProduct(req, res) {
    if (req.user == null) {
        res.status(401).json({
            message: "You are not logged in"
        })
        return
    }

    if (req.user.role != "admin") {
        res.status(403).json({
            message: "You are not authorized to delete a product"
        })
        return
    }

    Product.findOneAndDelete({
        productId : req.params.productId
    }).then(
        ()=>{
            res.status(200).json({
                message: "Product deleted successfully"
            })
        }
    ).catch(
        ()=>{
            res.status(500).json({
                message: "Product not deleted"
            })
        }
    )
}

export function updateProduct(req, res) {
    if (req.user == null) {
        res.status(401).json({
            message: "You are not logged in"
        })
        return
    }

    if (req.user.role != "admin") {
        res.status(403).json({
            message: "You are not authorized to delete a product"
        })
        return
    }

    Product.findOneAndUpdate({
        productId : req.params.productId
    }, req.body).then(
        ()=>{
            res.status(200).json({
                message: "Product updated successfully"
            })
        }
    ).catch(
        ()=>{
            res.status(500).json({
                message: "Product not updated"
            })
        }
    )
}