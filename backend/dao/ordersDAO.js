import mongodb from "mongodb"

let orders

var orderId_counter = 5

export default class OrdersDAO {
  static async injectDB(conn) {
    if(orders) {
      return
    }
    try {
      orders = await conn.db(process.env.JUBO_NS).collection("orders")
    } catch (e) {
      console.log(orders)
      console.error(
        `Unable to establish a collection handle in ordersDAO: ${e}`,
      )
    }
  }

  static async getOrders( {
    filters = null,
  } = {}) {
    let query
    if ("Id" in filters){
      query = { "Id": { $eq: filters["Id"] } }
    }

    let cursor

    try {
      cursor = await orders
        .find(query)
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`)
      return { ordersList: []}
    }

    try {
      const ordersList = await cursor.toArray()

      return {ordersList}
    } catch (e) {
      console.error(`Unable to convert cursor to array, ${e}`)
      return { ordersList: []}
    }
  }

  static async addOrder(text) {
    try {
      orderId_counter += 1
      const orderDoc = {
      "Id":`${orderId_counter}`,
      "Message":text, }

      return await orders.insertOne(orderDoc)
    } catch (e) {
      console.error(`Unable to post order: ${e}`)
      return { error: e }
    }
  }

  static async updateOrder(orderId, text) {
    try {
      return await orders.updateOne(
        { 'Id': orderId },
        { $set: {Message: text}})
    } catch (e) {
      console.error(`Unable to post order: ${e}`)
      return { error: e }
    }
  }
}
