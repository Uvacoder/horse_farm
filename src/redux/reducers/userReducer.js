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
  USER_RESET_PASSWORD_SUCCESS,
  USER_RESET_PASSWORD_FAILED,
  USER_VERIFICATION_EMAIL_REQUEST,
  USER_VERIFICATION_EMAIL_SUCCESS,
  USER_VERIFICATION_EMAIL_FAILED,
} from '../constans/userConstans';

const initialState = {
  user: {},
  loading: false,
  error: false,
  errorMessage: '',
  idToken: null,
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_CREATE_REQUEST:
      return { ...state, ...payload };
    case USER_CREATE_FAILED:
      return { ...state, ...payload };
    case USER_CREATE_SUCCESS:
      return { ...state, ...payload };

    case USER_SIGNIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        user: {},
        errorMessage: '',
        provider: payload.provider,
        idToken: false,
      };
    case USER_SIGNIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        errorMessage: '',
        user: payload.user,
        idToken: payload.idToken,
      };
    case USER_SIGNIN_FAILED:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: payload.errorMessage,
        idToken: '',
        user: {},
      };
    case USER_RELOAD_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case USER_RELOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        user: {
          isNewUser: payload.isNewUser,
          providerId: payload.providerData[0].providerId,
          email: payload.email,
          uid: payload.uid,
          emailVerified: payload.emailVerified,
        },
        // idToken:
      };
    case USER_RELOAD_FAILED:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: payload.errorMessage,
        // user: {},
        idToken: null,
      };
    case USER_RESET_PASSWORD_REQUEST:
      return { ...state, ...payload };
    case USER_RESET_PASSWORD_SUCCESS:
      return { ...state, ...payload };
    case USER_RESET_PASSWORD_FAILED:
      return { ...state, ...payload };

    case USER_VERIFICATION_EMAIL_REQUEST:
      return { ...state, loading: true, error: false };
    case USER_VERIFICATION_EMAIL_SUCCESS:
      return { ...state, loading: false, error: false };
    case USER_VERIFICATION_EMAIL_FAILED:
      return { ...state, loading: false, error: true, errorMessage: payload };

    case USER_LOGUOT_REQUEST:
      return { ...state, ...payload };
    case USER_LOGUOT_FAILED:
      return { ...state, ...payload };
    case USER_LOGUOT_SUCCESS:
      return {
        loading: false,
        error: false,
        errorMessage: '',
        idToken: null,
        user: {},
      };

    default:
      return state;
  }
};

export default userReducer;