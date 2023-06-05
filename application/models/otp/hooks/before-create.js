module.exports = async function (instance) {
    try {
        const {
            phone
        } = instance.dataValues;

        const data = await domain.Otp.destroy({
            where: {
                phone: phone,
            },
        });
        console.log(data, "deleted ")

        return Promise.resolve(instance);
    } catch (err) {
        return Promise.reject(err);
    }
};
