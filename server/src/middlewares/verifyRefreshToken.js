const jwt = require("jsonwebtoken");

const { formatResponse } = require("../utils/formatResponse");

const { REFRESH_TOKEN } = process.env;

const verifyRefreshToken = (req, res, next) => {
  try {
    console.log("req.cookie", req.cookies);
    const { refreshTokenWhales } = req.cookies; // * по ключу достаём токен из куки
    console.log(" REFRESH_TOKEN:", REFRESH_TOKEN);
    const { user } = jwt.verify(refreshTokenWhales, REFRESH_TOKEN);
    console.log(" refreshTokenWhales:", refreshTokenWhales);
    console.log("refreshTokenWhales user:", user);
    // * обновление пользователя через res.locals
    res.locals.user = user;
    next();
  } catch (error) {
    console.log("Invalid refresh token", error);
    res
      .status(401)
      .clearCookie("refreshTokenWhales")
      .json(
        formatResponse({
          statusCode: 401,
          message: "Неверный рефреш токен",
          error: error.message,
        })
      );
  }
};

module.exports = verifyRefreshToken;
