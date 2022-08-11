module.exports = (sequelize, dataTypes) => {
    let alias = "Models";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        brand_id: {
            type: dataTypes.INTEGER
        },
        name: {
            type: dataTypes.STRING,
        },
        description: {
            type: dataTypes.STRING,
        },
    };
    let config = {
        tableName: "models",
        timestamps: false,
    };


    const Models = sequelize.define(alias, cols, config);


    Models.associate = function(models) {
        Models.belongsTo(models.Brands, {
            as: "marcas",
            foreignKey: "brand_id",
        });


    };
    return Models;

}