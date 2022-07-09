const mongoose = require('mongoose');

const customize = require("../models/customize.js");
const url='mongodb://127.0.0.1:27017/ApiTesting';

beforeAll(async()=>{
    await mongoose.connect(url, {
        
    })
});
afterAll(async()=>{
    await mongoose.connection.close();
})


describe("to check the silderImage", () => {
    it("can the admin change the silerImage", async () => {
      // we will write this function next
      
      sliderImage:"user.png"
      

    })
  });