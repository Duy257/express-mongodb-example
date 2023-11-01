import { User } from "../model/user";
import Base64 from "../plugin/base64";
import { Token } from "../plugin/token";

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
        const decodePassword = Base64.decode(password);
        const user = {
          email,
          username,
          password: decodePassword,
        };
        await User.create(user);
        return res.status(200).json({ success: true });
      }
    } catch (error) {
      return res.status(error.code).send({
        error: error.message,
      });
    }
  };

  async login(req, res) {
    let { email, password } = req.body;
    if (!email || !password)
      return res.status(500).send({
        error: "Thiếu thông tin",
      });
    let user = await User.findOne({
      email: email,
    });
    if (!user) {
      return res.status(500).json({
        message: "Tài khoản hoặc mật khẩu sai",
      });
    } else {
      const decodePassword = Base64.decode(password);
      if (decodePassword === user.password) {
        let payload = {
          username: user.username,
          idUser: user._id,
        };
        const generateToken = Token.sign({ payload });
        return res.status(200).json({
          ...generateToken,
          idUser: user._id,
        });
      } else {
        return res.status(401).json({
          message: "Tài khoản hoặc mật khẩu sai",
        });
      }
    }
  }
  async loginWithToken(req, res) {
    try {
      let { refreshToken } = req.body;
      if (!refreshToken)
        return res.status(500).send({
          error: "Thiếu thông tin",
        });
      const token = Token.refresh({ refreshToken });
      return res.status(200).json(token);
    } catch (error) {
      throw error;
    }
  }
}
export default new AuthController();
