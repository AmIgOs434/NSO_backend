const Router = require('express')

const router = new Router()
const deviceController = require('../controllers/deviceController')




router.post('/getOneSklad', deviceController.getOneSklad)
router.get('/getallSklad', deviceController.getallSklad)
router.get('/getallSklad', deviceController.getallSklad_abch)
router.get('/getallSklad', deviceController.getallSklad_simple)

router.post('/createphoto', deviceController.createphoto)
router.post('/createskrabotii', deviceController.createskrabotii)
router.post('/createskladitsifri', deviceController.createskladitsifri)
router.post('/createskltseli', deviceController.createskltseli)
router.post('/createskladi', deviceController.createskladi)

router.post('/getStatya', deviceController.getStatya)



router.post('/postMessage', deviceController.postMessage)
router.post('/postMessage1', deviceController.postMessage1)
router.post('/postMessage22', deviceController.postMessage22)
router.post('/postMessage23', deviceController.postMessage23)


module.exports = router