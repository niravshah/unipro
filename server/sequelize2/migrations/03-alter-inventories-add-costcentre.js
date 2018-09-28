module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('Inventories', 'cost_centre', {
            type: Sequelize.INTEGER, allowNull: false, defaultValue: 1
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('Inventories', 'cost_centre');
    }
}