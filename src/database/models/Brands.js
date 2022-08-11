module.exports = (sequelize, dataTypes) => {
    let alias = "Brands";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: dataTypes.STRING,
        }
    };
    let config = {
        tableName: "brands",
        timestamps: false,
    };

    const Brands = sequelize.define(alias, cols, config);
    Brands.associate = function(models) {
        Brands.hasMany(models.Models, {
            as: "modelosMarcas",
            foreignKey: "brand_id",
        });

    }
    return Brands;
}