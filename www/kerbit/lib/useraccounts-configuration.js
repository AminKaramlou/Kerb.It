// Options
AccountsTemplates.configure({
    // defaultLayout: 'emptyLayout',
    showForgotPasswordLink: true,
    overrideLoginErrors: true,
    enablePasswordChange: true,

    sendVerificationEmail: true,
    enforceEmailVerification: false,
    confirmPassword: true,
    //continuousValidation: false,
    //displayFormLabels: true,
    //forbidClientAccountCreation: true,
    //formValidationFeedback: true,
    homeRoutePath: '/',
    //showAddRemoveServices: false,
    //showPlaceholders: true,
    reCaptcha: {
        siteKey: "6LfyASETAAAAAJa_HRtp_YNMDEkL3YpboY1CjJnn",
        theme: "light",
        data_type: "image"
    },
    showReCaptcha: true,
    showLabels: false,


    negativeValidation: true,
    positiveValidation: true,
    negativeFeedback: false,
    positiveFeedback: true,

    // Privacy Policy and Terms of Use
    //privacyUrl: 'privacy',
    //termsUrl: 'terms-of-use',

    // Texts
});



// Support username or password login
var pwd = AccountsTemplates.removeField('password');
AccountsTemplates.removeField('email');
AccountsTemplates.addFields([
    {
        _id: "username",
        type: "text",
        required: true,
        placeholder: "Username",
        re: /^(?=.*[a-zA-Z]+)(?=.*[\d]*)[a-zA-Z0-9]{1,15}$/,
        errStr: "Invalid username"
    },
    {
        _id: 'email',
        type: 'email',
        required: true,
        placeholder: "Email",
        re: /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i,
        errStr: "Invalid email"
    },
    {
        _id: 'username_and_email',
        type: 'text',
        required: true,
        placeholder: "Username or email"
    },
    {
        _id: 'password',
        type: 'password',
        required: true,
        minLength: 6,
        placeholder: "Password",
    },
    {
        _id: 'password_again',
        type: 'password',
        required: true,
        placeholder: "Confirm password"
    }
]);

// Default field overrides go here

// Added fields
AccountsTemplates.addFields([
    {
        _id: 'first_name',
        type: 'text',
        placeholder: "First name",
        minLength: 1,
        errStr: "First names must be at least one character long"
    },
    {
        _id: 'last_name',
        type: 'text',
        placeholder: "Last Name"

    },
    {
        _id: 'postcode',
        type: 'text',
        placeholder: "Postcode",
        re: /^(([gG][iI][rR] {0,}0[aA]{2})|((([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y]?[0-9][0-9]?)|(([a-pr-uwyzA-PR-UWYZ][0-9][a-hjkstuwA-HJKSTUW])|([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y][0-9][abehmnprv-yABEHMNPRV-Y]))) {0,}[0-9][abd-hjlnp-uw-zABD-HJLNP-UW-Z]{2}))$/,
        errStr: 'Invalid postcode'
    },
    {
        _id: 'telephone',
        type: 'tel',
        placeholder: "Telephone number",
        re: /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/g,
        errStr: 'Invalid telephone number'
    },
    {
        _id: 'isDriver',
        type: 'checkbox',
        displayName: "Register as Driver",
    }
]);
