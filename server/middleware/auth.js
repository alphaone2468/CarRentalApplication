const jwt=require('jsonwebtoken');
const JWT_SECRET="Car-Rental-123";

async function generateToken(data){
    try{
        const token = jwt.sign(data, JWT_SECRET, { expiresIn: '1h' });
        return token;
    }
    catch(e){
        console.log("Error in generating token");
    }
}

async function verifyToken(token){
    try{
        const data = jwt.verify(token, JWT_SECRET);
        return data;
    }
    catch(e){
        console.log("Error in verifying token");
        return null;
    }
}

module.exports={generateToken,verifyToken}