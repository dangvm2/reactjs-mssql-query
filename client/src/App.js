import React from 'react';
import DBAHome from './containers/DBAHome';
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
      <BrowserRouter>
        <DBAHome />
      </BrowserRouter>
  );
}

export default App;
