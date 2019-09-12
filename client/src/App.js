import React from 'react';
import { Button, Layout } from 'antd';
import Navbar from './components/layout/Navbar';
import './App.css';

const App = () => (
  <>
    <Layout>
      <Navbar />
      <Button type="primary">Primary</Button>
    </Layout>
  </>
);

export default App;
