import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
const app = express()
import userRoutes from './src/routes/UserRoutes.js'
import adminRoutes from './src/routes/AdminRoutes.js'
import commonRoutes from './src/routes/CommonRoutes.js'
import('./src/config/db.config.js')
dotenv.config();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.use('/api/user', userRoutes)
app.use('/api/common', commonRoutes)
app.use('/api/admin', adminRoutes)

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type",
        "application/form-data",
        "multipart/form-data"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

app.use('/api/public', express.static('public/uploads'))
app.use('/api/logo', express.static('public/logo'))

const port = process.env.PORT
app.listen(port, () => {
    console.log(`App is running on ${port}`);
})