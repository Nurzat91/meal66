import { Link, useNavigate } from 'react-router-dom';
import btnEdit from '../../assets/btnEdit.svg';
import btnDelete from '../../assets/btnDelete.svg';
import { useCallback, useEffect, useState } from 'react';
import Spinner from '../../components/Spinner/Spinner';
import axiosApi from '../../axiosApi';
import { DataMeal } from '../../types';

type Props = {
  [key: string]: {
    [key: string]: DataMeal;
  };
};

const FormMeal = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [mealData, setMealData] = useState<Props | null>(null);
  const [totalCalories, setTotalCalories] = useState(0);

  const fetchGetData = useCallback(async () => {
    try {
      setLoading(true);
      const responseData = await axiosApi.get('meal.json');
      setMealData(responseData.data);

    } catch (error) {
      console.error('Error fetching page content:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const totalCal = useCallback(() => {
    if (mealData) {
      let currentDate = new Date().toISOString().slice(0, 10);
      let total = 0;
      Object.keys(mealData).forEach((mealSelect) => {
        Object.keys(mealData[mealSelect]).forEach((id) => {
          if (mealData[mealSelect][id].date === currentDate) {
            total += parseInt(mealData[mealSelect][id].kcal);
          }
        });
      });
      setTotalCalories(total);
    }
  }, [mealData]);

  useEffect(() => {
    void fetchGetData();
  }, [fetchGetData]);
  useEffect(() => {
    void totalCal();
  }, [totalCal]);

  const editPost = (mealSelect: string, id: string) => {
    navigate(`/edit-meal/${mealSelect}/${id}`, {
      state: { mealSelect, id },
    });
  };

  const deletePost = async (mealSelect: string, id: string) => {
    try {
      await axiosApi.delete(`/meal/${mealSelect}/${id}.json`);
      await fetchGetData();
      totalCal();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="border mt-4 p-3">
          <div className="d-flex m-3 justify-content-between">
            <p>Total calories: <strong>{totalCalories} kcal</strong></p>
            <Link to={'/add-meal'} className=" btn btn-secondary">
              Add new meal
            </Link>
          </div>
          {mealData && (
            <>
              {Object.keys(mealData).map((mealSelect: string) => (
                <div className="card m-3 p-2" key={mealSelect}>
                  <h3>{mealSelect}</h3>
                  {Object.keys(mealData[mealSelect]).map((id: string) => (
                    <div className="d-flex justify-content-between align-items-center" key={id}>
                      <div className="d-flex w-75 justify-content-between">

                        <p className="m-0">
                          <strong>Date: </strong><span className="me-2">{mealData[mealSelect][id].date}</span>
                          {mealData[mealSelect][id].description}</p>
                        <p className="m-0">
                          {mealData[mealSelect][id].kcal}<strong> kcal</strong>
                        </p>
                      </div>
                      <div>
                        <button className="m-3" type="button">
                          <img src={btnEdit} alt="btn Edit" onClick={() => editPost(mealSelect, id)} />
                        </button>
                        <button type="button">
                          <img
                            src={btnDelete}
                            alt="btn Delete"
                            onClick={() => deletePost(mealSelect, id)}
                          />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default FormMeal;
