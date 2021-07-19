import { Modal } from '../../../components/Modal';
import React from 'react';
import { ApplicationState } from '../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { deleteRequest, setValue } from '../../../store/ducks/books/actions';

// import { Container } from './styles';

const Delete: React.FC = () => {
    const dispatch = useDispatch();
    const {bookSelected, showModalDelete, error} = useSelector((state: ApplicationState) => state.books);
    if(bookSelected === null) return null;
    const handleDelete = ()=>{
        dispatch(deleteRequest(bookSelected.id))
        handleClose()
    }

    const handleClose = ()=>{
        dispatch(setValue({showModalDelete: false}))
    }
  return (
      <Modal
        modalTitle="Deletar Livro"
        buttonTitle="Confirmar"
        buttonColor="primary"
        show={showModalDelete}
        setShow={handleClose}
        setConfirm={handleDelete}
      >
          <p>{bookSelected.name}</p>
      </Modal>
  );
}

export default Delete;