module.exports = (sequelize, dataTypes) => {
    let alias = "FavoriteProducs";
    let cols = {
      id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      product_id: {
        type: dataTypes.INTEGER,
      },
      user_id: {
        type: dataTypes.INTEGER,
      },
    };
    let config = {
      tableName: "favoriteProducts",
      timestamps: false,
    };

    const favoriteProducts = sequelize.define(alias, cols, config);

    return favoriteProducts;
}