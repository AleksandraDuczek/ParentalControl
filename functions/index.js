const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

module.exports = function setCustomClaims(auth, uid) {
    return claims => {
        let promise = Promise.resolve({});
        if (claims) {
            promise.auth.setCustomUserClaims(uid, claims).then(() => claims)
        }
        return promise;
    }
};

exports.addAdminRole = functions.https.onCall((data, context) => {
    //get user and add custom claim (admin)
    return admin.auth().getUserByEmail(data.email).then(user => {
        return admin.auth().setCustomUserClaims(user.uid, {
            admin: true,
        });
    }).then(() => {
        return {
            message: `Success! ${data.email} has been made an admin`
        }
    }).catch(err => {
        return err;
    });
});

exports.addChildRole = functions.https.onCall((data, context) => {
    //get user and add custom claim (admin)
    return admin.auth().getUserByEmail(data.email).then(user => {
        return admin.auth().setCustomUserClaims(user.uid, {
            child: true,
        });
    }).then(() => {
        return {
            message: `Success! ${data.email} has been made an child`
        }
    }).catch(err => {
        return err;
    });
});

exports.addParentRole = functions.https.onCall((data) => {
    //get user and add custom claim (admin)
    debugger;
    return admin.auth().getUserByEmail(data.email).then(user => {
        return admin.auth().setCustomUserClaims(user.uid, {
            parent: true,
        });
    }).then(() => {
        return {
            message: `Success! ${data.email} has been made an parent`
        }
    }).catch(err => {
        return err;
    });
});