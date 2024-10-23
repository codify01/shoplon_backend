import pool from "../db.js";
import { hashPassword } from "../utilities/passwordUtils.js";


export const createUser = async (firstname, lastname, email, phonenumber, DOB, gender, password) => {
    try {
        const hashedPassword = await hashPassword(password)
        const [result] = await pool.query(
            `INSERT INTO user_tb (firstname, lastname, email, phonenumber, DOB, gender, password) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [firstname, lastname, email, phonenumber, DOB, gender, hashedPassword]
        );
        return result;
    } catch (err) {
        console.error('Error creating user:', err.message);
        throw err;
    }
}

export const getAllUsers = async ()=>{
    try {
        const [users] = await pool.query(`SELECT * FROM user_tb`)
        return users
    } catch (err){
        console.error(err)
        throw err
    }
}

export const getUserById = async (id) => {
    try {
        const [user] = await pool.query(`SELECT * FROM user_tb WHERE id = ?`, [id]);
        return user;
    } catch (err) {
        console.error('Error fetching user:', err.message);
        throw err;
    }
};

export const getUserByEmail = async (email)=>{
    try {
        const [user] = await pool.query(`SELECT * FROM user_tb WHERE email = ?`,[email])
        return user
    } catch (err) {
        console.error('Error fetching user:', err.message);
        throw err;
    }
}

export const editUser = async (id, updatedData) => {
    try {
        const [result] = await pool.query(`UPDATE user_tb SET ? WHERE id = ?`, [updatedData, id]);
        return result;
    } catch (err) {
        console.error('Error updating user:', err.message);
        throw err;
    }
};


export const deleteUserById = async (id)=>{
    try {
        const [result] = await pool.query(`DELETE FROM user_tb WHERE id = ?`,[id])
        return result
    } catch (err){
        console.error('Error deleting user:', err.message);
        throw err;
    }
}