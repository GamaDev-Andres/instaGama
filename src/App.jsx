import { HelmetProvider } from 'react-helmet-async';
import AuthProvider from './contexts/authContext/authProvider';
// import SocketProvider from './contexts/socketContext/SocketProvider';
import AppRouter from './routes/AppRouter';

function App() {
  return (
    <HelmetProvider>
      {/* <SocketProvider> */}
      <AuthProvider>
        <div className="bg-fondoGris min-h-[calc(100vh-2.75rem)] text-negro flex flex-col">
          <AppRouter />
        </div>
      </AuthProvider>
      {/* </SocketProvider> */}
    </HelmetProvider>
  );
}

export default App;
