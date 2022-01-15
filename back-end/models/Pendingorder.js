const mongoose = require("mongoose");

const pendingorderSchema = new mongoose.Schema(
  {
    userid: { type: String, required: true, unique: true },
    totalprice: { type: String, required: true, unique: true },
    address:{ type: String, required: true },
    itemlist: [String],
    dateoforder:Date
     },
  
);

module.exports = mongoose.model("Pendingorder", pendingorderSchema);