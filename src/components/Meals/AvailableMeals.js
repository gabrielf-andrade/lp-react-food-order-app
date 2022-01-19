import styles from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import { useEffect, useState } from "react";
import { baseUrl } from "../../global";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [httpError, setHttpError] = useState(null)

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/meals`)
        const data = await response.json()
        setMeals(data)
      } catch (error) {
        setHttpError('Something went wrong!')        
      } finally {
        setIsLoading(false)
      }
    }
    fetchMeals()
  }, [])

  if(isLoading){
    return <section className={styles.loading}>
      <p>Loading...</p>
    </section>
  }
  if(httpError){
    return <section className={styles.error}>
      <p>{httpError}</p>
    </section>
  }

  const mealsList = meals.map((meal) => (
    <MealItem key={meal.id} id={meal.id} name={meal.name} description={meal.description} price={meal.price} />
  ));

  return (
    <section className={styles.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
