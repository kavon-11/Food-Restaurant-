import { useEffect, useState } from "react";
import {cartActions} from '../store/index.js';
import { useDispatch } from "react-redux";

export default function Meals() {
  const dispatch = useDispatch();
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [zoomedMeal, setZoomedMeal] = useState(null);

  function toggleZoom(id) {
    setZoomedMeal((prev) => (prev === id ? null : id));
  }

  useEffect(() => {
    setIsLoading(true);

    async function fetchMeals() {
      try {
        const response = await fetch("http://localhost:3000/meals");
        const data = await response.json();
        setMeals(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }

    fetchMeals();
  }, []);

  return (
    <section>
      <h2 style={{ textAlign: "center" }}>Available Meals</h2>

      {isLoading && <p className="center">Loading meals...</p>}
      {!isLoading && meals.length === 0 && (
        <p className="center">No meals found.</p>
      )}

      {!isLoading && meals.length > 0 && (
        <ul id="meals">
          {meals.map((meal) => (
            <li key={meal.id} className="meal-item">
              <article>
                <img
                  src={`http://localhost:3000/${meal.image}`}
                  alt={meal.name}
                  style={{
                    objectFit: "cover",
                    borderRadius: "10px",
                    transition: "all .6s ease",
                  }}
                />
                <h3>{meal.name}</h3>
                <p className="meal-item-description">{meal.description}</p>
                <p className="meal-item-price">${meal.price}</p>

                <div className="meal-item-actions">
                  <button onClick={()=>dispatch(cartActions.addItem(meal))} >Add to Cart</button>
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
