import {Link} from 'react-router-dom';

const FormMeal = () => {
  return (
    <div className="border p-3">
      <h4 className="mt-3 border-bottom p-1">Calorie tracker</h4>
      <div className="d-flex mt-3 justify-content-between">
        <p>Total Calories: <strong>0 kcal</strong></p>
        <Link to={'/edit-meal/'} className=" btn btn-primary">Add new meal</Link>
      </div>
    </div>
  );
};

export default FormMeal;