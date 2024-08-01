import { DndProvider } from 'react-dnd'
import { TouchBackend } from 'react-dnd-touch-backend'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './assets/style.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
      <App />
    </DndProvider>,
  </>
)
