import { types } from '../../types/types';

describe('Pruebas en types', () => {
  test('deben tener estos tipos', () => {
    expect(types).toEqual({
      login: '[Auth] Login',
      logout: '[Auth] Logout',

      uiSetError: '[UI] Set Error',
      uiRemoveError: '[UI] Remove Error',

      uiStartLoading: '[UI] Start loading',
      uiFinishLoading: '[UI] Finish loading',

      notesAddNew: '[Notes] New note',
      notesActive: '[Notes] Set active',
      notesLoad: '[Notes] Load note',
      notesUpdated: '[Notes] Updated note',
      notesFileUrl: '[Notes] Updated image url',
      notesDelete: '[Notes] Deleted note',
      notesLogoutCleaning: '[Notes] Logout cleaning',
    });
  });
});
