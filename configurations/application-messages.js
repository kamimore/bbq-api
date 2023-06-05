const error = {
    // common
    internalServerError: 'Internal Server Error',
    accessDenied: 'Access denied!',
    validationFailed: 'User Validation failed',
    normalError: 'Some error occurred.',
    expireToken: 'Your token has expired.',
    failedAuthorization: 'Sorry, you are not authorized. Please provide action .',
    notPermit: 'You  do not have permission to perform this function.',
    bodyError: 'Body of data is Incorrect way',
    // register
    email_not_unique: 'Email is already registered, please try with different email.',
    noAuthoritytoCreateUser: 'You are not authorized to create user of this access.',
    // login
    registerFirst: 'You are not yet registered. It only takes a few moments to register.',
    passwordNotMatch: "Email or Password doesn't match!",
    emailNotFound: 'Email not found. Please enter it.',
};

const success = {
    // register
    clickVerficationLink: 'We have sent a verification link to your email',

    logoutSuccessfull: 'You have successfully logged out.',
    successfullyLogin: 'You have successfully Logged in',
    resetPassword: 'Reset Password',
    recordData: 'Records updated',
    changePassword: 'Password changed successfully',
    channelAlreadySubscribed: 'Channel already  subscribed.',
    inviteSuccess: 'Invitation sent Successfully',
    channelAdminCreated: 'Channel Admin created Successfully',
    subscribedChannel: 'User subscribed Channel SuccessFully',
    unsubscribedChannel: 'User unsubscribed Channel SuccessFully',

    resetWebPassword: 'Please reset your password.',
    resetDeactivateUser: 'You have been deactivated. To activate again please reset password.',
};

module.exports = {
    error,
    success,
};
