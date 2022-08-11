module.exports = (sequelize, dataTypes) => {
    let alias = "Products";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        productName: {
            type: dataTypes.STRING,
        },
        price: {
            type: dataTypes.FLOAT,
        },
        minBuy: {
            type: dataTypes.INTEGER,
        },
        description: {
            type: dataTypes.STRING,
        },
        productImages: {
            type: dataTypes.STRING,
        },
        models_id: {
            type: dataTypes.INTEGER,
        },
        category_id: {
            type: dataTypes.INTEGER,
        },
        vendor_id: {
            type: dataTypes.INTEGER,
        }

    };

    let config = {
        tableName: "products",
        timestamps: false
    };

    const Product = sequelize.define(alias, cols, config);

    Product.associate = function(models) {
        Product.belongsTo(models.ProductCategories, {
            as: "categories",
            foreignKey: "category_id"
        });
        Product.belongsTo(models.Models, {
            as: "modelosDeProducto",
            foreignKey: "models_id",
        });
        Product.belongsTo(models.Users, {
            as: "vendor",
            foreignKey: "vendor_id",
        });
        Product.belongsToMany(models.Users, {
            as: "productosFavoritos",
            through: "favoriteProducts",
            foreignKey: "product_id",
            otherKey: "user_id",
            timestamps: false,
        });
      /*  Product.belongsToMany(models.productCart, {
            as: "productsProductCart",
            through: "productCart_products",
            foreignKey: "product_id",
            otherKey: "productCart_id",
            timestamps: false,
        });  */
        Product.belongsToMany(models.ProductCart, {
            as: "ProductCartProducts",
            through: "ProductCart_users",
            foreignKey: "product_id",
            otherKey: "productCart_id",
            timestamps: false,
        }); 
        Product.hasMany(models.BuyDetail, {
            as: "detalleCompra_producto",
            foreignKey: "product_id",

        });

    };

    return Product;
}