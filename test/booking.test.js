// use the path of your model

const mongoose = require("mongoose");
const Bookings = require("../models/Booking");
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
describe("Order Schema test anything", () => {
  // the code below is for insert testing
  it("Add Order testing anything", () => {
    const bookings = {
        checkInDate: 
            "2012-02-01"
        ,
        checkOutDate: 
            "2012-02-29"
        ,
        totalPrice: 
            "2145"
        ,
        daysOfStay: 
            "30"
        ,
        Numberofadult: 
            "4"
        ,
        Numberofchildren: 
            "1"
        ,
        Numberofrooms: 
            "2"
        ,
    
        

      




      user: "6298cb34fdc6081069afd4bd", // Add _id from user table
      paidAt: "2022-06-03",
    };

    return Bookings.create(bookings).then((pro_ret) => {
      
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
    const status = Bookings.find();
    expect(status.ok).toBe(undefined);
  });
});