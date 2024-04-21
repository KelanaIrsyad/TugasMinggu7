const mongoose = require("mongoose");

const CustomerObject = {
  nomor: { type: String, unique: true, require: true,maxLength:6, minLength:6},
  nama: { type: String, require: true, maxLength:100, minLength:2},
  alamat: { type: String, require: true,maxLength:100, minLength:11 },
  telepon: { type: String, require: true,maxLength:13, minLength:11 }
}

const CustomerSchema = new mongoose.Schema(CustomerObject)

const CustomerModel = mongoose.model("Customer", CustomerSchema);

module.exports = {
  CustomerSchema,
  CustomerModel,
  CustomerObject,
}