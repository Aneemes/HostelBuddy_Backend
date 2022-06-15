const mongoose = require('mongoose');
const User = require("../models/User.js");
const url='mongodb://127.0.0.1:27017/ApiTesting';

beforeAll(async()=>{
    await mongoose.connect(url, {
        
    })
});
afterAll(async()=>{
    await mongoose.connection.close();
})

//login testing
describe("test user sign up", () => {
    it("can sign up as new user", async () => {
      // we will write this function next
      
      password="aneemes@1",
      username= "animesh"
    })
  });