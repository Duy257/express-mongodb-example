import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../model/user";
import { SECRET_KEY } from "../middleware/auth";

class AuthController {
  register = async (req, res) => {
    try {
      let { username, email, password } = req.body;
      if (!username || !email || !password)
        return res.status(500).send({
          error: "Thiếu thông tin",
        });
      const checkUsername = await User.findOne({
        email,
      });
      if (checkUsername) {
        return res.status(500).send({
          error: "Tài khoản đã tồn tại!",
        });
      } else {
        password = await bcrypt.hash(password, 9);
        const user = {
          email,
          username,
          password,
        };
        const newUser = await User.create(user);
        return res.status(200).json(newUser);
      }
    } catch (error) {
      throw Error(error.message);
    }
  };

  async login(req, res) {
    let userForm = req.body;
    let user = await User.findOne({
      username: userForm.username,
    });
    if (!user) {
      return res.status(401).json({
        message: "Tài khoản hoặc mật khẩu sai",
      });
    } else {
      let comparePassword = await bcrypt.compare(
        userForm.password,
        user.password
      );
      if (!comparePassword) {
        return res.status(401).json({
          message: "Tài khoản hoặc mật khẩu sai",
        });
      } else {
        let payload = {
          username: user.username,
          idUser: user._id,
        };
        let token = await jwt.sign(payload, SECRET_KEY, {
          expiresIn: 36000,
        });
        return res.status(200).json({
          token: token,
          idUser: user._id,
        });
      }
    }
  }
}
export default new AuthController();
