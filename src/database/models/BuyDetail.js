module.exports = (sequelize, dataTypes) => {
    let alias = "BuyDetail";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        /*product_id: {
            type: dataTypes.INTEGER,
        },*/
        quantity: {
            type: dataTypes.INTEGER,
        },
        user_id: {
            type: dataTypes.INTEGER,
        },
        operation_id: {
            type: dataTypes.INTEGER,
        },
        price: {
            type: dataTypes.FLOAT,
        }
    };
    let config = {
        tableName: "buyDetail",
        timestamps: false
    }

    const buyDetail = sequelize.define(alias, cols, config);

    buyDetail.associate = function(models) {
        buyDetail.belongsTo(models.Products, {
            as: "detalleCompra_producto",
            foreignKey: "product_id",

        });

        buyDetail.belongsTo(models.Orders, {
            as: "buyDetail_order",
            foreignKey: "buyDetail_id",
        });

    }
    return buyDetail;
}