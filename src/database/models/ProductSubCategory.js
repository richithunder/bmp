module.exports = (sequelize, dataTypes) => {
    let alias = "ProductSubCategory";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: dataTypes.STRING,
        },
        description: {
            type: dataTypes.STRING,
        },
        productCategory_id: {
            type: dataTypes.INTEGER,
            foreignKey: true,
        },
    };
    let config = {
        tableName: "productSubCategories",
        timestamps: false,
    };

    const productSubCategory = sequelize.define(alias, cols, config);

   productSubCategory.associate = function(models) {
    productSubCategory.belongsToMany(models.Products, {
            as: "subcategorias_productos",
            through: "products_productSubCategories",
            foreignKey: "productSubcategories_id",
            otherKey: "product_id",
            timestamps: false,
        });
        productSubCategory.belongsTo(models.ProductCategories, {
            as: "subCategorias_cateogriaProductos",
            foreignKey: "productCategory_id",

        })
    };
    
    return productSubCategory;
}