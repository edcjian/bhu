import logo from './logo.svg';
import './App.css';
import {MyRoute, Tree} from "./component/MyRoute";
import 'antd/dist/antd.css';
import {LoginProvider} from "./component/zhihu/LoginProvider";

function App() {
  return (
      <LoginProvider>
        <div className="App">
          <MyRoute/>
        </div>
      </LoginProvider>
  );
}

export default App;
