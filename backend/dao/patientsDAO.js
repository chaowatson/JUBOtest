let patients

export default class PatientsDAO {
  static async injectDB(conn) {
    if(patients) {
      return
    }
    try {
      patients = await conn.db(process.env.JUBO_NS).collection("patients")
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in patientsDAO: ${e}`,
      )
    }
  }

  static async getPatients( {
    filters = null,
  } = {}) {
    let query
    if ("Id" in filters){
      query = { "Id": { $eq: filters["Id"] } }
    }

    let cursor

    try {
      cursor = await patients
        .find(query)
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`)
      return { patientsList: []}
    }

    try {
      const patientsList = await cursor.toArray()

      return {patientsList}
    } catch (e) {
      console.error(`Unable to convert cursor to array, ${e}`)
      return { patientsList: []}
    }
  }
}
