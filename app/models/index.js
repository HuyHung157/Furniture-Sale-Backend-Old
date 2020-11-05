const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tutorials = require("./product.model")(sequelize, Sequelize);
db.tag = require("./category.model.js")(sequelize, Sequelize);

module.exports = (sequelize, Sequelize) => {
  const Tutorial = sequelize.define("tutorial_TAG", {
    tag_id: {
      type: Sequelize.INTEGER
    },
    tutorial_id: {
      type: Sequelize.INTEGER
    },
  });

  db.tag.belongsToMany(db.tutorial, {
    through: "tutorial_tag",
    as: "tutorials",
    foreignKey: "tag_id",
  });

  db.tutorial.belongsToMany(db.tag, {
    through: "tutorial_tag",
    as: "tags",
    foreignKey: "tutorial_id",
  });
  return Tutorial;
};

module.exports = db;

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});