
checkValidOption = (reqOption) => {

    const memberActivityAlarm = 'memberActivityAlarm';
    const likeAlarm = 'likeAlarm';
    const replyAlarm = 'replyAlarm';
    const invitationAlarm = 'invitationAlarm';
    const birthdayAlarm = 'birthdayAlarm';
    const scheduleAlarm = 'scheduleAlarm';
    const connectedDeviceAlarm = 'connectedDeviceAlarm';
    const unit = 'unit';
    const emailSubscription = 'emailSubscription';

    switch (reqOption) {
        case memberActivityAlarm:
            return true;
        case likeAlarm:
            return true;
        case replyAlarm:
            return true;
        case invitationAlarm:
            return true;
        case birthdayAlarm:
            return true;
        case scheduleAlarm:
            return true;
        case connectedDeviceAlarm:
            return true;
        case unit:
            return true;
        case emailSubscription:
            return true;
        default:
            return false;
    }
};
module.exports = checkValidOption;