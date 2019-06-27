'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('bb_directories', [{
            name: 'Home',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Documents',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Private',
            parentId: 2,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'My private images',
            parentId: 3,
            createdAt: new Date(),
            updatedAt: new Date()
        }]);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('bb_directories', null, {});
    }
};
