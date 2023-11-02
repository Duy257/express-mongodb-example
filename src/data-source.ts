import mongoose from "mongoose";

class DataSource {
  constructor() {}
  async connect() {
    console.log("start connect");

    const DB_URL =
      "mongodb+srv://aohota:257946@servertest.gtiolhl.mongodb.net/learn-db";
    try {
      await mongoose.connect(DB_URL);
      console.log("connected success");
    } catch (error) {
      console.log("connect false", error);
    }
  }
}

export default new DataSource();
