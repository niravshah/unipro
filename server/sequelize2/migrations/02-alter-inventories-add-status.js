module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('Inventories', 'active', {
            type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('Inventories', 'active');
    }
}