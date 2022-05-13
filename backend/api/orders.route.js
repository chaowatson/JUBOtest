import express from "express"
import OrdersCtrl from "./orders.controller.js"

const router = express.Router()

router.route("/").get(OrdersCtrl.apiGetOrders)
  .post(OrdersCtrl.apiPostOrder)
  .patch(OrdersCtrl.apiUpdateOrder)

export default router
