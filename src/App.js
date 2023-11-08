import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Start from './page/Start';
import Quiz from './page/Quiz';
import End from './page/End';
import Error from './page/Error';

const App=()=>{
  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <Error/>,
      children: [
        {index: true, element: <Start/>},
        {path: "/quiz", element: <Quiz/>},
        {path: "/end", element: <End/>},
      ],
    }
  ]);

  return (
    <>
        <RouterProvider router={router}/>
    </>
  )
}

export default App;