import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  try {
    const inputAccessToken =
      req.cookies.accessToken || req.headers.authorization?.split(" ")[1];

    if (!inputAccessToken) {
      return res.status(401).json("accessToken not received");
    }

    jwt.verify(inputAccessToken, process.env.API_ACCESS_KEY, (err, user) => {
      // here user is the payload from inputAccessToken
      if (err) {
        return res
          .status(401)
          .json({ status: "accessToken expired or wrong", err: err.message });
      }

      req.user = user; // after auth, we can access this user from payload via req.user
      // console.log("jwt.verify ->", user);
      next();
    });

    // console.log(inputAccessToken);
  } catch (error) {
    res
      .status(401)
      .json({ status: "accessToken expired or wrong", message: error.message });
  }
};
