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


//user admin register testing
describe(' User Registration testing ', ()=>{
  it('User Registration testing ', ()=>{
      const userTest={
        name: "raghav",
        email:"raghav1415@gmail.com",
        password:"raghav@1",
        cPassword:"raghav@1",
        userRole:"0",
        phoneNumber:"9823470164",
        userImage:"user.png",

      }
      return users.create(userTest).then((pro_ret)=>{
          expect(pro_ret.name).toEqual("raghav")
      })
  })
})





//user login testing
describe("test user sign up", () => {
    it("can sign up as new user", async () => {
      // we will write this function next
      
      password="raghav@1",
      username= "animesh"
    })
  });

     // the code below is for delete testing
  //Comment This code before executing test
  it("to test the delete product is working or not", async () => {
    //   const status = await users.deleteMany();
    //   expect(status.ok).toBe(undefined);
    })







    // testing fot updating 
it("to test the update", async () => {
  return users.findByIdAndUpdate(
    // { _id: Object("62c8f72fb964e93d4c204494   ") }, // Add _id from product id
    // { $set: { name: "raghav143567" } }
  )
});

//   test("Delete One Todo", async () => {
//     const todo = await Task.findByIdAndDelete();
//     if (!todo) {
//      return;
//     }
//     const response = await request(app).delete(`/todo/delete/${todo.id}`);
//     expect(response.status).toBe(200);
//     expect(typeof response.body).toBe("object");
//     expect(response.body.message).toBe("Todo successfully deleted");
//    });

// test("Should delete task belonging to user", async () => {
//     await request(app)
//      .delete(`/tasks/${taskOne._id}`)
//      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
//      .send()
//      .expect(200);
 
//     const task = await Task.findById(taskOne._id);
//     expect(task).toBeNull();
//    });

// it("should not respond to DELETE requests", (done) => {
//     swagger(spec.files.petStore, (err, middleware) => {
//      let express = helper.express(middleware.files());

//      helper.supertest(express)
//       .delete("/api-docs")
//       .expect(404)
//       .end(done);
//     });
//    });

it("Delete User", async() => {
  return users.findByIdAndDelete(
      { _id: Object("62c8f8b5f7a0e86810a5b245") }, // Add _id from product id

  )
})