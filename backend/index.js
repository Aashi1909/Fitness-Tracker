const express = require('express')
const app = express();

const bodyParser = require('body-parser');
const cors = require('cors');
const PORT =  8000;
const cookieParser = require('cookie-parser');

require('dotenv').config();
require('./db')

app.use(bodyParser.json());

const allowedOrigins= ['http://localhost:3000']

app.use(
    cors({
        origin:function(origin, calback){
            if(!origin || allowedOrigins.includes(origin)){
                cancelIdleCallback(null, true);
            }else{
                cancelIdleCallback(new Error ('Not allowed by CORS'))
            }
        },
        credentials:true
    })
);
app.use(cookieParser());

app.get('/', (req, res)=> {
res.json({message: 'The API is working'})
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})