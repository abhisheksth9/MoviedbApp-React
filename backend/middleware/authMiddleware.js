import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  if (!token) return res.status(401).json({ message: "Not Authorized, login again" });

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    if (tokenDecode.id){
      req.body.user = tokenDecode.id
    } else {
      return res.json({success: false, message: 'Not Authorized, login again'})
    }
    next();

  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

export default authMiddleware;