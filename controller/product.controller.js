        
import { createProduct, getProductById, allProducts, editProduct, deleteProductById } from "../models/productModel.js"



export const addProduct = async (req,res)=>{
    const {product_name,description,price,quantity,category,SKU,images,weight,status,rating} = req.body
    try {
        const product = await createProduct(product_name,description,price,quantity,category,SKU,images,weight,status,rating)
        if (product.affectedRows !== 0) {
            res.status(201).json({message:'product added successfully', productId:product.insertId})            
        }
    } catch (err) {
        console.error(err);
        
    }
}

export const getAllProducts = async (req,res)=>{
    try {
        const products = await allProducts()
        if (products) {
            res.status(201).json({message: 'products fetched succesfully', data:products})
        }
    } catch (err) {
        console.error(err.message)
    }
}

export const getEachProduct = async (req,res)=>{
    const {id} = req.params
    try {
        const product = await getProductById(id)
        if (product.affectedRows === 0) {
            res.status(404).json({message:'product not found', data:product})
            console.log(product);
        } else {
            res.status(201).json({message:'product fetched successfully', data:product})
            console.log(product);x``
        }
    } catch (err) {
        console.error(err.message);
    }
}

export const updateProduct = async (req,res)=>{
    const {id} = req.params
    const updatedData = req.body
    try {
        const product = await editProduct(id,updatedData)
        if (product.affectedRows === 0){
            res.status(404).json({message:'product not found'})
        }else{
            res.status(201).json({message:'product updated succefully'})
        }
        console.log(product);
    } catch(err) {
        console.error(err.message);
    }
}

export const deleteProduct = async (req,res)=>{
    const {id} = req.params
    try {
        const result = await deleteProductById(id)
        if (result.affectedRows === 0) {
            res.status(404).json({message:'not product found'})
        } else{
            res.status(201).json({message:'product deleted succesfully'})
        }        
    } catch (err){
        console.error(err.message);
        res.status(500).json({message:'error occured while trying to delete products', error:err.message});
}}