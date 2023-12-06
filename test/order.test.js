// use the path of your model

const mongoose = require("mongoose");
const orders = require("../models/orders.js");
// use the new name of the database
const url = "mongodb://localhost:27017/ApiTesting";
beforeAll(async () => {
  await mongoose.connect(url, {
    useNewUrlParser: true,
  });
});
afterAll(async () => {
  await mongoose.connection.close();
});
describe("booking Schema test anything", () => {
  // the code below is for insert testing
  it("Add booking testing anything", () => {
    const bookings = {
    
       amount:"1500",
       transactionId:"123456",
       address:"Kathmandu",
       phone:"123456789",
       status:"Processing",


      




      user: "6298cb34fdc6081069afd4bd", // Add _id from user table
      paidAt: "2022-06-03",
    };

    return orders.create(bookings).then((pro_ret) => {
      
    });
  });

  //   it("to test the update", async () => {
  //     return Order.findByIdAndUpdate(
  //       { _id: Object("620a59f45d749d691915eaa8") },
  //       { $set: { name: "ram" } }
  //     ).then((pp) => {
  //       expect(pp.name).toEqual("ram");
  //     });
  //   });

  // the code below is for delete testing
  // Comment This code before executing test
  //   it("to test the delete product is working or not", async () => {
  //     const status = await Product.deleteMany();
  //     expect(status.ok).toBe(undefined);
  //   });

  it("to get Bookings", async () => {
    const status = orders.find();
    expect(status.ok).toBe(undefined);
  });
});