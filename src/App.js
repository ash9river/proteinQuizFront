import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Start from './page/Start';
import Quiz from './page/Quiz';
import End from './page/End';

function App() {
    const router = createBrowserRouter([
        {
          path: '/',
          element: <Start/>,
          errorElement: <div>404 Not Found</div>,
        },
        {
          path: '/quiz',
          element: <Quiz/>,
          errorElement: <div>404 Not Found</div>,
        },
        {
          path: '/end',
          element: <End/>,
          errorElement: <div>404 Not Found</div>,
        }
      ]);
      return <RouterProvider router={router} />;
}

export default App;