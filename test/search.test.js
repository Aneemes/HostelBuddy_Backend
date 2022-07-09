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


describe(' gethostel ', ()=>{
    it('gethostel ', async () => {
        
            name: "hostel88"      
        
        
    
    })
});