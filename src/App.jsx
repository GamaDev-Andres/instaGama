import { HelmetProvider } from 'react-helmet-async';

import AuthProvider from './contexts/authContext/AuthProvider';
import PostsMethodsProvider from './contexts/PostsMethodsContext/PostsMethodsProvider';
import AppRouter from './routes/AppRouter';

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <PostsMethodsProvider>
          <div className="bg-fondoGris min-h-[calc(100vh-2.75rem)] text-negro flex flex-col">
            <AppRouter />
          </div>
        </PostsMethodsProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
