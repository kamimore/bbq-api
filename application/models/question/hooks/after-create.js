module.exports = async (instance) => {
    try {
        const question = instance.dataValues;

        const surveys = await domain.SiteSurvey.findAll({
            where: {
                isDeleted: false,
            },
            include: [{
                model: domain.User,
                as: 'CreatedBy',
                attributes: ['id', 'roleId'],
            }],
        });

        if (surveys && surveys.length) {
            const responses = surveys.map(survey => ({
                userId: survey.CreatedBy.id,
                siteSurveyId: survey.id,
                questionId: question.id,
                question,
                roleId: survey.CreatedBy.roleId,
                response: [],
                questionCategoryId: question.questionCategoryId,
            }));
            await domain.Response.bulkCreate(responses);
        }

        console.log('A new question is added to all the project');

        return Promise.resolve(instance);
    } catch (err) {
        return Promise.reject(err);
    }
};
