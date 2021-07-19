import { InputAdornment, TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import { FaLock, FaLockOpen } from 'react-icons/fa';
import Button from '../../components/Button';
import InputCustom from '../../components/Input';
import Input from '../../components/Input';
import { Spinner } from '../../components/Spinner/styles';
import AuthContext from '../../contexts/auth';
import { Container, Transition, Wrapper } from './styles';

const Login: React.FC = () => {
    const {signIn} = useContext(AuthContext);
    const [type, setType] = useState('password')
    
    const formik = useFormik({
      initialValues: {
        email: '',
        password: '',
      },
      onSubmit: async values => {
        const user = {
          email:values.email, password:values.password
        }
        try {
          signIn(user)
          // notifySuccess('Especialidade cadastrada com sucesso!');
          formik.setSubmitting(false);
        } catch (error) {
          const message  = 'Oops algo deu errado';
          // notifyError(message);
          console.log(message);
          
          formik.setSubmitting(false);
        }
      },
      validate: values => {
        
        const errors: any = {};
  
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
          errors.email = '*Email Invalid';
        }
  
        if (!(values.password)) {
          errors.password = '*Required';
        }
  
        return errors;
      },
    });

 return (
   <Wrapper>
     <Transition>
     <Container>
       <h1>Login</h1>
      <form onSubmit={formik.handleSubmit} autoComplete="off">
      <InputCustom name='email' label="Email" type='email' value={formik.values.email} onChange={formik.handleChange} helperText={formik.errors.email } error={Boolean(formik.errors.email)}/>
      <InputCustom name='password' value={formik.values.password} label='Senha' type={type} onChange={formik.handleChange} helperText={formik.errors.password} error={Boolean(formik.errors.password)} InputProps={{
          endAdornment: (
            <InputAdornment position="start">
            {type==='text'? <FaLockOpen onClick={()=>setType('password')} />: (
              <FaLock onClick={()=>{setType('text')}}/>
            )}
            </InputAdornment>
          ),
        }}/>

      <Button className='btnDanger' color='primary' disabled={!(formik.isValid && formik.dirty && !formik.isSubmitting)}>
        {formik.isSubmitting ? <Spinner /> : 'Login'}
      </Button>
      </form>
     </Container>
     </Transition>

   </Wrapper>
 );
};

export default Login;