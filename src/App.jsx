import { HelmetProvider } from 'react-helmet-async';
import AuthProvider from './contexts/authContext/authProvider';
import AppRouter from './routes/AppRouter';

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <div className="bg-fondoGris min-h-[calc(100vh-2.75rem)] text-negro flex flex-col">
          <AppRouter />
        </div>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
