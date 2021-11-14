const schema = mongoose.Schema({
    guildID: String
});
module.exports = mongoose.model("Guild", schema)