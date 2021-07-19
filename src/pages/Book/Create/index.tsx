/* eslint-disable jsx-a11y/alt-text */
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import BreadCrumb from '../../../components/BreadCrumb';
import Button from '../../../components/Button';
import InputCustom from '../../../components/Input';
import { Spinner } from '../../../components/Spinner/styles';
import SubHeader from '../../../components/SubHeader';
import api from '../../../services/api';
import { ApplicationState } from '../../../store';
import { createRequest, updateRequest } from '../../../store/ducks/books/actions';
import { Book } from '../../../store/ducks/books/types';
import { CardWrapper, Container } from './styles';

interface ParamTypes {
  id: string;
}

const Create: React.FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams<ParamTypes>();
  const {bookSelected} = useSelector((state: ApplicationState) => state.books);
  const nav = useHistory();

      
  const formik = useFormik({
    initialValues: {
      name: id? bookSelected.name: '',
      author: id? bookSelected.author: '',
      description: id? bookSelected.description: ''
    },

    onSubmit: async values => {

      if(id){
        const data = {
          id: bookSelected.id,
          name: values.name,
          author:values.author, 
          description:values.description,
          top: bookSelected.top || false,
          image_url: bookSelected.image_url || ''
        }
        formik.setSubmitting(true);
        dispatch(updateRequest(data as Book))
        formik.setSubmitting(false);
        nav.push('/app/books')
      }else{
        const data = {
          name: values.name,
          author:values.author, 
          description:values.description
        }
        formik.setSubmitting(true);
        dispatch(createRequest(data as Book))
        formik.setSubmitting(false);
        nav.push('/app/books')
      }


    },
    validate: values => {
      
      const errors: any = {};

      if (!values.description || values.description.trim()==='' ) {
        errors.description = '*Campo descrição vazio ou inválido';
      }

      else if (!(values.name) || values.description.trim()==='') {
        errors.name = '*Campo nome vazio ou inválido';
      }

      else if (!(values.author) || values.description.trim()==='') {
        errors.author = '*Campo autor vazio ou inválido';
      }

      return errors;
    },
  });


  
 return (
   <>
    <SubHeader>
    <BreadCrumb
          items={[
            { text: 'Home', to: '/app' }
          ]}
          itemActual={{
            text: 'Cadastro',
            to: '/app/books/new',
          }}
          isNext
        />
    </SubHeader>
   <Container>

      <CardWrapper>

        <h1>{id? 'EDITAR LIVRO' : 'CADASTRAR LIVRO'}</h1>
        <form onSubmit={formik.handleSubmit} >
        <InputCustom name='name' label='Nome' value={formik.values.name} placeholder='NOME' onChange={formik.handleChange} error={Boolean(formik.errors.name)} helperText={formik.errors.name} defaultValue={bookSelected.name || ''}/>
        <InputCustom name='author' label='Autor' value={formik.values.author} placeholder='AUTOR' onChange={formik.handleChange} error={Boolean(formik.errors.author)} helperText={formik.errors.author} defaultValue={bookSelected.author || ''}/>
        <InputCustom  name='description' label='Descrição' value={formik.values.description} placeholder='DESCRIÇÃO' onChange={formik.handleChange} error={Boolean(formik.errors.description)} helperText={formik.errors.description} multiline
          rows={4}
          defaultValue={bookSelected.description || ''}/>
        <Button color='primary' disabled={!(formik.isValid && formik.dirty && !formik.isSubmitting)}>
          {formik.isSubmitting ? <Spinner /> : 'Cadastrar'}
        </Button>
        </form>
      </CardWrapper>
   </Container>
   </>
   
 );
};

export default Create;