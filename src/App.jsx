import { HelmetProvider } from 'react-helmet-async';
import AppRouter from './routes/AppRouter';

function App() {
  return (
    <HelmetProvider>
      <div className="flex-col">
        <AppRouter />
      </div>
    </HelmetProvider>
  );
}

export default App;
