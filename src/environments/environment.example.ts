export const environment = {
    production: false,
    officeRestApi: {
        authEndpoint: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize?',
        redirectUrl: 'http://localhost:4200',
        appName: 'appName',
        appId: 'appId',
        publicKey: 'publicKey',
        scopes: 'openid profile User.Read Mail.ReadWrite Calendars.ReadWrite'
    }
};
