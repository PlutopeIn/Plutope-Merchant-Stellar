import express from 'express'
const router = express.Router()

import * as CategoryController from '../controller/Admin/CategoryController.js'
import * as BusinessTypeController from '../controller/Admin/BusinessTypeController.js'
import * as FaqController from '../controller/Admin/FaqController.js'
import * as ColorController from '../controller/Admin/ColorController.js'
import * as FontController from '../controller/Admin/FontController.js'
import * as UserController from '../controller/User/UserController.js'
import * as CmsController from '../controller/Admin/CmsController.js'

//#region Global routes
router.get('/get-all-category', CategoryController.getAllCategories)
router.get('/get-all-business-type', BusinessTypeController.getAllBusinessType)
router.get('/get-all-faq', FaqController.getAllFaq)
router.get('/get-all-color', ColorController.getAllColor)
router.get('/get-all-font', FontController.getAllFont)
router.post('/update-transaction-status', UserController.updateRequestPaymentStatus)
router.get('/get-cms', CmsController.getCms)
router.post('/get-access-token', UserController.getAccessToken)

export default router