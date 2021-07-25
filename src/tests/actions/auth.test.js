import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  login,
  logout,
  startLoginEmailPassword,
  startLogout,
} from '../../actions/auth';
import { types } from '../../types/types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {};

let store = mockStore(initState);

describe('Pruebas con las acciones de Auth', () => {
  beforeEach(() => {
    store = mockStore(initState);
  });

  test('login y logout deben crear la acción respectiva', () => {
    const loginAction = login('TESTING', 'Samuel');

    const logoutAction = logout();

    expect(loginAction).toEqual({
      type: types.login,
      payload: { uid: 'TESTING', displayName: 'Samuel' },
    });

    expect(logoutAction).toEqual({ type: types.logout });
  });

  test('debe realizar el startLogout', async () => {
    await store.dispatch(startLogout());
    const actions = store.getActions();
    expect(actions[0]).toEqual({ type: types.logout });
    expect(actions[1]).toEqual({ type: types.notesLogoutCleaning });
  });

  test('debe de iniciar el startLoginEmailPassword', async () => {
    await store.dispatch(
      startLoginEmailPassword('test@testing.com', 'testing')
    );
    const actions = store.getActions();
    expect(actions[0]).toEqual({ type: types.uiStartLoading });

    expect(actions[1]).toEqual({
      type: types.login,
      payload: { uid: 'lmeLsXZ9nqTPRBZOmyoxRxLLCeI2', displayName: null },
    });

    expect(actions[2]).toEqual({ type: types.uiFinishLoading });
  });
});
