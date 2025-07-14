import { createRoot } from 'react-dom/client';
import AutoSearch from './Components/AutoSearch';

import './styles/main.scss';

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<AutoSearch />);
