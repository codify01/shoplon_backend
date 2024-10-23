import express from 'express';
import { registerUser, getUser, updateUser, getUsers, signInUser, deleteUser } from '../controller/user.controller.js';
import { verifyToken } from '../utilities/authentication.js';

const router = express.Router()

// post request
router.post('/register', registerUser)
router.post('/login', signInUser)


// get request
router.get('/', verifyToken, getUsers)
router.get('/:id', verifyToken, getUser)


// put request
router.put('/:id', verifyToken, updateUser)


// delete request
router.delete('/:id', verifyToken, deleteUser)

export default router;
