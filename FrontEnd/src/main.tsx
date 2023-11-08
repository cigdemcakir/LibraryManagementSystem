import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles/index.css';
import 'semantic-ui-css/semantic.min.css'
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter as Router} from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
      <Router>
              <App />
      </Router>
)
