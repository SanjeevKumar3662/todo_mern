import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  try {
    const inputAccessToken = req.headers.authorization?.split(" ")[1];

    if (!inputAccessToken) {
      return res.status(401).json("accessToken not received");
    }

    jwt.verify(inputAccessToken, process.env.API_ACCESS_KEY, (err, user) => {
      //here user is the payload from inputAccessToken

      if (err) {
        throw new err();
      }

      req.user = user; // after auth, we can access this user form playload throw req.user
    });

    // console.log(inputAccessToken);
    next();
  } catch (error) {
    res.status(401).json("accessToken expired or wrong");
  }
};
