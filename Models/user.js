var mongoose = require('mongoose');
const schema = mongoose.Schema;

const UserSchema = new schema({
    "username": {
        type:String
    },
    "mobile": {
        type:String
    },
    "email": {
        type:String
    },
    "address":{
        type:String
    }
});
const user = mongoose.model('nemesis',UserSchema);
module.exports = user;
