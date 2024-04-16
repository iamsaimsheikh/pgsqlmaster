const bcrypt = require('bcrypt');

module.exports = {
    up: (queryInterface, Sequelize) => {
        let password = process.env.ADMIN_PASSWORD;
        const hashPassword = bcrypt.hashSync(password, 10);
        return queryInterface.bulkInsert('users', [
            {
                user_type: '0',
                first_name: 'John',
                last_name: 'Doe',
                email: process.env.ADMIN_EMAIL,
                password: hashPassword,
                created_at: new Date(),
                updated_at: new Date(),
            },
        ]);
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('users', { user_type: '0' }, {});
    },
};
