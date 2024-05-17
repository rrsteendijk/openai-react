// src/App.tsx
import React from 'react';
import Chat from './components/Chat';
import Header from './components/Header';
import ModuleNameDisplay from './components/ModuleNameDisplay';
import { ModuleNameProvider } from './contexts/ModuleNameContext';
import './styles/styles.css';
import {Grid} from "@mui/material";
import WhoAmIButton from './components/whoami';
import CourseForm from './components/CourseForm';

const App: React.FC = () => {
  return (
    <ModuleNameProvider>
    <div className="App">
      <header className="App-header">
         {/* align center */}
        <h1 style={{ textAlign: 'center' }}>React Chatbot</h1>
      </header>
      <main>
        <div>
        <Header />
        </div>
          <Grid container spacing={2}>
            <Grid item xs={6} className="border-main">
              <Chat />
            </Grid>
            <Grid item xs={6} className="border-main">
              <ModuleNameDisplay />
              <WhoAmIButton />
              <CourseForm />
            </Grid>
          </Grid>
      </main>
    </div>
    </ModuleNameProvider>
  );
};

export default App;
