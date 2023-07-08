import User from "../models/UserModel.js";
import argon2 from "argon2";
export const getUsers = async (req, res) => {
    try {
        const response = await User.findAll({
            attributes: ['uuid', 'name', 'email', 'post', 'phone', 'password'],
        }
        );
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
export const getUserById = async (req, res) => {
    try {
        const response = await User.findOne(
            {
                attributes: ['uuid', 'name', 'email', 'post', 'phone', 'password'],
                where: { uuid: req.params.id }
            }
        );
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
export const createUser = async (req, res) => {
    const { name, email, post, phone, password, confPassword } = req.body;
    if (password !== confPassword) return res.status(400).json(
        { msg: "Password and Confirm Password do not match" });
    const hashPassword = await argon2.hash(password);
    try {
        await User.create({name: name,email: email,post: post,
            phone: phone,
            password: hashPassword
        });
        res.status(201).json({ msg: "Registration Successful" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}
export const updateUser = async (req, res) => {
    const user = await User.findOne(
        {where: { uuid: req.params.id }});
    if (!user) return res.status(404).json({ msg: "User is not exist" })
    const { name, email, post, phone, password, confPassword } = req.body;
    let hashPassword;
    if (password === "" || password === null) {hashPassword = user.password}
    else {hashPassword = await argon2.hash(password);}
    if (password !== confPassword) return res.status(400).json({ msg: "Pasword was not confirmed" })
    try { await User.update({name: name,email: email,post: post,phone: phone,password: hashPassword}, 
        {where: { id: user.id}});
        res.status(200).json({ msg: "User updated" });
    } catch (error) { res.status(400).json({ msg: error.message });}
}

export const deleteUser = async (req, res) => {
    const user = await User.findOne(
        { where: { uuid: req.params.id } });
    if (!user) return res.status(404).json({ msg: "User is not exist" })
    try {
        await User.destroy({ where: { id: user.id } });
        res.status(200).json({ msg: "User deleted" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}


