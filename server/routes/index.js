const express = require('express')
const router = express.Router()
const errorHandler = require('../middleware/ErrorHandler')
const MainController = require('../controllers/MainController')

router.get('/products', MainController.getAll)
router.post('/products', MainController.create)
router.put('/products/:idProduct', MainController.update)
router.delete('/products/:idProduct', MainController.delete)

router.use(errorHandler)

module.exports = router