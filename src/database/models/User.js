module.exports = (sequelize, dataTypes) => {
    let alias = "Users";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userName: {
            type: dataTypes.STRING,
        },
        firstName: {
            type: dataTypes.STRING,
        },
        lastName: {
            type: dataTypes.STRING,
        },
        email: {
            type: dataTypes.STRING,
        },
        cuit: {
            type: dataTypes.INTEGER,
        },
        companyName: {
            type: dataTypes.STRING,
        },
        phoneNumber: {
            type: dataTypes.INTEGER,
        },
        password: {
            type: dataTypes.STRING,
        },
        companyImg: {
            type: dataTypes.STRING,
        },
        usercategory_id: {
            type: dataTypes.STRING,
        }
    };
    let config = {
        tableName: "users",
        timestamps: false
    }

    const User = sequelize.define(alias, cols, config)

    User.associate = function(models) {
        User.belongsTo(models.UserCategories, {
            as: "usersCategories",
            foreignKey: "usercategory_id",
        });

        User.belongsToMany(models.Products, {
            as: "favoritosProductos",
            through: "favoriteProducts",
            foreignKey: "user_id",
            otherKey: "product_id",
            timestamps: false,
        });
        User.belongsToMany(models.ProductCart, {
            as: "productCartusers",
            through: "ProductCart_users",
            foreignKey: "user_id",
            otherKey: "productCart_id",
            timestamps: false,
        }); 
        User.hasMany(models.Products, {
            as: "productVendor",
            foreignKey: "vendor_id",
        });
     

        //buyDetail + products necesitan una tabla intermedia? Si
        //productCar + users, necesitan tabla intermedia? 

    }


    return User;
}