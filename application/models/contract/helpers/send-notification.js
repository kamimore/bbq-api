const APPR_BASE_URL = process.env.APPROVAL_HOST;

function sendNotification(userId, type, title, message, payload) {
    if (payload && payload.termCondition) delete payload.termCondition;

    console.log(
        "-----------------------------Sending notification for contract-------------------------------",
        userId,
        type,
        title,
        message
    );

    domain.Notification.createNotification({
        userId,
        type,
        title,
        payload,
        message,
    }).then((f) => f);
}

function getNotificationPayload(contract, vendor) {
    console.log("ContractInfo >>>>", contract);
    console.log("VendorInfo >>>>", vendor);
    const data = {
        title: "",
        type: "",
        message: "",
    };

    if (contract.status === "sent_to_vendor") {
        data.title = `Contract Status Vendor - ${
            vendor.companyName
        } from ${new Date(contract.fromDate).toDateString()} to ${new Date(
            contract.toDate
        ).toDateString()} Created. Do Approve it using the following link ${APPR_BASE_URL}/view-contract-info/${
            contract.id
        }`;
        data.message = data.title;
        data.type = "contract_created";
    }

    if (contract.status === "rejected_by_vendor") {
        data.title = `Contract Vendor - ${vendor.companyName} from ${new Date(
            contract.fromDate
        ).toDateString()} to ${new Date(
            contract.toDate
        ).toDateString()} Rejected by vendor`;
        data.message = data.title;
        data.type = "contract_rejected_by_vendor";
    }

    if (contract.status === "change_request") {
        data.title = `Contract Vendor - ${vendor.companyName} from ${new Date(
            contract.fromDate
        ).toDateString()} to ${new Date(
            contract.toDate
        ).toDateString()} Change requested`;
        data.message = data.title;
        data.type = "contract_change_request";
    }

    if (contract.status === "rejected_by_sourcing") {
        data.title = `Contract Vendor - ${vendor.companyName} from ${new Date(
            contract.fromDate
        ).toDateString()} to ${new Date(
            contract.toDate
        ).toDateString()} Rejected by sourcing`;
        data.message = data.title;
        data.type = "contract_rejected_by_sourcing";
    }

    if (contract.status === "sent_to_co_sourcing") {
        data.title = `Contract Vendor - ${vendor.companyName} from ${new Date(
            contract.fromDate
        ).toDateString()} to ${new Date(
            contract.toDate
        ).toDateString()} Sent to coorporate sourcing `;
        data.message = data.title;
        data.type = "contract_sent_to_co_sourcing";
    }

    if (contract.status === "rejected_by_co_sourcing") {
        data.title = `Contract Vendor - ${vendor.companyName} from ${new Date(
            contract.fromDate
        ).toDateString()} to ${new Date(
            contract.toDate
        ).toDateString()} Rejected by coorporate sourcing`;
        data.message = data.title;
        data.type = "contract_rejected_by_co_sourcing";
    }

    if (contract.status === "approved") {
        data.title = `Contract Vendor - ${vendor.companyName} from ${new Date(
            contract.fromDate
        ).toDateString()} to ${new Date(
            contract.toDate
        ).toDateString()} Approved`;
        data.message = data.title;
        data.type = "contract_accepted";
    }

    return data;
}

module.exports = async function (contract) {
    const vendor = await domain.Vendor.findOne({
        where: {
            id: contract.vendorId,
        },
        include: [
            {
                model: domain.User,
                attributes: ["id"],
            },
        ],
    });

    const { type, title, message } = getNotificationPayload(contract, vendor);

    if (vendor && vendor.User.id) {
        sendNotification(vendor.User.id, type, title, message, contract);
    }
    if (contract && contract.createdBy) {
        sendNotification(contract.createdBy, type, title, message, contract);
    }
};
