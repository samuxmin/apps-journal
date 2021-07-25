import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { Sidebar } from '../../../components/journal/Sidebar';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startLogout } from '../../../actions/auth';
import { startNewNote } from '../../../actions/notes';

jest.mock('../../../actions/auth', () => ({
  startLogout: jest.fn(),
}));
jest.mock('../../../actions/notes', () => ({
  startNewNote: jest.fn(),
}));
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {
  auth: {
    uid: '123abc',
    name: 'samuel',
  },
  ui: {
    loading: false,
    msgError: null,
  },
  notes: {
    notes: [],
    active: null,
  },
};
let store = mockStore(initState);
store.dispatch = jest.fn();

describe('Pruebas en <Sidebar />', () => {
  const wrapper = mount(
    <Provider store={store}>
      <Sidebar />
    </Provider>
  );
  test('debe de mostrarse correctamente', () => {
    expect(wrapper).toMatchSnapshot();
  });
  test('debe de llamar el logout', () => {
    wrapper.find('.btn').prop('onClick')();
    expect(startLogout).toHaveBeenCalled();
  });
  test('debe de llamar el startNewNote', () => {
    wrapper.find('.journal__new-entry').simulate('click');
    expect(startNewNote).toHaveBeenCalled();
  });
});
