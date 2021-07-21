import { authReducer } from '../../reducers/authReducer';
import { types } from '../../types/types';

describe('Pruebas en el authReducer', () => {
  const user = {
    uid: '123abc',
    displayName: 'Samuel',
  };

  test('Debe de logear correctamente', () => {
    const action = {
      type: types.login,
      payload: user,
    };

    const state = authReducer({}, action);

    expect(state).toEqual({
      name: 'Samuel',
      uid: '123abc',
    });
  });

  test('debe de deslogear correctamente', () => {
    const action = {
      type: types.logout,
    };
    const state = authReducer(user, action);
    expect(state).toEqual({});
  });

  test('si no se reconoce el tipo debe retornar un estado por defecto', () => {
    const state = authReducer(user, { type: 'omegalol' });
    expect(state).toEqual(user);
  });
});
