const {getAllUsersAndUrls,deleteAUser,editUsersUrl, deleteUserUrl}=require("../controller/adminController");
const authMiddleware = require("../middleware/auth");
const authorizeRole = require("../middleware/authorizeRole");

const router = require("express").Router();


router.get('/users',authMiddleware,authorizeRole(['admin']),getAllUsersAndUrls)
router.delete('/users/:id',authMiddleware,authorizeRole(['admin']),deleteAUser)
router.put('/urls/:id',authMiddleware,authorizeRole(['admin']),editUsersUrl)
router.delete('/urls/delete/:id',authMiddleware,authorizeRole(['admin']),deleteUserUrl)
module.exports=router