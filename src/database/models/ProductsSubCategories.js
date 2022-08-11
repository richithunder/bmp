module.exports = (sequelize, dataTypes) => {
    let alias = "ProductsSubCategories";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        product_id: {
            type: dataTypes.INTEGER,
        },
        productSubCategories_id: {
            type: dataTypes.INTEGER,
        },
    };
    let config = {
        tableName: "products_productsubcategories",
        timestamps: false,
    };

    const productsSubCategories = sequelize.define(alias, cols, config);

    return productsSubCategories;
}