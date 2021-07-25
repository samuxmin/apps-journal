import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { activeNote } from '../../../actions/notes';
import { NoteScreen } from '../../../components/notes/NoteScreen';

jest.mock('../../../actions/notes', () => ({
  activeNote: jest.fn(),
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
    active: { id: '123abc', title: 'Test title', body: 'Note body', date: 0 },
  },
};
let store = mockStore(initState);
store.dispatch = jest.fn();

describe('Pruebas en <NoteScreen />', () => {
  const wrapper = mount(
    <Provider store={store}>
      <NoteScreen />
    </Provider>
  );
  test('debe de mostrarse correctamente', () => {
    expect(wrapper).toMatchSnapshot();
  });
  test('debe de disparar el activeNote', () => {
    wrapper.find('input[name="title"]').simulate('change', {
      target: {
        name: 'title',
        value: 'hola mundo',
      },
    });
    expect(activeNote).toHaveBeenCalledWith('123abc', {
      id: '123abc',
      title: 'hola mundo',
      body: 'Note body',
      date: 0,
    });
  });
});
