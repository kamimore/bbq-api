function getNotificationMessage(payload, type) {
    console.log(payload, "payload");
    switch (type) {
        case "vendor_registered":
            return `A new vendor is registered (${payload.vendor.companyName})`;

        case "survey_note_created":
            return `A project note is created by (${payload.vendor.companyName})`;

        case "survey_assigned":
            return `Project is assigned to ${payload.assignedTo.fullName} by ${payload.assignedBy.fullName}`;

        case "contract_rejected":
            return `Contract ${payload.id}, from ${new Date(
                payload.fromDate
            ).toDateString()} to ${new Date(
                payload.toDate
            ).toDateString()},  has been rejected by BBQ Team`;

        case "contract_accepted":
            return `Contract ${payload.id}, from ${new Date(
                payload.fromDate
            ).toDateString()} to ${new Date(
                payload.toDate
            ).toDateString()}, has been accepted`;

        case "contract_created":
            return "You have received a new contract request from Barbeque Nation Hospitality Ltd, kindly review it.";

        default:
            return "You got new notifications.Please login to see them.";
    }
}

module.exports = ({
    userId,
    message = "",
    payload = null,
    title = "",
    type = "other", //  vendor_registered, other, survey_note_created, survey_assigned
}) => {
    const messageText = message || getNotificationMessage(payload, type);

    const data = {
        userId,
        type,
        title,
        message: messageText,
        payload,
    };

    domain.Log.createChangeLog({
        userId,
        type: "notification",
        newItem: data,
    });

    return domain.Notification.create(data);
};
