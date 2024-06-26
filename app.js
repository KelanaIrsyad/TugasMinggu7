const express = require("express");
const cors = require("cors")
const { BarangRouter } = require("./barang/barang.router");
const { ROUTER_BASE_BARANG } = require("./barang/barang.config");
const { MongoDBConnection } = require("./libs/lib.database");
const { ROUTER_BASE_USER } = require("./user/user.config");
const { UserRouter } = require("./user/user.router");
const { ROUTER_BASE_CUSTOMER } = require("./customer/customer.config");
const { CustomerRouter } = require("./customer/customer.router");
const { ROUTER_BASE_ORDER } = require("./order/order.config");
const { OrderRouter } = require("./order/order.router");
const { Logging } = require("./libs/lib.logging");
const { ROUTER_BASE_KAS } = require("./Kas/kas.config");
const { KasRouter } = require("./Kas/kas.router");

const app = express();

MongoDBConnection();

app.use(express.json());

app.use(cors({
  origin: '*'
}))

/**
 * Logging app
 */
app.use((req, res, next) => {
  // Log an info message for each incoming request
  Logging.info(`Received a ${req.method} request for ${req.url}`);
  return next();
});

app.use(ROUTER_BASE_BARANG, BarangRouter);
app.use(ROUTER_BASE_USER, UserRouter);
app.use(ROUTER_BASE_CUSTOMER, CustomerRouter);
app.use(ROUTER_BASE_ORDER, OrderRouter)
app.use(ROUTER_BASE_KAS, KasRouter)

module.exports = {
  app
}