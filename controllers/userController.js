import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export function saveUser(req, res) {
    if (req.body.role == "admin") {
        if (req.user == null) {
            res.status(401).json({
                message: "Please login as admin to create a admin account"
            })
            return
        }

        if (req.user.role != "admin") {
            res.status(403).json({
                message: "You are not authorized to create a user"
            })
            return
        }
    }

    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    // console.log(hashedPassword);

    const user = new User({
        email : req.body.email,
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        role : req.body.role,
        password : hashedPassword,
        phone : req.body.phone 
    });

    user.save().then(()=>{
        res.status(201).json({
            message: "User saved Successfully"
        })
    }).catch(()=>{
        res.status(500).json({
            message: "User saved Failed"
        })
    })
}

export function userLogin(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({
        email : email
    }).then((user)=>{
        if (user == null) {
            res.status(404).json({
                message: "Invalid Email"
            })
        } else {
            const isPasswordCorrect = bcrypt.compareSync(password, user.password);
            if (isPasswordCorrect) {
                const userData = {
                    email : user.email,
                    firstName : user.firstName,
                    lastName : user.lastName,
                    role : user.role,
                    phone : user.phone,
                    isDisabled : user.is_disabled,
                    isEmailVerified : user.is_email_verified
                }

                const token = jwt.sign(userData, process.env.JWT_KEY/*, {expiresIn : "1h"}*/);

                res.status(200).json({
                    message: "Login Successfull",
                    token: token
                })       
            } else {
                res.status(403).json({
                    message: "Invalid Password"
                })
            }
        }   
    })
}