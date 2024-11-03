import express from 'express';
import userRouter from './routes/user.route.js'
import productRouter from './routes/products.route.js'
const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use('/api/users', userRouter)
app.use('/api/products', productRouter)









app.listen(7000, ()=>{
    console.log('Server running');
})