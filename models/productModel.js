import pool from '../db.js'


export const createProduct = async (product_name,description,price,quantity,category,SKU,images,weight,status,rating)=>{
   try {
    const [product] = await pool.query('INSERT INTO product_tb (product_name,description,price,quantity,category,SKU,images,weight,status,rating) VALUES (?,?,?,?,?,?,?,?,?,?)',[product_name,description,price,quantity,category,SKU,images,weight,status,rating])
    return product
   } catch (err) {
    console.error(err.message);
   }
}

export const allProducts = async ()=>{
    try {
        const [products] = await pool.query('SELECT * FROM product_tb')
        return products
    } catch (err) {
        console.error(err.message);
    }
}

export const getProductById = async (id)=>{
    try {
        const [product] = await pool.query('SELECT * FROM product_tb WHERE id = ?', [id])
        return product
    } catch (err) {
        console.error(err.message);
    }
}

export const getProductByCategory = async (category)=>{
    try {
        const [product] = await pool.query('SELECT * FROM product_tb WHERE category = ?', [category])
        return product
    } catch (err) {
        console.error(err.message);
        
    }
}


export const editProduct = async (id, updatedData)=>{
       try {
        const [result] = await pool.query('UPDATE product_tb SET ? WHERE id = ?', [updatedData, id])
        return result
       } catch (err) {
            console.error(err.message);
       }
}

export const deleteProductById = async (id)=>{
    try {
        const [result] = await pool.query('DELETE FROM product_tb WHERE id = ?', [id])
        return result
    } catch (err) {
        console.error(err.message);
    }
}