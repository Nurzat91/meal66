import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';

const EditMeal = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setLoading(true);
      // const { category, title, content } = formPages;
      // const dataToSend = { title, content };
      // await axiosApi.post(`/meal.json`, dataToSend);
      // navigate('/');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  let form = (
    <form className="border mt-4 p-3" onSubmit={onFormSubmit}>
      <h4>Add</h4>
      <div className="form-group my-2">
        <h6>Select page</h6>
        <select
          name="foodTime"
          required
        >
          <option value="" disabled>
            Время приема:
          </option>
          <option>Breakfast</option>
          <option>Snack</option>
          <option>Lunch</option>
          <option>Dinner</option>
        </select>
      </div>
      <div className="form-groupm-2 my-2">
        <textarea
          name="description"
          className="form-control"
          placeholder="Meal description"
          required
        />
      </div>
      <div className="form-group my-2">
        <input
          type="number" name="kcal" required
          className="form-control"
        />
        <label htmlFor="kcal">kcal</label>
      </div>
      <button disabled={loading} type="submit" className="btn btn-primary">
        Save
      </button>
    </form>
  );

  if(loading){
    form = <Spinner/>;
  }

  return (
    <div>
      {form}
    </div>
  );
};

export default EditMeal;