module.exports = function (password) {
    return domain.User.encryptPassword(this.salt, password) === this.password;
};