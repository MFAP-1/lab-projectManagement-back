const mongoose = require("mongoose");

const DB_NAME = "projectManagementApp";

module.exports = mongoose
  .connect(`mongodb://localhost:27017/${DB_NAME}`)
  .then((self) => console.log(`Conectado ao banco ${self.connection.name}`))
  .catch((err) => console.error(err));
