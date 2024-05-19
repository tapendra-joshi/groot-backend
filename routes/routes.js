var express = require('express');
const bcrypt = require('bcryptjs');
var router = express.Router();
const utils = require('../utils');

const User = require('grootorm/src/model/User');
const Setting = require('grootorm/src/model/Setting');

router.get("/", async (req, res) => {
    try {
        var ormLib = req.app.get('ormLib');
        const userRepository = await ormLib.getRepository(User);
        var users = await userRepository.find({ relations: ['setting'] });
        if (users.length == 0) {
            return res.status(200).json({ "message": "No Data Found", "statusCode": 200 });
        }
        usersList = [];
        users.map((user) => {
            usersList.push(utils.parseUserOutput(user));
        })
        res.status(200).json({ "data": usersList, "statusCode": 200 })
    }
    catch (error) {
        console.log("Error while fetching users :", error)
        return res.status(500).json({ "message": error, "statusCode": 500 });
    }
});


router.post("/", async (req, res) => {
    try {
        var input = req.body;
        const ormLib = req.app.get('ormLib')
        const userRepository = await ormLib.getRepository(User);
        const settingRepository = await ormLib.getRepository(Setting);
        
        // check if email already exists
        const exists = await userRepository.existsBy({ email: input.email })
        if (exists) {
            return res.status(409).json({ "message": "User Already Exists"})
        }

        let setting = new Setting();
        setting.isNotificationEnabled = input.isNotificationEnabled
        setting.isNewDashboardEnabled = input.isNewDashboardEnabled
        setting.timezone = input.timezone

        await settingRepository.insert(setting);
        insertedSettingId = settingRepository.getId(setting);

        let user = new User();
        user.firstName = input.firstName
        user.lastName = input.lastName
        user.email = input.email
        user.password = await bcrypt.hash(input.password,10)
        user.setting = insertedSettingId
        
        await userRepository.save(user);
        return res.status(201).json({ "message": "User Created Successfully" })
    }
    catch (error) {
        console.log("Error while creating new User :", error)
        return res.status(500).json({ "message": "Internal Server Error" });
    }
})


router.get("/email", async (req, res) => {
    try {
        var email = req.query.email;
        const ormLib = req.app.get('ormLib')
        const userRepository = await ormLib.getRepository(User);
        var record= await userRepository.findOne({where:{email:email},relations: ['setting']});
    
        if (record == null || record.length == 0) {
            return res.status(200).json({ "message": "No Data Found","data": []});
        }
        console.log(record);
        userResp = utils.parseUserOutput(record);
        return res.status(200).json({ "data": [userResp] })
    }
    catch (error) {
        console.error("Error while fetching user :", error)
        return res.status(500).json({ "message": error, "data": []});
    }
});

module.exports = router