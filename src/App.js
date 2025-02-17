import router from './router'
import { RouterProvider } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      {/* 渲染路由 */}
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
