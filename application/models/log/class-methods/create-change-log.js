const { pick, omit, keys } = require('lodash');

module.exports = function ({
    userId, model, entityId = null, newItem = null, oldItem = null, type, logWhitelist = null,
}) {
    const entity = model ? model.getTableName() : 'miscellaneous';

    const defaultKeys = omit(newItem, ['id', 'password', 'created_at', 'updated_at']);

    logWhitelist = logWhitelist || keys(defaultKeys);

    const keysChanged = logWhitelist.filter((f) => {
        if (oldItem && newItem) return oldItem[f] !== newItem[f];
        if (!oldItem) return true;
        if (!newItem) return true;
        return false;
    });

    function getEntityId() {
        if (entityId) return entityId;

        if (['login', 'logout'].includes(type)) {
            return userId;
        }
        if (newItem && newItem.id) return newItem.id;
        if (oldItem && oldItem.id) return oldItem.id;

        return null;
    }

    const allowedTypes = ['login', 'logout', 'notification', 'create_vendor_erp', 'create_contract_erp', 'firebase_notification'];

    if (keysChanged.length > 0 || allowedTypes.includes(type)) {
        // if (!userId) {
        //     return null;
        // }
        domain.Log.create({
            userId,
            type,
            entity,
            entityId: getEntityId(),
            // Null will help differentiate between creation/update/deletion when reading
            oldValue: oldItem ? pick(oldItem, keysChanged) : null,
            newValue: newItem ? pick(newItem, keysChanged) : null,
        }).then(f => f);
    }

    return Promise.resolve();
};
