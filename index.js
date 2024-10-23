import express from 'express';
import userRouter from './routes/user.route.js'
const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use('/api/users', userRouter)









app.listen(8000, ()=>{
    console.log('Server running');
})