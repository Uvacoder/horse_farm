import React, { useState } from 'react';
import './App.css';
import Header from './components/Layout/Header';
import NavBar from './components/Layout/NavBar';
import Attractions from './components/Layout/Attractions';
import TitleSection from './components/Layout/TitleSection';
import Opinions from './components/Layout/Opinions';
import Contact from './components/Layout/Contact';
import Footer from './components/Layout/Footer';
import SideBar from './components/Modals/SideBar';
import LoginUser from './components/Modals/LogInUser';
import SingUpUser from './components/Modals/SignUpUser';

function App() {
  const [sideBarShow, setSideBarShow] = useState(false);
  const [loginModalShow, setLoginModalShow] = useState(false);
  const [singinModalShow, setSinginModalShow] = useState(false);

  const sideBarToggle = (e) => {
    e.preventDefault();
    if (!e.target.classList.contains('sideBarBody')) {
      setSideBarShow(!sideBarShow);
    }
  };
  const loginModalToggle = (e) => {
    e.preventDefault();
    // console.log('login Toogle :>> ', e.target.classList);
    if (e.target.classList.contains('accessToggleModalShow')) {
      setLoginModalShow(!loginModalShow);
    }
  };
  const signinModalToggle = (e) => {
    e.preventDefault();
    // console.log('signin Toggle :>> ', e.target.classList);
    if (e.target.classList.contains('accessToggleModalShow')) {
      setSinginModalShow(!singinModalShow);
    }
  };

  return (
    <div className="App">
      <NavBar
        sideBarToggle={sideBarToggle}
        loginModalToggle={loginModalToggle}
      />
      {sideBarShow && <SideBar sideBarToggle={sideBarToggle} />}
      {loginModalShow && (
        <LoginUser
          signinModalToggle={signinModalToggle}
          loginModalToggle={loginModalToggle}
        />
      )}
      {singinModalShow && <SingUpUser signinModalToggle={signinModalToggle} />}
      <Header />
      <TitleSection title="Atrakcje" />
      <Attractions />
      <TitleSection title="Opinia" />
      <Opinions opinion={true} />
      <TitleSection title="kontakt" />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
