import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
// import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
// import Categories from "./pages/Categories";

import Login from "./pages/Login";
import Registration from "./pages/Registration";
import SignUp from "./pages/SignUp";
import Category from "./pages/Category";
import Todo from "./pages/Todo";

function App() {
  
  return (
    <BrowserRouter>
      <div className="App">
      
        {/* <ToastContainer position="top-center"/> */}
        <Switch>
          <Route exact path="/" component={Registration} />
          <Route exact path="/SignUp" component ={SignUp} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/Category" component={Category} />
          <Route exact path="/Todo" component={Todo} />
          <Route exact path="/logout" component={Login} />
          
          
          
          <Redirect to="/" />
          
        </Switch>
      </div>
    </BrowserRouter>

  );
}

export default App;
