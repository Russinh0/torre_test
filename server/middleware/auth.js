import {validateToken} from '../token/index.js'

export const validateAuth=(req, res, next)=> {
    try{
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.sendStatus(401);
    
      const { user } = validateToken(token);
      if (!user) return res.sendStatus(401);
    
      req.user = user;
    
      next();
    }
    catch(e){
        console.error("Fail trying to read token: ",e)
        return res.status(500).send("Fail trying to read token")
    }
}


