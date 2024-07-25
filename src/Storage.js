class Storage {
  static getCalorieLimit(defaultLimit = 2000) {
    let calorieLimit;
    if (localStorage.getItem('calorieLimit') === null) {
      calorieLimit = defaultLimit;
      console.log('done');
    } else {
      calorieLimit = +localStorage.getItem('calorieLimit');
      console.log('not done');
    }
    return calorieLimit;
  }

  static setCalorieLimit(calorieLimit) {
    localStorage.setItem('calorieLimit', calorieLimit);
  }
  static getTotalcalories(defaultCalories = 0) {
    let totalCalories;
    if (localStorage.getItem('totalCalories') === null) {
      totalCalories = defaultCalories;
    } else {
      totalCalories = +localStorage.getItem('totalCalories');
    }
    return totalCalories;
  }

  static updateCalories(calories) {
    localStorage.setItem('totalCalories', calories);
  }
  static getMeals() {
    let meals;
    if (localStorage.getItem('meals') === null) {
      meals = [];
    } else {
      meals = JSON.parse(localStorage.getItem('meals'));
    }
    return meals;
  }

  static setMeals(meal) {
    const meals = Storage.getMeals();
    meals.push(meal);
    localStorage.setItem('meals', JSON.stringify(meals));
  }
  static removeMeal(id) {
    const meals = Storage.getMeals();
    meals.forEach((meal, index) => {
      if (meal.id === id) {
        meals.splice(index, 1);
      }
    });
    localStorage.setItem('meals', JSON.stringify(meals));
  }

  static getWorkouts() {
    let workout;
    if (localStorage.getItem('workouts') === null) {
      workout = [];
    } else {
      workout = JSON.parse(localStorage.getItem('workouts'));
    }
    return workout;
  }

  static setworkouts(workout) {
    const workouts = Storage.getWorkouts();
    workouts.push(workout);
    localStorage.setItem('workouts', JSON.stringify(workouts));
  }

  static removeWorkout(id) {
    const workouts = Storage.getWorkouts();
    workouts.forEach((workout, index) => {
      if (workout.id === id) {
        workouts.splice(index, 1);
      }
    });
    localStorage.setItem('workouts', JSON.stringify(workouts));
  }

  static clearAll(calorieLimit) {
    const value = localStorage.getItem(calorieLimit);
    localStorage.clear();
    if (value !== null) {
      localStorage.setItem(calorieLimit, value);
    }
  }
}

export default Storage;
