import DeleteSweepOutlinedIcon from '@material-ui/icons/DeleteSweepOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import BreadCrumb from '../../../components/BreadCrumb';
import Button from '../../../components/Button';
import SubHeader from '../../../components/SubHeader';
import Table from '../../../components/Table';
import { ApplicationState } from '../../../store';
import { loadRequest, setValue } from '../../../store/ducks/books/actions';
import { Book } from '../../../store/ducks/books/types';
import Delete from '../Delete';
import { CardWrapper } from './styles';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const nav = useHistory();
  const {data, error, loading} = useSelector((state: ApplicationState) => state.books); 
  
  useEffect(() => {
    dispatch(loadRequest())
  }, []);

  const handleDelete = (book: Book)=>{
    dispatch(setValue({showModalDelete: true, bookSelected: book}));
  }


  const handleEdit = (book: Book)=>{

    dispatch(setValue({ bookSelected: book}));
    nav.push(`books/update/${book.id}`)
  }
 return (
   <>
  <SubHeader>
    <BreadCrumb
          items={[
            { text: 'Home', to: '/app' }
          ]}
          itemActual={{
            text: 'Livros',
            to: '/app/books',
          }}
          isNext
        />
    </SubHeader>
    <CardWrapper>
   <Table
      title="Livros"
      titleButton="CADASTRAR NOVO LIVRO"
      noData="Oops, Algo Errado"
      dataImport={data}
      loading={loading}
      columns={[
        { Header: 'Nome', accessor: 'name' },
        { Header: 'Autor', accessor: 'author' },
        { Header: 'Descrição', accessor: 'description' },
        {
          Header: 'Ações',
          cell: (book) => {
            return (
              <div>
                <Button
                  color="secondary"
                  onClick={() => handleEdit(book as Book)}
                >
                  <EditOutlinedIcon />
                  Editar
                </Button>
                <Button
                  color="primary"
                  onClick={() => handleDelete(book as Book)}
                >
                  <DeleteSweepOutlinedIcon />
                  Excluir
                </Button>
              </div>
            );
          },
        },
      ]}
      link="books/new"
    />
    </CardWrapper>
    <Delete/>
   </>
   
 );
};

export default Home;