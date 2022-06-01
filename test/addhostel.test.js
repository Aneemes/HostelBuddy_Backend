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
describe(' Add hostel testing ', ()=>{
    it('Add hostel testing ', ()=>{
        const addhostelTest={
            name: "hostel88",
            type:"abcd",
            city:"ktm",   
            address:"address", 
            distance:"12",      
            title:"title",    
            desc:"desription",      
            rating:"5"  ,
            cheapestPrice:"1200",      
        }
        return Hostel.create(addhostelTest).then((pro_ret)=>{
            expect(pro_ret.name).toEqual("hostel88")
        })
    })
})