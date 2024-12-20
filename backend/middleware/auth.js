import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  const {token} = req?.headers;
  // ?.authorization?.split(" ")[1]

  if (!token) {
    return res.status(401).json({
      message: "Provide Token",
      error: true,
      success: false,
    });
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    if (!decode) {
      return res.status(401).json({
        message: "Unauthorized access",
        error: true,
        success: false,
      });
    }

    req.body.userId = decode.id;
    next();

    //  console.log("decode",decode)
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export default auth;
