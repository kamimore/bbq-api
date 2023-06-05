/* eslint-disable no-restricted-syntax */
const {
    flattenDeep,
    orderBy,
    uniqBy,
} = require('lodash');

module.exports = (function () {
    async function findSurveyIdsByUserId(userId) {
        const surveyApprovals = await domain.SiteSurveyApproval.findAll({
            where: {
                $or: [{
                    assignedToId: userId,
                }, {
                    assignedById: userId,
                }],
            },
            attributes: ['siteSurveyId'],
        });

        let surveyIds = [];

        if (surveyApprovals && surveyApprovals.length) {
            surveyIds = surveyApprovals.map(s => s.siteSurveyId);
        }
        return surveyIds;
    }

    function getSiteLocation(responses) {
        let locationResponses = responses.filter(r => r.question_category.name === 'location');
        locationResponses = locationResponses.filter(r => !['coordinates', 'site_coordinates'].includes(r.question.answerType));
        locationResponses = orderBy(locationResponses, ['question.order'], ['asc']);

        let address = locationResponses.map(r => r.response);

        address = flattenDeep(address);

        // return address && address.length) ? address[0] : '';
        return address.join(',');
    }

    function getSiteContactPerson(responses) {
        const contactResponses = responses.filter(r => r.question_category.name === 'contact');

        if (contactResponses && contactResponses.length) {
            const res = contactResponses.find(r => r.question.label === 'Contact name');
            if (res) return res.response && res.response.length ? res.response.join(',') : '';
        }
        return '';
    }

    function getSiteRegion(responses) {
        const locationResponses = responses.filter(r => r.question_category.name === 'location');

        if (locationResponses && locationResponses.length) {
            const res = locationResponses.find(r => r.question.label === 'Region');
            if (res) return res.response && res.response.length ? res.response[0] : '';
        }
        return '';
    }

    // 1. Images
    // 2. Owner name
    // 3. Site Address
    // 4. Survey Id
    // 5. Location(lat, long ) - > coordinates
    // 6. Status
    // 7. images
    const getSurveys = async (loggedInUser, status = 'all', lastSync = null, callback) => {
        try {
            const query = {
                where: {
                    isDeleted: false,
                },
                // limit: 10,
                order: [
                    ['created_at', 'DESC'],
                ],
                include: [{
                    model: domain.User,
                    as: 'CreatedBy',
                    attributes: ['id', 'fullName'],
                }, {
                    model: domain.Response,
                    attributes: ['id', 'response', 'question'],
                    include: [{
                        model: domain.QuestionCategory,
                        attributes: ['name', 'order'],
                    }],
                }, {
                    model: domain.SiteSurveyApproval,
                    attributes: ['id', 'status', 'comment'],
                    include: [{
                        model: domain.User,
                        as: 'SurveyApprovalAssignedTo',
                        attributes: ['id', 'fullName'],
                        include: [{
                            model: domain.Role,
                        }],
                    }],
                }],
            };

            if (loggedInUser.role && loggedInUser.role.name !== 'co') {
                const surveyIds = await findSurveyIdsByUserId(loggedInUser.id);

                query.where = {
                    isDeleted: false,
                    $or: [{
                        createdById: loggedInUser.id,
                    }, {
                        id: {
                            $in: surveyIds,
                        },
                    }],
                };
            }

            if (status !== 'all') query.where.status = status;
            if (lastSync) query.where.updated_at = {
                $gt: lastSync
            };

            const surveys = await domain.SiteSurvey.findAll(query);

            const items = [];

            for (const survey of surveys) {
                const data = {
                    id: survey.id,
                    title: survey.title,
                    status: survey.status,
                    created_at: survey.created_at,
                    createdBy: survey.CreatedBy ? survey.CreatedBy.fullName : 'NA',
                    contactPerson: '',
                    region: '',
                    project: '',
                    legal: '',
                    operations: '',
                };

                const images = survey.responses.filter(r => r.question.answerType === 'image').map(r => r.response);
                let coordinates = survey.responses.filter(r => r.question.answerType === 'site_coordinates').map(r => r.response);

                coordinates = flattenDeep(coordinates);

                data.images = flattenDeep(images);
                data.coordinates = coordinates;
                data.address = getSiteLocation(survey.responses);
                data.region = getSiteRegion(survey.responses);
                data.contactPerson = getSiteContactPerson(survey.responses);

                if (survey.SiteSurveyApprovals && survey.SiteSurveyApprovals.length) {
                    for (const role of ['project', 'legal', 'operations']) {
                        const approval = survey.SiteSurveyApprovals.find((s) => {
                            if (s.SurveyApprovalAssignedTo && s.SurveyApprovalAssignedTo.role) {
                                return s.SurveyApprovalAssignedTo.role.name === role;
                            }
                        });
                        if (approval) data[role] = approval.status;
                    }
                }

                // console.log(data);

                items.push(data);
            }

            return callback(null, items);
        } catch (err) {
            return callback(err);
        }
    };

    const getSurveyDetail = async (siteSurveyId, loggedInUser, roleId, callback) => {
        try {
            const userRoleId = loggedInUser.roleId;

            console.log('userRoleId', userRoleId);
            // console.log('loggedInUser', loggedInUser);

            const survey = await domain.SiteSurvey.findOne({
                where: {
                    id: siteSurveyId,
                },
                include: [{
                    model: domain.SiteSurveyApproval,
                    attributes: ['id', 'status', 'dueDate', 'comment'],
                    include: [{
                        model: domain.User,
                        as: 'SurveyApprovalAssignedTo',
                        attributes: ['id', 'fullName'],
                    }],
                }],
            });

            if (!survey) throw new Error('Project not found');

            survey.SiteSurveyApprovals = survey.SiteSurveyApprovals.map((s) => {
                s.dataValues.name = s.SurveyApprovalAssignedTo ? s.SurveyApprovalAssignedTo.fullName : '';
                s.dataValues.userId = s.SurveyApprovalAssignedTo ? s.SurveyApprovalAssignedTo.id : '';

                delete s.dataValues.SurveyApprovalAssignedTo;

                return s;
            });

            let [
                categories,
                categoryRoles,
            ] = await Promise.all([
                domain.QuestionCategory.findAll({
                    include: [{
                        model: domain.Response,
                        where: {
                            siteSurveyId,
                        },
                    }, {
                        model: domain.QuestionCategoryRole,
                        where: {
                            roleId: roleId || userRoleId,
                        },
                        required: true,
                    }],
                    order: [
                        ['order', 'ASC'],
                    ],
                }), domain.QuestionCategoryRole.findAll({
                    where: {
                        isActive: true,
                    },
                    include: [{
                        model: domain.Role,
                        attributes: ['id', 'name'],
                    }],
                }),
            ]);

            categoryRoles = categoryRoles.map(r => r.role);
            categoryRoles = uniqBy(categoryRoles, 'id');

            const items = categories.map((cat) => {
                const roleIds = cat.question_category_roles.map(q => q.roleId);

                console.log('categoryname', cat.name, 'roleIds', roleIds);

                cat.isEditable = roleIds.includes(userRoleId);
                cat.dataValues.isEditable = roleIds.includes(userRoleId);
                cat.dataValues.roleIds = roleIds;

                delete cat.dataValues.question_category_roles;

                return cat;
            });

            // items = orderBy(items, ['isEditable'], ['desc']);

            const payload = {
                siteSurveyId,
                title: survey.title,
                status: survey.status,
                createdDate: survey.created_at,
                approvalRequests: survey.SiteSurveyApprovals,
                roles: categoryRoles,
                responses: items,
            };

            return callback(null, payload);
        } catch (err) {
            return callback(err);
        }
    };

    const getSurveyStatus = async (userId, callback) => {
        try {
            const surveyIds = await findSurveyIdsByUserId(userId);

            const surveys = await domain.SiteSurvey.findAll({
                where: {
                    isDeleted: false,
                    $or: [{
                        createdById: userId,
                    }, {
                        id: {
                            $in: surveyIds,
                        },
                    }],
                },
                attributes: ['id', 'status', 'created_at'],
                order: [
                    ['created_at', 'DESC'],
                ],
                include: [{
                    model: domain.User,
                    as: 'CreatedBy',
                    attributes: ['id', 'fullName'],
                    // include: [{
                    //     model: domain.UserRegion,
                    //     include: [{
                    //         model: domain.MstRegion,
                    //     }],
                    // }],
                }, {
                    model: domain.SiteSurveyApproval,
                    attributes: ['id', 'status', 'comment'],
                    include: [{
                        model: domain.User,
                        as: 'SurveyApprovalAssignedTo',
                        attributes: ['id', 'fullName'],
                        include: [{
                            model: domain.Role,
                        }],
                    }],
                }, {
                    model: domain.Response,
                    attributes: ['id', 'response', 'question'],
                    include: [{
                        model: domain.QuestionCategory,
                        where: {
                            name: {
                                $in: ['location', 'contact'],
                            },
                        },
                        attributes: ['name', 'order'],
                    }],
                }],
            });

            const items = [];

            for (const survey of surveys) {
                const data = {
                    id: survey.id,
                    status: survey.status,
                    created_at: survey.created_at,
                    createdBy: survey.CreatedBy ? survey.CreatedBy.fullName : 'NA',
                    contactPerson: '',
                    project: '',
                    legal: '',
                    operations: '',
                    region: '',
                    location: '',
                };

                // if (survey.CreatedBy && survey.CreatedBy.UserRegions && survey.CreatedBy.UserRegions.length) {
                //     data.region = survey.CreatedBy.UserRegions.map(o => o.MstRegion.name).join(",");
                // }

                data.region = getSiteRegion(survey.responses);
                data.location = getSiteLocation(survey.responses);
                data.contactPerson = getSiteContactPerson(survey.responses);

                if (survey.SiteSurveyApprovals && survey.SiteSurveyApprovals.length) {
                    for (const role of ['project', 'legal', 'operations']) {
                        const approval = survey.SiteSurveyApprovals.find(s => s.SurveyApprovalAssignedTo.role.name === role);
                        if (approval) data[role] = approval.status;
                    }
                }

                items.push(data);
            }

            return callback(null, items);
        } catch (err) {
            return callback(err);
        }
    };

    const getSurveyApprovalRequest = async (siteSurveyId, callback) => {
        try {
            // const surveyIds = await findSurveyIdsByUserId(userId);

            const siteSurvey = {
                approvalRequests: [],
            };

            let items = await domain.SiteSurveyApproval.findAll({
                where: {
                    siteSurveyId,
                },
                attributes: ['id', 'status', 'dueDate', 'comment'],
                include: [{
                    model: domain.User,
                    attributes: ['fullName', 'id'],
                    as: 'SurveyApprovalAssignedTo',
                }],
            });

            items = items.map((s) => {
                s.dataValues.name = s.SurveyApprovalAssignedTo ? s.SurveyApprovalAssignedTo.fullName : '';
                s.dataValues.userId = s.SurveyApprovalAssignedTo ? s.SurveyApprovalAssignedTo.id : '';

                delete s.dataValues.SurveyApprovalAssignedTo;

                return s;
            });

            siteSurvey.approvalRequests = items;

            return callback(null, siteSurvey);
        } catch (err) {
            return callback(err);
        }
    };

    return {
        getSurveys,
        getSurveyDetail,
        getSurveyStatus,
        getSurveyApprovalRequest,
    };
}());
