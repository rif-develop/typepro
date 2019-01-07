import firebase from 'firebase';
import firebaseui from 'firebaseui'

export const FirebaseAuthComponent = function (elementId) {
    const config = {
        apiKey: process.env.FIRE_BASE_API_KEY || 'AIzaSyC3AbZq8FIEyD5EsU2aIHamtR7FmcdnFAU',
        authDomain: "littleone-mylo.firebaseapp.com",
        databaseURL: "https://littleone-mylo.firebaseio.com",
        projectId: "littleone-mylo",
        storageBucket: "littleone-mylo.appspot.com",
        messagingSenderId: "178974824889"
    };

    const uiConfig = {
        callbacks: {
            signInSuccessWithAuthResult: function (authResult, redirectUrl) {
                /*인증 성공시 구글이 반환해주는 값들*/
                let user = authResult.user;
                let credential = authResult.credential;
                let isNewUser = authResult.additionalUserInfo.isNewUser;
                let providerId = authResult.additionalUserInfo.providerId;
                let operationType = authResult.operationType;

                console.log(user, credential, isNewUser, providerId, operationType);
                console.log(authResult);
                console.log(authResult.user.phoneNumber);
                document.getElementById('auth-phone-component').value = authResult.user.phoneNumber;
                // return true
            },
            signInFailure: function (error) {
                return handleUIError(error);
            },
            uiShown: function () {
                // The widget is rendered.
                // Hide the loader.
            }
        },
        credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM,
        // Query parameter name for mode.
        queryParameterForWidgetMode: 'mode',
        // Query parameter name for sign in success url.
        queryParameterForSignInSuccessUrl: 'signInSuccessUrl',
        // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
        signInFlow: 'popup',
        signInSuccessUrl: '/success.html',
        signInOptions: [
            // Leave the lines as is for the providers you want to offer your users.
            // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
            // firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
            // {
            //     provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
            //     // Whether the display name should be displayed in the Sign Up page.
            //     requireDisplayName: true
            // },
            {
                provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
                // Invisible reCAPTCHA with image challenge and bottom left badge.
                recaptchaParameters: {
                    type: 'image',
                    size: 'invisible',
                    badge: 'bottomright'
                },
                defaultCountry: 'KR',
                defaultNationalNumber: ' ',
                loginHint: '+11234567890',
                whitelistedCountries: ["US", "GB", "CA", "AU", "SG", "HK", "JP", "CN", "TW", "KR"]
                // blacklistedCountries: []
            },
        ],
        tosUrl: '/termsofuse',
        privacyPolicyUrl: function () {
            window.location.assign('/privacypolicy');
        }
    };
    firebase.initializeApp(config);

    const ui = new firebaseui.auth.AuthUI(firebase.auth());

    ui.start(elementId, uiConfig);
    elementId.style.position = 'fixed';
    elementId.style.zIndex = '11';
    elementId.style.width = '360px';
    elementId.style.maxWidth = '100%';
};