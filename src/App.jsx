import { HelmetProvider } from 'react-helmet-async';
import AuthProvider from './contexts/authContext/authProvider';
import AppRouter from './routes/AppRouter';

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <div className="bg-fondoGris min-h-screen flex-col text-negro mb-11">
          <AppRouter />
        </div>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
