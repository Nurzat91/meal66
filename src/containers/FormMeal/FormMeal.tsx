import {Link} from 'react-router-dom';
import btnEdit from '../../assets/btnEdit.svg';
import btnDelete from '../../assets/btnDelete.svg';
import {useCallback, useEffect, useState} from 'react';
import Spinner from '../../components/Spinner/Spinner';
import axiosApi from '../../axiosApi';
import {DataMeal} from '../../types';

type Props = {
  [key: string]: {
    [key: string]: DataMeal;
  };
};

const FormMeal = () => {
  const [loading, setLoading] = useState(false);
  const [mealData, setMealData] = useState<Props | null>(null);

  const fetchPageContent = useCallback(async () => {
    try {
      setLoading(true);
      const responseData = await axiosApi.get('meal.json');

      setMealData(responseData.data);
      console.log(responseData.data);
    } catch (error) {
      console.error('Error fetching page content:', error);
    }finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchPageContent();
  }, [fetchPageContent]);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="border mt-4 p-3">
          <div className="d-flex m-3 justify-content-between">
            <p>Total calories: <strong>0 kcal</strong></p>
            <Link to={'/add-meal'} className=" btn btn-secondary">Add new meal</Link>
          </div>
          {mealData && (
            <>
              {Object.keys(mealData).map((meal: string) => (
                <div className="card m-3 p-2" key={meal}>
                  <h3>{meal}</h3>
                  {Object.keys(mealData[meal]).map((id: string) => (
                    <div className="d-flex justify-content-between align-items-center" key={id}>
                      <div className="d-flex w-75 justify-content-between" key={id}>
                        <p className="m-0">{mealData[meal][id].description}</p>
                        <p className="m-0">{mealData[meal][id].kcal}<strong> kcal</strong></p>
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