import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
// import { ToastContainer } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';

import Category from "./pages/Category";
// import Categories from "./pages/Categories";


function App() {
  
  return (
    <BrowserRouter>
      <div className="App">
      
       
        <Switch>
        <Route exact path="/Category" component={Category} />
        <Redirect to="/Category" />
        </Switch>
      </div>
    </BrowserRouter>

  );
}

export default App;
