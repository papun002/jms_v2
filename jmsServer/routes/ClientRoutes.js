const Express = require("express");
const clientLogin = require("../controller/client/ClientLogin");
const InsertController = require("../controller/client/InsertController");
const {checkout , paymentVerification} = require("../controller/payment/PaymentController");
const FetchingController = require("../controller/client/FetchingController");
const UpdateController = require("../controller/client/UpdateController");
const DeteleController = require("../controller/client/DeleteController");
const extractUserIdFromToken = require("../middleware/auth_verify");

const route = Express.Router();
// Insert or post routes
route.post("/clientLoginAuth",clientLogin.clientLoginAuth);
route.post("/staffs/insertstaff",extractUserIdFromToken,InsertController.staffInsert);
route.route("/checkout").post(checkout)
route.route("/paymentverification").post(paymentVerification)
route.post("/cat/categoryinsert",extractUserIdFromToken,InsertController.insertCategory);
route.post("/pdt/addproduct",extractUserIdFromToken,InsertController.insertProduct);
route.post("/order/addorder",extractUserIdFromToken,InsertController.insertOrder);



// Fetching or get routes 
route.get("/substs",clientLogin.SubStatus);
route.get("/staffs/staffprofile",extractUserIdFromToken,FetchingController.FetchingStaffProfile);
route.get("/staffs/staffprofile/:id",extractUserIdFromToken,FetchingController.FetchingStaffInfo);
route.get("/cat/getcategory",extractUserIdFromToken,FetchingController.FetchingCategory);
route.get("/pdt/getAllProducts",extractUserIdFromToken,FetchingController.FetchingProduct);
route.get("/clientprofile",extractUserIdFromToken,FetchingController.FetchingClientProfile);



// update routes (put)
route.put("/staffs/updatestaff/:id", UpdateController.updateStaff);



//Delete Routes
route.delete("/deletecategory/:id",DeteleController.deleteCategory);



module.exports = route;