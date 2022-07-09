const mongoose = require('mongoose');
const hostels = require("../models/hostels.js");
const url='mongodb://127.0.0.1:27017/ApiTesting';

beforeAll(async()=>{
    await mongoose.connect(url, {
        
    })
});
afterAll(async()=>{
    await mongoose.connection.close();
})

//register testing
describe(' Add hostel testing ', ()=>{
    it('Add hostel testing ', ()=>{
        const addhostelTest={
            pName: "hostel88",   
            pDescription:"desription",      
            pPrice:"510561"  ,
            pSold:"0",
            pQuantity:"4",
            plocation:"Kathmandu",
            pImages:"user.png",
            pOffer:"5%",
            pStatus:"active"      
        }
        return hostels.create(addhostelTest).then((pro_ret)=>{
            expect(pro_ret.pName).toEqual("hostel88")
        })
    })
})

it("Delete hostel;", async() => {
    return hostels.findByIdAndDelete(
        { _id: Object("62c8fc33c9fc8b56144471aa") }, // Add _id from product id
  
    )
  })