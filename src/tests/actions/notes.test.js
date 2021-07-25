/**
 * @jest-environment node
 */
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  startLoadingNotes,
  startNewNote,
  startSaveNote,
  startUploading,
} from '../../actions/notes';
import { db } from '../../firebase/firebase-config';
import { types } from '../../types/types';

jest.mock('../../helpers/fileUpload', () => {
  return {
    fileUpload: () => {
      return Promise.resolve('https://imagenxd.com/img.jpg');
    },
  };
});

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {
    uid: 'TESTING',
  },
  notes: {
    active: {
      id: 'JOg0fdRPxkvt8GDMSoQt',
      title: 'Hola',
      body: 'Mundo',
    },
  },
};
let store = mockStore(initState);

describe('Pruebas en notes actions', () => {
  beforeEach(() => {
    store = mockStore(initState);
  });

  test('debe de crear una nueva nota startNewNote', async () => {
    await store.dispatch(startNewNote());
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.notesActive,
      payload: {
        id: expect.any(String),
        title: '',
        body: '',
        date: expect.any(Number),
      },
    });

    expect(actions[1]).toEqual({
      type: types.notesAddNew,
      payload: {
        id: expect.any(String),
        title: '',
        body: '',
        date: expect.any(Number),
      },
    });
    const docId = actions[0].payload.id;
    await db.doc(`TESTING/journal/notes/${docId}`).delete();
  });

  test('startLoadingNotes debe cargar correctamente', async () => {
    await store.dispatch(startLoadingNotes('TESTING'));
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: '[Notes] Load note',
      payload: [
        {
          body: 'Mundo',
          date: 1626919125198,
          id: 'JOg0fdRPxkvt8GDMSoQt',
          title: 'Hola',
          url: 'https://imagenxd.com/img.jpg',
        },
        {
          body: '',
          date: 1626919204902,
          id: 'qR0w4xzR92sqDUMdLn38',
          title: '',
        },
      ],
    });
  });

  test('startSaveNote debe actualizar la nota', async () => {
    jest.setTimeout(10000);
    const note = {
      id: 'JOg0fdRPxkvt8GDMSoQt',
      title: 'title',
      body: 'body',
    };
    await store.dispatch(startSaveNote(note));
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.notesUpdated,
      payload: {
        id: 'JOg0fdRPxkvt8GDMSoQt',
        note,
      },
    });
    const docRef = await db.doc(`TESTING/journal/notes/${note.id}`).get();
    expect(docRef.data().title).toBe(note.title);
  });

  test('startUploading debe de actualizar el url del entry', async () => {
    const file = [];
    await store.dispatch(startUploading(file));
    const docRef = await db
      .doc('TESTING/journal/notes/JOg0fdRPxkvt8GDMSoQt')
      .get();
    expect(docRef.data().url).toBe('https://imagenxd.com/img.jpg');
  });
});
