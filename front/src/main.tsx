import { createRoot } from 'react-dom/client'
import { LDProvider } from 'launchdarkly-react-client-sdk';
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router';
import { ApiProvider } from './context/ApiProvider.tsx';

const context = {
  kind: 'user',
  key: 'demo-user-001',
  name: 'Demo Frontend User',
  email: 'demo@email.com',
}

createRoot(document.getElementById('root')!).render(
  <LDProvider clientSideID={import.meta.env.VITE_LAUNCHDARKLY_CLIENT_ID} context={context}>
    <ApiProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApiProvider>
  </LDProvider>,
)
