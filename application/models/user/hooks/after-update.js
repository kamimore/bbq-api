module.exports = async function (instance) {
    try {
        const {
            id,
            roleId,
        } = instance.dataValues;
        if (roleId == 0) {
            await Promise.all([
                domain.UserArea.destroy({
                    where: {
                        userId: id,
                    },
                }),
                domain.UserSuperCategory.destroy({
                    where: {
                        userId: id,
                    },
                }),
                domain.UserRegion.destroy({
                    where: {
                        userId: id,
                    },
                }),
            ]);
        }
        return Promise.resolve(instance);
    } catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
};
