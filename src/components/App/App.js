import React, { Fragment } from 'react';
import Layout from '../Layout/Layout';
import ReactNotification from 'react-notifications-component';
import { BrowserRouter } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fab, fas);
function App() {
  return (
    <Fragment>
      <p>Hello</p>
      <BrowserRouter>
        <ReactNotification />
        <Layout />
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
