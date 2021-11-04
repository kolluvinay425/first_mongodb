import createHttpError from "http-errors";
import author from "../schema/authors.js";
import atob from "atob";
const basicAuthMiddleware = async (req, res, next) => {
  console.log(req.headers);
  if (!req.headers.authorization) {
    next(createHttpError(401, "wrong credentials"));
  } else {
    const decodedCreds = atob(req.headers.authorization.split(" ")[1]);
    console.log(decodedCreds);
    const [email, password] = decodedCreds.split(":");
    console.log("Email", email);
    console.log("password", password);

    const user = await author.findByCredentials(email, password);
    if (user) {
      req.user = user;
      next();
    } else {
      next(createHttpError(401, "wrong creds"));
    }
  }
};
export default basicAuthMiddleware;
