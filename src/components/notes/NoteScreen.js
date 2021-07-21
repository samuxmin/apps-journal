import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activeNote, startDeleting } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar';

export const NoteScreen = () => {
  const { active: note } = useSelector((state) => state.notes);
  const [formValues, handleInputChange, reset] = useForm(note);

  const { body, title, id } = formValues;

  const activeId = useRef(note.id);

  useEffect(() => {
    if (note.id !== activeId.current) {
      reset(note);
      activeId.current = note.id;
    }
  }, [note, reset]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(activeNote(formValues.id, { ...formValues }));
  }, [dispatch, formValues]);

  const handleDelete = () => {
    dispatch(startDeleting(id));
  };

  return (
    <div className='notes__main-content'>
      <NotesAppBar />
      <div className='notes__content'>
        <input
          type='text'
          placeholder='Some awesome title'
          className='notes__title-input'
          autoComplete='off'
          name='title'
          value={title}
          onChange={handleInputChange}
        />
        <hr />
        <textarea
          placeholder='What happened today'
          className='notes__textarea'
          name='body'
          value={body}
          onChange={handleInputChange}
        ></textarea>
        {note.url && (
          <div className='notes__image'>
            <img src={note.url} alt='incendio' />
          </div>
        )}
      </div>
      {title.trim().toLowerCase() ===
        'arrebatao dando vuelta en la jeepeta' && (
        <lottie-player
          src='https://assets5.lottiefiles.com/packages/lf20_wlwdpk1w.json'
          background='transparent'
          speed='1'
          style={{ width: 500, height: 500 }}
          loop
          autoplay
        ></lottie-player>
      )}
      <button className='btn btn-danger' onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};
