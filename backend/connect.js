const mongoose=require("mongoose");

async function handleConnection(url){
    return await mongoose.connect(url);
}

module.exports={handleConnection};