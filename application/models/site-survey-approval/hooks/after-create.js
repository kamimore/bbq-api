module.exports = async function (instance) {
    try {
        const assignedByUser = await domain.User.findOne({
            where: {
                id: instance.assignedById,
            },
        });

        if (assignedByUser) {
            const message = `A new project is assigned to you by ${assignedByUser.fullName}.`;

            domain.Notification.createNotification({
                userId: instance.assignedToId,
                type: 'survey_assigned',
                message,
                title: 'Project Assigned',
                payload: {
                    surveyAssigned: instance,
                    siteSurveyId: instance.siteSurveyId,
                },
            });
        } else {
            Logger.info('Notification can not be sent');
        }
        return Promise.resolve(instance);
    } catch (err) {
        return Promise.reject(err);
    }
};
