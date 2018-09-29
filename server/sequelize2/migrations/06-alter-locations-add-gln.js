module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('Locations', 'gs1_gln', {
            type: Sequelize.STRING
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('Locations', 'gs1_gln');
    }
}