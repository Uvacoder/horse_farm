import { Story, Meta } from '@storybook/react';
import { IUserInitialState } from '../../redux/reducers/userReducer';
import { IUser } from '../../models/users';
import { combineReducers, createStore } from 'redux';
import { createBrowserHistory } from 'history';
import userReducer from '../../redux/reducers/userReducer';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/core';
import { theme } from '../../utility/materialui';
import SingUpUser from './SignUp';

// jest.mock('./../../shared/userHelpers');

// jest.mock('intervalGetEmailConfirmStatus')
const userExample: Partial<IUser> = {
  // email: `example@goo.com`,
  // emailVerified: true,
  // providerId: `google.com`,
  // uid: `123456789qazwsx`,
  // id: '1111111111111',
  // firstName: `john`,
  // lastName: `doe`,
  // phone: `123123123`,
  // nick: `jd`,
  // photoId: `https://pbs.twimg.com/profile_images/1257280933557710850/95taFO3E_400x400.jpg`
}

const initialUserExample: IUserInitialState = {
  user: userExample,
  isLoading: false,
  isError: false,
  errorMessage: null,
  idToken: `null`
}

const reducerUser = combineReducers({ userAction: userReducer });

const state = {
  userAction: initialUserExample
}

const store = createStore(reducerUser, state)

const customHistory = createBrowserHistory();


export default {
  title: 'Modals/SingUpUser',
  component: SingUpUser,
  decorators: [
  ]

} as Meta;

const emptyVoid = () => { }

const PrimaryProfile: Story = (args) => (
  <Provider store={store} >
    <ThemeProvider theme={theme}>
      <Router history={customHistory}>
        <SingUpUser
          loginModalToggle={emptyVoid}
          setSinginModalShow={emptyVoid}
          signinModalToggle={emptyVoid}
        />
      </Router>
    </ThemeProvider>
  </Provider>
)
export const Singu = PrimaryProfile.bind({})
Singu.args = {
}

Singu.storyName = 'Singup user no user';

