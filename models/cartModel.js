import pool from '../db.js'

export const createCart = async (user_Id,product_id,quatity)=>{
    try {
        const [result] = await pool.query('INSERT INTO cart_tb (user_Id,product_id,quantity) VALUES (?,?,?)',[user_Id,product_id,quatity])
        return result
    } catch (error) {
        console.error(error.messsage)
    }
}


export const updateCart = async (user_Id,updatedData)=>{
    try {
        const [result] = await pool.query('UPDATE cart_tb SET ? WHERE user_Id = ?', [updatedData,user_Id])
        return result
    } catch (err){
        console.error(err.messsage)
        
    }
}

export const getCarts = async ()=>{
    try {
        const [result] = await pool.query('SELECT * FROM cart_tb')
        return result
    } catch (err) {
        console.error(err.messsage)
    }
}

export const getUserCart = async (user_Id)=>{
    try {
        const [result] = await pool.query('SELECT * FROM cart_tb WHERE user_Id = ?', [user_Id])
        return result
    } catch (err) {
        console.error(err.messsage)
    }
}

export const removeCart = async (id)=>{
    try {
        const [result] = await pool.query('DELETE FROM cart_tb WHERE id = ?', [id])
        return result
    } catch (err) {
        console.error(err.messsage);
        
    }
}

