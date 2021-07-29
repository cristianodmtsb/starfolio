import Switch from '../Switch';
/* 
<Switch key={status}>
  <Case  case="1" component={C1}/>
  <Case  case="2" component={C2}/>
  <Case  case="3" component={C3}/>
</Switch>
 */

const INITIAL_STATE = { token: null, email: null };

const login = (payload, state) => {
  return {
    ...state,
    token: payload.token,
    email: payload.email,
  };
};

const logOut = (payload, state, initialState) => ({
  ...state,
  ...initialState,
});

describe('Switch', () => {
  describe('CONTEXT: Simulate a reducer', () => {
    describe('When dispatch login action', () => {
      const type = 'LOGIN';
      let payload = { email: 'joao@email.com', token: '12345' };
      let state = { ...INITIAL_STATE, error: false };
      let newState;

      beforeEach(() => {
        newState = Switch.to(type, payload, state, INITIAL_STATE)
          .case('LOGIN', login)
          .case('LOGOUT', logOut)
          .default(state);
      });

      it('should update state aftr login ', () => {
        expect(newState).toEqual({
          error: false,
          email: 'joao@email.com',
          token: '12345',
        });
      });
    });

    describe('When dispatch logout action', () => {
      const type = 'LOGOUT';
      let payload = { email: 'joao@email.com', token: '12345' };
      let state = { ...INITIAL_STATE };
      let newState;

      beforeEach(() => {
        newState = Switch.to(type, payload, state, INITIAL_STATE)
          .case('LOGIN', login)
          .case('LOGOUT', logOut)
          .default(state);
      });

      it('should return the initial state after logout', () => {
        expect(newState).toEqual(INITIAL_STATE);
      });
    });

    describe('When dispatch an not cased action', () => {
      const type = 'ANY';
      let payload = { email: 'joao@email.com', token: '12345' };
      let state = { ...INITIAL_STATE, msg: 'call default' };
      let newState;

      beforeEach(() => {
        newState = Switch.to(type, payload, state, INITIAL_STATE)
          .case('LOGIN', login)
          .case('LOGOUT', logOut)
          .default(state);
      });

      it('should return the current state to an default case', () => {
        expect(newState).toEqual(state);
      });
    });
  });
});

/*  
VERSION 1


const reducer1 = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return {
        ...state,
        isLogged: false,
        isLogginIn: true,
        hasTokenValidationFailed: false,
      };

    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isLogginIn: false,
        isLogged: true,
        hasTokenValidationFailed: false,
        error: { ...initialState.error },
      };

    case 'LOGIN_FAILURE':
      return {
        ...state,
        isLogginIn: false,
        isLogged: false,
        token: '',
        hasTokenValidationFailed: true,
        error: { msg: 'Ops! Dados Incorretos', hasError: true },
      };

    case 'VALIDATE_TOKEN_REQUEST':
      return {
        ...state,
        isValidatingToken: true,
        hasTokenValidationFailed: false,
      };

    case 'VALIDATE_TOKEN_SUCCESS':
      return {
        ...state,
        token: action.payload.access,
        refreshToken: action.payload.refresh,
        isValidatingToken: false,
        isLogged: true,
        hasTokenValidationFailed: false,
        error: { ...INITIAL_STATE.error },
      };

    case 'VALIDATE_TOKEN_FAILURE':
      return {
        ...state,
        isValidatingToken: false,
        isLogginIn: false,
        isLogged: false,
        token: '',
        hasTokenValidationFailed: true,
        error: { msg: 'error', hasError: true },
      };

    default:
      return state;
  }
};

*/

/* 
VERSON 2

const reducer2 = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return login.loginRequest(state);

    case 'LOGIN_SUCCESS':
      return login.loginSuccess(state, action.payload, INITIAL_STATE);

    case 'LOGIN_FAILURE':
      return login.loginFailure(state, action.payload);

    case 'VALIDATE_TOKEN_REQUEST':
      return validateToken.validateTokenRequest(state);

    case 'VALIDATE_TOKEN_SUCCESS':
      return validateToken.validateTokenSuccess(
        state,
        action.payload,
        INITIAL_STATE
      );

    case 'VALIDATE_TOKEN_FAILURE':
      return validateToken.validateTokenFailure(state, action.payload);

    default:
      return state;
  }
};
*/

/* 
VERSION 3


const reducer = (state = INITIAL_STATE, action) => {
  return Switch.to(action.type, action.payload, state, INITIAL_STATE)
    .case('LOGIN_REQUEST', login.loginRequest)
    .case('LOGIN_SUCCESS', login.loginSuccess)
    .case('LOGIN_FAILURE', login.loginFailure)
    .case('VALIDATE_TOKEN_REQUEST', validateToken.validateTokenRequest)
    .case('VALIDATE_TOKEN_SUCCESS', validateToken.validateTokenSuccess)
    .case('VALIDATE_TOKEN_FAILURE', validateToken.validateTokenFailure)
    .default(state);
};

*/

/* 

VERSION 4

const reducer = (state = INITIAL_STATE, {type, payload}) => {
  return Switch.to(type, payload, state, INITIAL_STATE)
    .case('LOGIN_REQUEST', login.loginRequest)
    .case('LOGIN_SUCCESS', login.loginSuccess)
    .case('LOGIN_FAILURE', login.loginFailure)
    .case('VALIDATE_TOKEN_REQUEST', validateToken.validateTokenRequest)
    .case('VALIDATE_TOKEN_SUCCESS', validateToken.validateTokenSuccess)
    .case('VALIDATE_TOKEN_FAILURE', validateToken.validateTokenFailure)
    .default(state);
};

*/
