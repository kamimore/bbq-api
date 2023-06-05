require('../configurations/init.js');

const uuid = require('node-uuid');

(async function () {
    try {
        const roles = [{
            name: 'superadmin',
            label: 'superadmin',
        }, {
            name: 'bd',
            label: 'bd',
        }, {
            name: 'sourcing',
            label: 'sourcing',
        }, {
            name: 'legal',
            label: 'legal',
        }, {
            name: 'operations',
            label: 'operations',
        }, {
            name: 'project',
            label: 'project',
        }];

        const categories = [{
            name: 'contact',
            order: 1,
        }, {
            name: 'location',
            order: 2,
        }, {
            name: 'measurement',
            order: 3,
        }];

        // const supercategories = [{
        //     code: 'non_food',
        //     name: 'NON FOOD'
        // }, {
        //     code: 'liquor',
        //     name: 'Liquor'
        // }];

        await domain.Role.bulkCreate(roles);
        await domain.QuestionCategory.bulkCreate(categories);
        await createAdmin();

        process.exit(1);
    } catch (err) {
        console.log('Error', err);
    }
}());

async function createAdmin() {
    const adminRole = await domain.Role.findOne({
        where: {
            name: 'superadmin',
        },
    });

    if (!adminRole) throw new Error('Super Admin role not found');

    const user = await domain.User.findOne({
        where: {
            roleId: adminRole.id,
        },
    });

    if (user) return;

    const saltString = uuid.v1();

    const password = domain.User.encryptPassword(saltString, process.env.ADMIN_PASSWORD);

    const superAdminUser = {
        fullName: process.env.ADMIN_FULL_NAME,
        userName: process.env.ADMIN_USER_NAME,
        email: process.env.ADMIN_EMAIL,
        salt: saltString,
        password,
        roleId: adminRole.id,
        accountLocked: false,
        isEmailVerified: true,
    };

    const admin = await domain.User.create(superAdminUser);

    if (!admin) throw new Error('Unable to create admin');

    console.log(`Admin created succesfully ${admin}`);
}
