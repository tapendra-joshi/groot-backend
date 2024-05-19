exports.parseUserOutput = function(user) {
    var userResponse = {};
    userResponse.firstName= user.firstName
    userResponse.lastName= user.lastName
    userResponse.email= user.email
    userResponse.isNotificationEnabled = user.setting.isNotificationEnabled
    userResponse.isNewDashboardEnabled = user.setting.isNewDashboardEnabled 
    userResponse.timezone = user.setting.timezone
    return userResponse
}


exports.parseSettingOutput = function(setting){
    var settingResp = {};
    settingResp.isNotificationEnabled = setting.isNotificationEnabled
    settingResp.isNewDashboardEnabled = setting.isNewDashboardEnabled 
    settingResp.timezone = setting.timezone
}