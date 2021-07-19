import React from 'react';
import FooterMain from './Footer/FooterMain';
import SideBar from './SideBar/SideBar';
import { Main, Wrapper } from './styles';


const Layout: React.FC = ({children}) => {

  return(
    <Wrapper>
        <SideBar/>
        <Main>
          {children}
        </Main>
        <FooterMain />
    </Wrapper>
  )
  ;
}

export default Layout;