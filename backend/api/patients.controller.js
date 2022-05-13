import PatientsDAO from "../dao/patientsDAO.js"

export default class PatientsCtrl {
  static async apiGetPatients(req, res, next) {
    let filters = {}
    if (req.query.OrderId) {
      filters.OrderId= req.query.OrderId
    }

    const { patientsList } = await PatientsDAO.getPatients({
      filters,
    })

    let response = {
      patients: patientsList,
      filters: filters,
    }
    res.json(response)
  }
}
