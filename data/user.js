const schema = mongoose.Schema({
    
    userID: String,
    guildID: String,
    money: { type: Number, default: 0 },
    workcd: {type: Number, default: 0}
});
module.exports = mongoose.model("User", schema)