const user = require(`./../../models/user/index`);

module.exports = async function isUserConfigured(userId) {
    if(!userId) return;

    const currentUser = (await user.getByDiscordId(userId)).rows

    if(currentUser && currentUser[0]) return true;
    return false;
}