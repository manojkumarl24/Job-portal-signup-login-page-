import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Registration from './Registration';
import Login from './Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;

/*import React from 'react';
import Registration from './Registration';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Registration />
    </div>
  );
}

export default App;*/
