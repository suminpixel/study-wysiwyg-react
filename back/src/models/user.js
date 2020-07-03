const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); 

const { Schema } = mongoose;

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

UserSchema.methods.serialize = function () {
    const data = this.toJson();
    delete data.hashedPassword;
    return data;
}

UserSchema.methods.generateToken = function () {
    const token = jwt.sign(
        {
            _id: this.id,
            usernmae: this.username
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '7d'
        }
    )
    return token;
}
const User = mongoose.model('User', UserSchema);


module.exports = User;