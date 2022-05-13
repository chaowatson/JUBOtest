import express from "express"
import PatientsCtrl from "./patients.controller.js"

const router = express.Router()

router.route("/").get(PatientsCtrl.apiGetPatients)

export default router
