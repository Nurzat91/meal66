import {Link} from 'react-router-dom';
import btnEdit from '../../assets/btnEdit.svg';
import btnDelete from '../../assets/btnDelete.svg';

const FormMeal = () => {
  return (
    <div className="border mt-4 p-3">
      <div className="d-flex m-3 justify-content-between">
        <p>Total calories: <strong>0 kcal</strong></p>
        <Link to={'/add-meal'} className=" btn btn-secondary">Add new meal</Link>
      </div>
      <div>
        <button className="m-3" type="button">
          <img src={btnEdit} alt="btn Edit" />
        </button>
        <button type="button">
          <img src={btnDelete} alt="btn Delete" />
        </button>
      </div>
    </div>
  );
};

export default FormMeal;