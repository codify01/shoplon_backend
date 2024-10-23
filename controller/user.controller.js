import { createUser, getUserById, editUser,getAllUsers, getUserByEmail,deleteUserById } from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { comparePassword } from '../utilities/passwordUtils.js';
dotenv.config()


const secret = process.env.SECRET || 'seun'



export const registerUser = async (req, res) => {
    const { firstname, lastname, email, phonenumber, DOB, gender, password } = req.body;

    try {
        const result = await createUser(firstname, lastname, email, phonenumber, DOB, gender, password);
        res.status(201).json({ message: 'User created successfully', userId: result.insertId });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
}

export const signInUser = async (req, res)=>{
    const { email, password } = req.body;
    try {
        const [result] = await getUserByEmail(email);
        if(result){
           const isMatch = await comparePassword(password, result.password)
            if (isMatch) {
                const token = jwt.sign(result, secret, {expiresIn: '1h'})
                res.status(200).json({ message: 'User logged in successfully', userId: result.id, token:token})
            }else {
                res.status(401).json({ message: 'Invalid password' });
            }
        } else {
            res.status(401).json({ message: 'User does not exist' })
        }

    } catch (err) {
        res.status(500).json({ message: 'Error logging in user', error: err.message})
    }
}

export const getUsers = async (req,res) => {
    try {
        const result = await getAllUsers()
        res.status(200).json(result)
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching users', error:err.message });
        
    }
}

export const getUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await getUserById(id);
        if (user.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error: error.message });
    }
}

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    try {
        const result = await editUser(id, updatedData);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found or no changes were made' })
        }else {
            res.status(200).json({ message: 'User updated successfully' })
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error: error.message })
    }
}


export const deleteUser = async (req,res)=>{
    const {id} = req.params

    try {
        const result = await deleteUserById(id)
        if (result.affectedRows != 0) {
            res.status(200).json({ message: 'User deleted successfully', userId: id })
        }else{
            res.status(404).json({ message: 'User not found' })
        }

    }catch (err) {
        res.status(500).json({ message: 'Error deleting user' })
    }
}