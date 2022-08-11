module.exports = (sequelize, dataTypes) => {
    let alias = "ProductCart";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        product_id: {
             type: dataTypes.INTEGER,
        },
        quantity: {
            type: dataTypes.INTEGER,
        },
        user_id: {
            type: dataTypes.INTEGER,
        }
    };
    let config = {
        tableName: "productCart",
        timestamps: false,
    };

    const ProductCart = sequelize.define(alias, cols, config);
     ProductCart.associate = function(models) {
    ProductCart.belongsToMany(models.Users, {
        as: "usersProductCart",
        through: "ProductCart_users",
        foreignKey: "productCart_id",
        otherKey: "user_id",
        timestamps: false,
    });
    ProductCart.belongsToMany(models.ProductCart, {
        as: "ProductsProductCart",
        through: "ProductCart_users",
        foreignKey: "productCart_id",
        otherKey: "product_id",
        timestamps: false,
    }); 

   /*  ProductCart.belongsToMany(models.Products, {
        as: "productCartProducts",
        through: "productCart_products",
        foreignKey: "productCart_id",
        otherKey: "product_id",
        timestamps: false,
    });  */

     }
    return ProductCart;
}