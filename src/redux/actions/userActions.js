import {
  USER_CREATE_REQUEST,
  USER_CREATE_FAILED,
  USER_CREATE_SUCCESS,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_FAILED,
  USER_SIGNIN_SUCCESS,
  USER_RELOAD_REQUEST,
  USER_RELOAD_FAILED,
  USER_RELOAD_SUCCESS,
  USER_LOGUOT_REQUEST,
  USER_LOGUOT_FAILED,
  USER_LOGUOT_SUCCESS,
  USER_RESET_PASSWORD_REQUEST,
  USER_RESET_PASSWORD_FAILED,
  USER_RESET_PASSWORD_SUCCESS,
  VERIFICATION_EMAIL_SEND_REQUEST,
  VERIFICATION_EMAIL_SEND_FAILED,
  VERIFICATION_EMAIL_SEND_SUCCESS,
  LOAD_CONFIRM_EMAIL_STATE_REQUEST,
  LOAD_CONFIRM_EMAIL_STATE_SUCCESS,
  LOAD_CONFIRM_EMAIL_STATE_FAILED,
  SAVE_EDITED_USER_DATA_REQUEST,
  SAVE_EDITED_USER_DATA_FAILED,
  SAVE_EDITED_USER_DATA_SUCCESS,
  USER_UPDATE_OWN_DATA,
  USER_COOKE_TOKEN_REMOVE,
} from '../constans/userConstans';
import {
  getIdToken,
  signInEmailPassword,
  signInSocialMedia,
  signOutFirebase,
  createUserEmailPassword,
  reloadUserAuth,
  sendEmailToResetPassword,
  sendVerificationEmail,
} from '../../firebase';
import { httpRequest } from '../../utility/httpRequest';
import Cookies from 'universal-cookie';

export const userSignInByEmailAction = (values, setErrors, resetForm) => async (
  dispatch
) => {
  try {
    dispatch({
      type: USER_SIGNIN_REQUEST,
      payload: { provider: 'email' },
    });

    const userAuth = await signInEmailPassword(values);
    const { additionalUserInfo, user } = userAuth;

    const idToken = await getIdToken();

    dispatch({
      type: USER_SIGNIN_SUCCESS,
      payload: {
        user: {
          isNewUser: additionalUserInfo.isNewUser,
          providerId: additionalUserInfo.providerId,
          email: user.email,
          emailVerified: user.emailVerified,
          uid: user.uid,
        },
        idToken: idToken,
      },
    });

    resetForm();
  } catch (error) {
    setErrors(
      { [error.input]: [error.message] } || {
        input: 'errorMessageSocialMedia',
        message: error.message,
      }
    );
    dispatch({
      type: USER_SIGNIN_FAILED,
      payload: { user: {}, error: error.message },
    });
  }
};

export const userSignInSocilaMedialAction = (values) => async (dispatch) => {
  try {
    dispatch({
      type: USER_SIGNIN_REQUEST,
      payload: { provider: values },
    });

    const uesrAuth = await signInSocialMedia(values);
    const {
      additionalUserInfo,
      // credential,
      // operationType,
      user,
    } = uesrAuth;
    const idToken = await getIdToken();

    switch (additionalUserInfo.providerId) {
      case 'google.com':
        dispatch({
          type: USER_SIGNIN_SUCCESS,
          payload: {
            user: {
              isNewUser: additionalUserInfo.isNewUser,
              providerId: additionalUserInfo.providerId,
              email: additionalUserInfo.profile.email,
              firstName: additionalUserInfo.profile.family_name,
              lastName: additionalUserInfo.profile.given_name,
              name: additionalUserInfo.profile.name,
              emailVerified: user.emailVerified,
              photoId: additionalUserInfo.profile.picture,
              uid: user.uid,
            },
            idToken: idToken,
          },
        });
        break;
      case 'facebook.com':
        dispatch({
          type: USER_SIGNIN_SUCCESS,
          payload: {
            user: {
              isNewUser: additionalUserInfo.isNewUser,
              providerId: additionalUserInfo.providerId,
              email: additionalUserInfo.profile.email,
              firstName: additionalUserInfo.profile.first_name,
              lastName: additionalUserInfo.profile.last_name,
              name: additionalUserInfo.profile.name,
              emailVerified: user.emailVerified,
              uid: user.uid,
              photoId: additionalUserInfo.profile.picture.data.url,
            },
            idToken: idToken,
          },
        });
        break;

      default:
        break;
    }
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAILED,
      payload: {
        errorMessage: error.message,
      },
    });
  }
};
export const createUserByEmialPasswordAction = (
  values,
  setErrors,
  resetForm
) => async (dispatch) => {
  try {
    dispatch({
      type: USER_CREATE_REQUEST,
    });

    const userAuth = await createUserEmailPassword(values);
    const { additionalUserInfo, user } = userAuth;
    const idToken = await getIdToken();
    dispatch({
      type: USER_CREATE_SUCCESS,
      payload: {
        user: {
          isNewUser: additionalUserInfo.isNewUser,
          providerId: additionalUserInfo.providerId,
          email: user.email,
          emailVerified: user.emailVerified,
          uid: user.uid,
        },
        idToken: idToken,
      },
    });
  } catch (error) {
    setErrors({ [error.input]: [error.message] });
    dispatch({
      type: USER_CREATE_FAILED,
      payload: error,
    });
  }
};

export const seveEditedUserDataAction = (values, userParam) => async (
  dispach
) => {
  console.log("<- LOG -> file: userActions.js -> line 191 -> userParam", userParam)
  console.log("<- LOG -> file: userActions.js -> line 191 -> values", values)

  const user = {
    id: userParam.id,
    email: values.email,
    firstName: values.firstName,
    lastName: values.lastName,
    nick: values.nick,
    phone: values.phone,
    uid: userParam.uid,
    providerId: userParam.providerId,
    emailVerified: userParam.emailVerified,
    opinion: values.opinion,
  };
  dispach({
    type: SAVE_EDITED_USER_DATA_REQUEST,
    payload: {},
  });
  try {
    const data = await httpRequest('user/updateEditedData', 'patch', user);
    const dataUser = await data.user;
    console.log('data Action ', data);
    console.log('re', dataUser);
    dispach({
      type: SAVE_EDITED_USER_DATA_SUCCESS,
      payload: dataUser,
    });
  } catch (error) {
    console.log('error', error);
    dispach({
      type: SAVE_EDITED_USER_DATA_FAILED,
      payload: error,
    });
  }
};

export const sendEmailToResetPasswordAction = (
  values,
  setResetPasswordModalShow,
  setErrors,
  resetForm
) => async (dispach) => {
  try {
    dispach({
      type: USER_RESET_PASSWORD_REQUEST,
      payload: {
        loading: true,
        error: false,
      },
    });
    await sendEmailToResetPassword(values.email);
    dispach({
      type: USER_RESET_PASSWORD_SUCCESS,
      payload: {
        loading: false,
        error: false,
        Message: 'send email to reset password',
      },
    });
    resetForm();
    setResetPasswordModalShow(false);
  } catch (error) {
    setErrors({ [error.input]: [error.message] });
    dispach({
      type: USER_RESET_PASSWORD_FAILED,
      payload: {
        loading: false,
        error: true,
        errorMessage: error.message,
      },
    });
  }
};

export const sendVerificationEmailAction = () => async (dispach) => {
  try {
    dispach({ type: VERIFICATION_EMAIL_SEND_REQUEST });
    await sendVerificationEmail();
    dispach({ type: VERIFICATION_EMAIL_SEND_SUCCESS });
  } catch (error) {
    dispach({ type: VERIFICATION_EMAIL_SEND_FAILED, payload: error.message });
  }
};

export const reloadUserAuthDataAction = () => async (dispatch) => {
  try {
    dispatch({ type: USER_RELOAD_REQUEST });
    const reloadUser = await reloadUserAuth();
    dispatch({
      type: USER_RELOAD_SUCCESS,
      payload: reloadUser,
    });
  } catch (error) {
    dispatch({
      type: USER_RELOAD_FAILED,
      payload: error,
    });
  }
};
export const reloadConfirmEmalStateAction = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_CONFIRM_EMAIL_STATE_REQUEST });
    const reloadUser = await reloadUserAuth();
    dispatch({
      type: LOAD_CONFIRM_EMAIL_STATE_SUCCESS,
      payload: reloadUser.emailVerified,
    });
  } catch (error) {
    dispatch({
      type: LOAD_CONFIRM_EMAIL_STATE_FAILED,
      payload: error,
    });
  }
};

export const updataOwnDataUserAction = (user) => (dispatch) => {
  dispatch({
    type: USER_UPDATE_OWN_DATA,
    payload: user,
  });
};
export const userRemoveCookieTokenAction = (dispatch) => {
  const cookies = new Cookies();
  cookies.remove('idToken', {
    path: '/',
  })
  dispatch({
    type: USER_COOKE_TOKEN_REMOVE
  })
}

export const userSignOutAction = async (dispatch) => {
  try {
    dispatch({ type: USER_LOGUOT_REQUEST });

    await signOutFirebase();
    dispatch({
      type: USER_LOGUOT_SUCCESS,
    });
  } catch (error) {
    dispatch({ type: USER_LOGUOT_FAILED, payload: error.errorMessage });
  }
};
