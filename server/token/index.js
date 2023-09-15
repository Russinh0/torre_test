import jwt from 'jsonwebtoken'
import dotenv from "dotenv";
dotenv.config()

export const generateToken = (payload) => {
    const token = jwt.sign({ user: payload }, process.env.SECRET, { expiresIn: "1d" });
    return token;
  };
  
export const validateToken = (token) => jwt.verify(token, process.env.SECRET);