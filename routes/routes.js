var express = require('express');
var router = express.Router();
const User = require('grootorm/src/model/User');

router.get("/", async (req, res) => {
    try {
        var ormLib = req.app.get('ormLib');
        const userRepository = await ormLib.getRepository(User);
        var entities = await userRepository.find();
        
        if (entities.length == 0) {
            return res.status(200).json({ "message": "No Data Found", "statusCode": 200 });
        }

        res.status(200).json({ "data": entities, "statusCode": 200 })

    }
    catch (error) {
        console.log("Error while fetching users :", error)
        return res.status(500).json({ "message": error, "statusCode": 500 });
    }
});


router.post("/", async (req, res) => {
    try {
        var input = req.body;
        console.log(input);
        const ormLib = req.app.get('ormLib')
        const userRepository = await ormLib.getRepository(User);

        let user = new User();
        user.firstName = 'Tapppu'
        user.lastName = 'Zoom'
        user.email = 'abc@123.com'
        user.password = 'Qwerty'

        
        await userRepository.save(user);
        res.status(201).json({ "message": "User Created Successfully", "statusCode": 201 })
    }
    catch (error) {
        console.log("Error while creating new User :", error)
        return res.status(500).json({ "message": "Internal Server Error", "statusCode": 500 });
    }
})


router.get("/:userID", async (req, res) => {
    try {
        var userID = parseInt(req.params.userID)
        if (isNaN(userID)) {
            return res.status(400).json({ "message": "Invalid Input" });
        }
        var record = await userModel.findAll({
            where: {
                Id: userID,
            },
            attributes: ['Id', 'FirstName', 'LastName', 'Email']
        })
        if (record.length == 0) {
            return res.status(200).json({ "message": "No Data Found", "statusCode": 200 });
        }
        res.status(200).json({ "data": record, "statusCode": 200 })
    }
    catch (error) {
        console.error("Error while fetching user :", error)
        return res.status(500).json({ "message": error, "statusCode": 500 });
    }
});

module.exports = router