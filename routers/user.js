const express = require('express')
const user = require('../controllers/user')
const { auth } = require('../middleware/auth')

const router = express.Router()

router.get('/', auth, user.user_list_get)
router.get('/:id', user.user_detail_get)
router.post('/', user.user_create_post)
router.post('/signin/', user.user_signin_post)
router.post('/signout/', user.user_signout_post)
router.delete('/:id', user.user_delete_delete)


module.exports = router