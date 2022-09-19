import React from 'react';
import {
  Navbar, Container, Form,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Header = () => {
    const { t } = useTranslation();
    const { i18n } = useTranslation();
    const changeLanguage = (language) => {
      i18n.changeLanguage(language);
    };

    return (
    <>
      <div className="shadow-sm bg-white">
        <Container className="d-flex justify-content-between align-items-center">
          <Navbar expand="lg">
            <Navbar.Brand href="/">{t('header.gameName')}</Navbar.Brand>
          </Navbar>
          <Navbar.Text>
          <Form.Select size="sm">
            <option onClick={() => changeLanguage('en')}>English</option>
            <option onClick={() => changeLanguage('ru')} selected>Русский</option>
          </Form.Select>
          </Navbar.Text>
        </Container>
      </div>
    </>
    );
  };
  
  export default Header;
  