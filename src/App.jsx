import { HelmetProvider } from 'react-helmet-async';
import AuthProvider from './contexts/authContext/authProvider';
import PostsMethodsProvider from './contexts/PostsMethodsContext/PostsMethodsProvider';
import SocketProvider from './contexts/socketContext/SocketProvider';
import AppRouter from './routes/AppRouter';

function App() {
  return (
    <HelmetProvider>
      <SocketProvider>
        <AuthProvider>
          <PostsMethodsProvider>
            <div className="bg-fondoGris min-h-[calc(100vh-2.75rem)] text-negro flex flex-col">
              <AppRouter />
            </div>
          </PostsMethodsProvider>
        </AuthProvider>
      </SocketProvider>
    </HelmetProvider>
  );
}

export default App;
