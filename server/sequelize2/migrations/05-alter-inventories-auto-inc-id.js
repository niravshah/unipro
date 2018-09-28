module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.changeColumn('Inventories', 'id', {
            type: Sequelize.INTEGER, allowNull: false, autoIncrement:true
        });
    },
    down: (queryInterface, Sequelize) => {
        return true;
    }
}