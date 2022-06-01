const mongoose = require('mongoose');
const User = require("../models/User.js");
const url='mongodb://127.0.0.1:27017/ApiTesting';

beforeAll(async()=>{
    await mongoose.connect(url, {
        
    })
});
afterAll(async()=>{
    await mongoose.connection.close();
})

//register testing
describe(' User Registration testing ', ()=>{
    it('User Registration testing ', ()=>{
        const userTest={
            username: "animesh",
            password:"aneemes@1",           
        }
        return User.create(userTest).then((pro_ret)=>{
            expect(pro_ret.username).toEqual("animesh")
        })
    })
})