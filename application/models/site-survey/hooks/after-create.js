module.exports = async (instance) => {
    const {
        id: siteSurveyId,
        createdById: userId,
    } = instance.dataValues;

    try {
        const user = await domain.User.findById(userId);

        const questions = await domain.Question.findAll({
            where: {
                isDeleted: false,
                isActive: true,
            },
        });

        console.log({
            siteSurveyId,
            userId,
            questions: questions.length,
        });

        if (questions && questions.length) {
            const responses = questions.map(q => ({
                userId,
                siteSurveyId,
                questionId: q.id,
                question: q,
                roleId: user.roleId,
                response: [],
                questionCategoryId: q.questionCategoryId,
            }));
            await domain.Response.bulkCreate(responses);
        }

        return Promise.resolve(instance);
    } catch (err) {
        return Promise.reject(err);
    }
};
