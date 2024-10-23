import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'shoplon_DB',
    socketPath: '/opt/lampp/var/mysql/mysql.sock'
}).promise()

// conn.connect((error)=>{
//     if(error){
//         console.error(error.message, error.fatal, error.stack);
//         console.error('connection errror');
//         return
//     } else {
//         console.log('connected');
//     }
// })

const [result] = await pool.query("SELECT * FROM user_tb")

console.log(result);

// const createUser = async (firstname,lastname) => {
//     const result = await pool.query(`INSERT INTO user_tb (firstname,lastname) VALUES (?,?)`, [firstname,lastname])
//     return result
// }

// const result2 =await createUser('sola','bola')
// console.log(result2);


export default pool