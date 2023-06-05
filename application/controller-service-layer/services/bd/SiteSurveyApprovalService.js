/* eslint-disable no-restricted-syntax */
module.exports = (function () {
    // {
    //     surveyId : 1,
    //     assignedToIds: [],
    //     dueDate: ""
    // }
    const createApprovalRequests = async (userId, data, callback) => {
        try {
            if (data && !data.surveyId) throw new Error('Project id not found');

            // find users assigned to survey
            const assignedUsers = await domain.SiteSurveyApproval.findAll({
                where: {
                    siteSurveyId: data.surveyId,
                    status: 'pending',
                },
                attributes: ['assignedToId'],
            });

            const assignedUserIds = (assignedUsers && assignedUsers.length) ? assignedUsers.map(s => s.assignedToId) : [];

            console.log('assignedUserIds', assignedUserIds);
            console.log('assignToIds', data.assignedToIds);

            // unassign users
            if (assignedUserIds && assignedUserIds.length) {
                const unAssignUserIds = assignedUserIds.filter(s => !data.assignedToIds.includes(s));

                console.log('unAssignUserIds', unAssignUserIds);

                if (unAssignUserIds && unAssignUserIds.length) {
                    await domain.SiteSurveyApproval.destroy({
                        where: {
                            siteSurveyId: data.surveyId,
                            assignedToId: {
                                $in: unAssignUserIds,
                            },
                        },
                    });
                }
            }

            // assign new users
            if (data && data.assignedToIds.length) {
                const assignToUserIds = data.assignedToIds.filter(s => !assignedUserIds.includes(s));

                console.log('new assign', assignToUserIds);

                const items = assignToUserIds.map(id => ({
                    assignedById: userId,
                    siteSurveyId: data.surveyId,
                    assignedToId: id,
                    dueDate: data.dueDate,
                }));

                if (items && items.length) {
                    for (const item of items) {
                        const data = await domain.SiteSurveyApproval.create(item);
                        console.log('after', data);
                    }
                }

                // if(items && items.length) await domain.SiteSurveyApproval.bulkCreate(items, {individualHooks: true});
            }

            return callback(null, {
                message: 'Successfully created.',
            });
        } catch (err) {
            return callback(err);
        }
    };

    return {
        createApprovalRequests,
    };
}());
