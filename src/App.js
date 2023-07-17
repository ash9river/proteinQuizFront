import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Start from './page/Start';
import Quiz from './page/Quiz';
import End from './page/End';
import Error from './page/Error';

function App() {
    const url =process.env.REACT_APP_BASE_URL; 
    const router = createBrowserRouter([
        {
          path: url+'/*',
          element: <Error/>,
          
        },
        {
          path: url+'/',
          element: <Start/>,
          errorElement: <Error/>,
        },
        {
          path: url+'/quiz',
          element: <Quiz/>,
          errorElement: <Error/>,
        },
        {
          path: url+'/end',
          element: <End/>,
          errorElement: <Error/>,
        }
      ]);
      return <RouterProvider router={router} />;
}

export default App;