/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const {
    uniq,
} = require('lodash');

module.exports = async function (instance) {
    try {
        const surveyApproval = await domain.SiteSurveyApproval.findAll({
            where: {
                siteSurveyId: instance.siteSurveyId,
            },
        });

        if (surveyApproval && surveyApproval.length) {
            console.log(surveyApproval);
            const createdByUser = await domain.User.findOne({
                where: {
                    id: instance.createdById,
                },
            });

            if (createdByUser) {
                const message = `A new project note is created by ${createdByUser.fullName}.`;
                const userIds = surveyApproval.map(x => x.assignedToId);
                userIds.push(surveyApproval[0].assignedById);
                const uniqUserIds = uniq(userIds);

                console.log(uniqUserIds, 'uniqUserIds');

                console.log(userIds, 'userIds');
                for (const user of uniqUserIds) {
                    domain.Notification.createNotification({
                        userId: user,
                        type: 'survey_note_created',
                        title: 'Project Note Added',
                        message,
                        payload: {
                            surveyNote: instance,
                            siteSurveyId: instance.siteSurveyId,
                        },
                    });
                }
            } else {
                Logger.info('Notification can not be sent');
            }
        } else {
            Logger.info('Project is not approved.');
        }
        return Promise.resolve(instance);
    } catch (err) {
        return Promise.reject(err);
    }
};
