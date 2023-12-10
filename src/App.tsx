import {Route, Routes} from 'react-router-dom';
import FormMeal from './containers/FormMeal/FormMeal';
import EditMeal from './containers/EditMeal/EditMeal';
import ErrorPage from './components/ErrorPage/ErrorPage';
import Toolbar from './components/Toolbar/Toolbar';

function App() {

  return (
    <>
      <header>
        <Toolbar/>
      </header>
      <div className="container">
        <Routes>
          <Route path="/" element={(<FormMeal/>)}/>
          <Route path="/add-meal" element={(<EditMeal/>)}/>
          <Route path="*" element={(<ErrorPage/>)}/>
        </Routes>
      </div></>
  )
}

export default App
