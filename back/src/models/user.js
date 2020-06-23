const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); 

const UserSchema = new Schema({
    username: String,
    hashedPassword: String,
});

//tip : 함수형을 사용하지 않는 이유 : bcrypt 라이브러리 에서 this 로 문서를 바인딩(가르키고)하고 있기 때문에
UserSchema.methods.setPassword = async function(password){
    const hash = await bcrypt.hash(password, 10);
    this.hashedPassword = hash;
}

UserSchema.methods.checkPassword = async function(password){
    const results = await bcrypt.compare(password, this.hashedPassword);
    return results
}

UserSchema.statics.findByUsername = async function(username){
    return this.findOne({username});
}


const User = mongoose.model('User', UserSchema);


module.exports = User;