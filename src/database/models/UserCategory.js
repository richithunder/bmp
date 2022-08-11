module.exports = (sequelize, dataTypes) => {
    let alias = "UserCategories";
    let cols = {
      id: {
        type: dataTypes.INTEGER,
        primaryKey: true, 
        autoIncrement: true
      },
      type: {
        type: dataTypes.STRING,
      }    };
    let config = {
      tableName: "userCategories",
      timestamps: false,
    };

    const UserCategory = sequelize.define(alias, cols, config)

     UserCategory.associate = function (models) {
       UserCategory.hasMany(models.Users, {
         as: "users",
         foreignKey: "usercategory_id",
       });
     };



    return UserCategory;
}