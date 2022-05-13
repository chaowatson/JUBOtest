import OrdersDAO from "../dao/ordersDAO.js"
import PatientsDAO from "../dao/patientsDAO.js"


export default class OrdersCtrl {
  static async apiGetOrders(req, res, next) {
    let filters = {}
    if (req.query.Id) {
      filters.Id = req.query.Id
    }

    const { ordersList } = await OrdersDAO.getOrders({
      filters,
    })

    let response = {
      orders: ordersList,
      filters: filters,
    }
    res.json(response)
  }

  static async apiPostOrder(req, res, next) {
    try {
      const patientId = req.body.PatientId
      const text = req.body.Message

      const OrderResponse = await OrdersDAO.addOrder(
        text,
      )
      const UpdatePatientInfo = await PatientsDAO.addOrder(
        patientId,
      )

      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiUpdateOrder(req, res, next) {
    try {
      const orderId = req.body.OrderId
      const text = req.body.Message

      const UpdateResponse = await OrdersDAO.updateOrder(
        orderId,
        text,
      )

      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }
}
