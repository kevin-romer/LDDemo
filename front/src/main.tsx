import { createRoot } from 'react-dom/client'
import { LDProvider } from 'launchdarkly-react-client-sdk';
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router';
import { ApiProvider } from './context/ApiProvider.tsx';

const randomUserNumber = String(Math.floor(Math.random() * 200) + 1).padStart(3, '0');

const context = {
  kind: 'user',
  key: `demo-user-${randomUserNumber}`,
  name: 'Demo Frontend User',
  email: `demo${randomUserNumber}@email.com`,
};

createRoot(document.getElementById('root')!).render(
  <LDProvider clientSideID={import.meta.env.VITE_LAUNCHDARKLY_CLIENT_ID} context={context}>
    <ApiProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApiProvider>
  </LDProvider>,
)
