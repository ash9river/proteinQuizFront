import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Start from './page/Start';
import Quiz from './page/Quiz';
import End from './page/End';
import Error from './page/Error';

function App() {
    
    const router = createBrowserRouter([
        {
          path: '*',
          element: <Error/>,
          
        },
        {
          path: '/',
          element: <Start/>,
          errorElement: <Error/>,
        },
        {
          path: '/quiz',
          element: <Quiz/>,
          errorElement: <Error/>,
        },
        {
          path: '/end',
          element: <End/>,
          errorElement: <Error/>,
        }
      ]);
      return <RouterProvider
      
      router={router} />;
}

export default App;