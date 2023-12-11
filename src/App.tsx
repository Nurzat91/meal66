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
          <Route path="/edit-meal/Breakfast/:id" element={(<EditMeal/>)}/>
          <Route path="/edit-meal/Snack/:id" element={(<EditMeal/>)}/>
          <Route path="/edit-meal/Lunch/:id" element={(<EditMeal/>)}/>
          <Route path="/edit-meal/Dinner/:id" element={(<EditMeal/>)}/>
          <Route path="*" element={(<ErrorPage/>)}/>
        </Routes>
      </div></>
  )
}

export default App
