const mongoose = require('mongoose');
const users = require("../models/users.js");
const url='mongodb://127.0.0.1:27017/ApiTesting';

beforeAll(async()=>{
    await mongoose.connect(url, {
        
    })
});
afterAll(async()=>{
    await mongoose.connection.close();
})


//admin register testing
describe(' User Registration testing ', ()=>{
  it('User Registration testing ', ()=>{
      const userTest={
          name: "raghav123",
          email:"raghav12@gmail.com",
          password:"raghav@1",
          cPassword:"raghav@1",
          userRole:"1",
          phoneNumber:"9823470164",
          userImage:"user.png",

      }
      return users.create(userTest).then((pro_ret)=>{
          expect(pro_ret.name).toEqual("raghav123")
      })
  })
})





//admin login testing
describe("test user sign up", () => {
    it("can sign up as new user", async () => {
      // we will write this function next
      
      password="aneemes@1",
      username= "animesh"
    })
  });

   // the code below is for delete testing
  //Comment This code before executing test
    it("to test the delete product is working or not", async () => {
    //   const status = await users.deleteMany();
    //   expect(status.ok).toBe(undefined);
    })