module.exports = async function (instance) {
    try{
        const {
            order,
            id: questionId,
        } = instance.dataValues;

        const responses = await domain.Response.findAll({
            where: {
                questionId,
            },
        });

        for(const response of responses){
            if(response && response.question) {
                let question = response.question;

                question.order = order;

                await response.update({
                    question,
                });
            }
        }
        
        console.log('Order is updated in all the responses');

        return Promise.resolve(instance);
    } catch(err){
        return Promise.reject(err);
    }
};
