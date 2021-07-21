import { removeError, setError, uiFinishLoading, uiStartLoading } from '../../actions/ui';
import { types } from '../../types/types';

describe('Pruebas en ui-action', () => {
  test('todas las acciones deben de funcionar', () => {
    const action = setError('404 :vv');
    expect(action).toEqual({
      type: types.uiSetError,
      payload: '404 :vv',
    });

    const removeErrorAction =  removeError()
    const uiStartLoadingAction =  uiStartLoading()  
    const uiFinishLoadingAction = uiFinishLoading()
  

expect(removeErrorAction).toEqual({
    type:types.uiRemoveError
})
expect(uiStartLoadingAction).toEqual({
    type:types.uiStartLoading
})
expect(uiFinishLoadingAction).toEqual({
    type:types.uiFinishLoading
})    
  });
});
