module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('Inventories', 'location_id', {
            type: Sequelize.INTEGER, references: {model: 'Locations', key: 'id'}, allowNull: false, defaultValue: 5019
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('Inventories', 'location_id');
    }
}