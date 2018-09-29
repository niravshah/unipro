module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.changeColumn('Locations', 'id', {
            type: Sequelize.INTEGER, allowNull: false, autoIncrement:true
        });
    },
    down: (queryInterface, Sequelize) => {
        return true;
    }
}