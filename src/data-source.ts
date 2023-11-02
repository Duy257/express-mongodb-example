import mongoose from "mongoose";

class DataSource {
  constructor() {}
  async connect() {
    console.log("start connect");

    try {
      await mongoose.connect(process.env.DB_URL);
      console.log("connected success");
    } catch (error) {
      console.log("connect false", error);
    }
  }
}

export default new DataSource();
