module.exports = async (instance) => {
    try {
        const {
            isDeleted,
            id,
        } = instance.dataValues;

        if (isDeleted) {
            await domain.Notification.update({
                isDeleted: true,
            }, {
                where: {
                    'payload.siteSurveyId': id,
                },
            });
        }
        return Promise.resolve(instance);
    } catch (error) {
        return Promise.reject(instance);
    }
};
