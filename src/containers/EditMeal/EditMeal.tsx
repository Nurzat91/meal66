import React, {useCallback, useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';
import axiosApi from '../../axiosApi';
import {Meal} from '../../types';

const EditMeal = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { mealSelect, id } = location.state || { mealSelect: '', id: '' };
  let currentDate = new Date().toISOString().slice(0, 10);

  const [meal, setMeal] = useState<Meal>({
    id: Math.random().toString(),
    date: currentDate,
    select: mealSelect,
    description: '',
    kcal: '',
  });

  const fetchPageContent = useCallback(async () => {
    try {
      setLoading(true);
      if (id) {
        const responseData = await axiosApi.get(`/meal/${mealSelect}/${id}.json`);
        if (responseData.status === 200) {
          setMeal(responseData.data);
        }
      }

    } catch (error) {
      console.error('Error fetching page content:', error);
    }finally {
      setLoading(false);
    }
  }, [id, mealSelect]);

  useEffect(() => {
    void fetchPageContent();
  }, [fetchPageContent]);

  const onChanged = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setMeal((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setLoading(true);
      if (id) {
        await axiosApi.put(`/meal/${mealSelect}/${id}.json`, meal);
      } else {
        const { select, date, description, kcal } = meal;
        const dataToSend = {date , description, kcal };
        await axiosApi.post(`/meal/${select}.json`, dataToSend);
      }
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  let form = (
    <form className="border mt-4 p-3" onSubmit={onFormSubmit}>
      <h4>{id ? 'Edit meal' : 'Add'}</h4>
      <div className="form-group my-2">
        <h6>Select page</h6>
        <select
          id={meal.id}
          name="select" required
          value={meal.select}
          onChange={onChanged}
        >
          <option value="" disabled>
            Время приема пищи:
          </option>
          <option value="Breakfast">Breakfast</option>
          <option value="Snack">Snack</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
        </select>
      </div>
      <div><strong>Date:</strong>{meal.date}</div>
      <div className="form-groupm-2 my-2">
        <textarea
          name="description" required
          className="form-control"
          placeholder="Meal description"
          value={meal.description}
          onChange={onChanged}
        />
      </div>
      <div className="form-group my-2 d-flex align-items-center">
        <input
          type="number" name="kcal" required
          className="form-control me-2"
          style={{width: "100px"}}
          value={meal.kcal}
          onChange={onChanged}
        />
        <label style={{fontSize: "20px"}} htmlFor="kcal">kcal</label>
      </div>
      <button disabled={loading} type="submit" className="btn btn-primary">
        {id ? 'UPDATE' : 'SAVE'}
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