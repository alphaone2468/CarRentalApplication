const jwt=require('jsonwebtoken');
const JWT_SECRET="Car-Rental-123";

function generateToken(data){
    try{
        console.log("Generating token for user:", data);
        const token = jwt.sign(data, JWT_SECRET, { expiresIn: '1h' }); 
        return token;

    }
    catch(e){
        console.log("Error in generating token");
    }
}

function verifyToken(req, res, next){
      try {
    console.log("Checking logged in status");
    console.log(req.cookies);
    
    const token = req.cookies.access_token;
    console.log("Token from cookies:", token);
    
    if (!token) {
      return res.json({ status: "FAILED", message: 'Not logged in' });
    }
    
    const user = jwt.verify(token, JWT_SECRET);
    console.log(user);
    
    if (!user) {
      return res.json({ status: "FAILED", message: 'Invalid token' });
    }
    
    req.user = user;
    next(); 
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "FAILED", message: 'Internal Server Error' });
  }
}

module.exports={generateToken,verifyToken}