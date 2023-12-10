import {Route, Routes} from 'react-router-dom';
import FormMeal from './containers/FormMeal/FormMeal';

function App() {

  return (
    <div className="container">
      <Routes>
        <Route path="/" element={(<FormMeal/>)}/>
      </Routes>
    </div>
  )
}

export default App
