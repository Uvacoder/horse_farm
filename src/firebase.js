import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

export const configFirebase = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATA_BASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BACKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSEAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

export const getFirebase = () => {
  return !firebase.apps.length
    ? firebase.initializeApp(configFirebase)
    : firebase.app();
};

const errorFirebaseAuthTranslationPL = {
  authwrongpassword: {
    input: 'password',
    message: 'Ups...błędne hasło spróbuj ponownie',
  },
  authtoomanyrequests: {
    input: 'password',
    message: 'Odpocznij zbyt wiele niepoprawnych logowań zapraszamy pózniej',
  },
  authusernotfound: {
    input: 'email',
    message: 'Jeszcze się nie znamy zapraszam do rejestracji',
  },
  authemailalreadyinuse: {
    input: 'email',
    message: 'Już się znamy zapraszam do logowania',
  },
  authunauthorizeddomain: {
    input: 'errorMessageSocialMedia',
    message: 'Ups... z tej domeny nie można się zalogować przez social media',
  },
  authpopupclosedbyuser: {
    input: 'errorMessageSocialMedia',
    message:
      'Ups... logowanie zostało przerwane przez zamknięcie okna social media',
  },
  authcancelledpopuprequest: {
    input: 'errorMessageSocialMedia',
    message:
      'Ups... logowanie zostało przerwane przez zamknięcie okna social media',
  },
};

const removeMinusAndSlash = (error) => {
  return error.replace(/[^a-zA-Z0-9]+/g, '');
};

export const signInSocialMedia = async (social) => {
  let provider;
  social === 'google' && (provider = new firebase.auth.GoogleAuthProvider());
  social === 'facebook' &&
    (provider = new firebase.auth.FacebookAuthProvider());
  await firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {
      const token = result.credential;
      const user = result.user;
      console.log('result socila media', result);
      // social === 'google' && console.log('LoginByGoogle', token, user);
      // social === 'facebook' && console.log('LoginByFacebook', token, user);
      firebase
        .auth()
        .currentUser.getIdToken(true)
        .then((idToken) => {
          // console.log('idToken :>> ', idToken);
        })
        .catch((error) => {
          // console.log('error :>> ', error);
        });
      return user;
    })
    .catch(function (error) {
      // social === 'google' && console.log('Error LoginByGoogle');
      // social === 'facebook' && console.log('Error LoginByFacebook');
      console.error(error);
      throw (
        errorFirebaseAuthTranslationPL[removeMinusAndSlash(error.code)] || {
          input: 'errorMessageSocialMedia',
          message: error.message,
        }
      );
    });
};

export const signInEmailPassword = async (values) => {
  let dataBackFromFirebase = await firebase
    .auth()
    .signInWithEmailAndPassword(values.email, values.password)
    .then((result) => {
      !result.user.emailVerified && sendVerificationEmail();
      return result;
      // console.log('user :>> ', user);
    })
    .catch(async (err) => {
      // console.log('err :>> ', err);
      throw (
        errorFirebaseAuthTranslationPL[removeMinusAndSlash(err.code)] || {
          input: 'email',
          message: err.message,
        }
      );
    });
  return dataBackFromFirebase;
};

export const signUpEmailPassword = async (values) => {
  const dataFromFirebase = await firebase
    .auth()
    .createUserWithEmailAndPassword(values.email, values.password)
    .then((user) => {
      return user;
    })
    .catch((err) => {
      throw (
        errorFirebaseAuthTranslationPL[removeMinusAndSlash(err.code)] || {
          input: 'email',
          message: err.message,
        }
      );
    });
  return dataFromFirebase;
};

export const sendEmailToResetPassword = async (email) => {
  const dataFromFirebase = await firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then((user) => {
      return user;
    })
    .catch((err) => {
      //   console.log('err', err);
      throw (
        errorFirebaseAuthTranslationPL[removeMinusAndSlash(err.code)] || {
          input: 'email',
          message: err.message,
        }
      );
    });
  return dataFromFirebase;
};

export const sendVerificationEmail = () => {
  const user = firebase.auth().currentUser;

  user
    .sendEmailVerification()
    .then(() => {
      // console.log('send email :>> ');
    })
    .catch((error) => {
      // console.log('error :>> ', error);
    });
};

export const getIdToken = () => {
  firebase
    .auth()
    .currentUser.getIdToken(true)
    .then((idToken) => {
      // console.log('idToken :>> ', idToken);
    })
    .catch((error) => {
      // console.log('error :>> ', error);
    });
};

export const getCurrentUser = () => {
  const userCurrent = firebase.auth().currentUser;
  userCurrent
    .sendEmailVerification()
    .then(() => {
      // console.log('send email :>> ');
    })
    .catch((error) => {
      // console.log('error :>> ', error);
    });
  console.log('userCurrent :>> ', userCurrent);
};

export const signOutFirebase = async () => {
  await firebase
    .auth()
    .signOut()
    .then((data) => {
      // console.log('firebaseLogOut :>> ', data);
      return data;
    })
    .catch((error) => {
      // console.warn('loguotFirebase error :>> ', error);
      throw error.code;
    });
};
