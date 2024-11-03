import express from "express";
import { addProduct, getEachProduct, getAllProducts, updateProduct, deleteProduct } from "../controller/product.controller.js";
const router = express.Router()





router.post('/add', addProduct)

router.get('/', getAllProducts)
router.get('/:id', getEachProduct)


router.put('/:id', updateProduct)

router.delete('/:id', deleteProduct)



export default router