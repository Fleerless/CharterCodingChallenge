import React from 'react';
import './App.css';

// Import components
import Header from './components/shared/header/header'
import Footer from './components/shared/footer/footer'
import Table from './components/table/table'


function App() {
  return (
    <div className="App">
      <Header></Header>
      <Table></Table>
      <Footer></Footer>
    </div>
  );
}

export default App;
