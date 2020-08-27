import React from 'react';
import '../assets/styles/containers/Layout.scss';
import Menu from '../components/Menu/Menu';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

function Layout(props) {
  const { children } = props;
  return (
    <div className='layout'>
      <Menu />
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default Layout;
