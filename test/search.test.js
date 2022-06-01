const mongoose = require('mongoose');
const Hostel = require("../models/Hostel.js");
const url='mongodb://127.0.0.1:27017/ApiTesting';

beforeAll(async()=>{
    await mongoose.connect(url, {
        
    })
});
afterAll(async()=>{
    await mongoose.connection.close();
})

//register testing
describe(' gethostel ', ()=>{
    it('gethostel ', ()=>{
        const gethosteltest={
            name: "hostel88"      
        }
        return Hostel.get(gethosteltest).then((pro_ret)=>{
            expect(pro_ret.all).toEqual("hostel88")
        })
    })
})