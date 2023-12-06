const mongoose = require('mongoose');
const locations = require("../models/locations.js");
const url='mongodb://127.0.0.1:27017/ApiTesting';

beforeAll(async()=>{
    await mongoose.connect(url, {
        
    })
});
afterAll(async()=>{
    await mongoose.connection.close();
})
//new location testing
describe(' Add location testing ', ()=>{
    it('Add location testing ', ()=>{
        const addhostelTest={
            cName: "Kathmandu",
            cDescription:"i want this",
            cImage:"user.png",
            cStatus:"active"      
        }
        return locations.create(addhostelTest).then((pro_ret)=>{
            expect(pro_ret.cName).toEqual("Kathmandu")
        })
    })
})
  


it("Delete locations;", async() => {
    return locations.findByIdAndDelete(
        { _id: Object("62c8fa96bc651b0b84edb443") }, // Add _id from product id
  
    )
  })