module.exports = (sequelize, dataTypes) => {
    let alias = "Orders";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        total: {
            type: dataTypes.FLOAT,

        },
        orderDate: {
            type: dataTypes.DATE,

        },
        user_id: {
            type: dataTypes.STRING,
        }
    };
    let config = {
        tableName: "orders",
        timestamps: false
    }

    const Orders = sequelize.define(alias, cols, config)

    Orders.associate = function(models) {
        Orders.belongsTo(models.Users, {
            as: "orderUser",
            foreignKey: "user_id",
        });

        Orders.hasMany(models.BuyDetail, {
            as: "order_buyDetail",
            foreignKey: "buyDetail_id",
        });

    }


    return Orders;
}