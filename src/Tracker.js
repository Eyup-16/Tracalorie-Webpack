import Storage from './Storage';

class CalorieTracker {
  constructor() {
    this._calorieLimit = Storage.getCalorieLimit();
    this._totalCalories = Storage.getTotalcalories(0);
    this._meals = Storage.getMeals();
    this._workouts = Storage.getWorkouts();

    this._displayCaloriesLimit();
    this._displayCaloriesTotal();
    this._displayCaloriesConsumed(); // Add this line
    this._displayCaloriesBurned(); // Add this line
    this._displayCaloriesRemaining();
    this._displayCaloriesProgress();
  }

  // Public Methods
  addMeal(meal) {
    this._meals.push(meal);
    this._totalCalories += meal.calories;
    Storage.updateCalories(this._totalCalories);
    Storage.setMeals(meal);
    this._displayNewMeal(meal);
    this._render();
  }
  addWorkout(workout) {
    this._workouts.push(workout);
    this._totalCalories -= workout.calories;
    Storage.updateCalories(this._totalCalories);
    Storage.setworkouts(workout);
    this._displayNewWorkout(workout);
    this._render();
  }

  removeMeal(id) {
    const index = this._meals.findIndex((meal) => meal.id == id);
    if (index !== -1) {
      const meal = this._meals[index];
      this._totalCalories -= meal.calories;
      Storage.updateCalories(this._totalCalories);
      this._meals.splice(index, 1);
      Storage.removeMeal(id);
      this._render();
    }
  }

  removeWorkout(id) {
    const index = this._workouts.findIndex((workout) => workout.id == id);
    if (index !== -1) {
      const workout = this._workouts[index];
      this._totalCalories += workout.calories;
      Storage.updateCalories(this._totalCalories);
      this._workouts.splice(index, 1);
      Storage.removeWorkout(id);
      this._render();
    }
  }

  reset() {
    console.log('Resetting tracker...');
    this._meals = [];
    this._workouts = [];
    this._totalCalories = 0;
    Storage.clearAll('calorieLimit');
    this._render();
    console.log('Tracker reset completed.');
  }

  setLimit(calorieLimit) {
    this._calorieLimit = calorieLimit;
    Storage.setCalorieLimit(calorieLimit);
    this._displayCaloriesLimit();
    this._render();
  }

  loadItem() {
    this._meals.forEach((meal) => this._displayNewMeal(meal));
    this._workouts.forEach((workout) => this._displayNewWorkout(workout));
  }

  // Private Methods

  //   The Total of the calories display
  _displayCaloriesTotal() {
    const totalCaloriesEL = document.querySelector('#calories-total');
    totalCaloriesEL.innerHTML = this._totalCalories;
    if (this._totalCalories <= 0) {
      totalCaloriesEL.parentElement.parentElement.classList.remove(
        'bg-success'
      );
      totalCaloriesEL.parentElement.parentElement.classList.add('bg-danger');
    } else {
      totalCaloriesEL.parentElement.parentElement.classList.remove('bg-danger');
      totalCaloriesEL.parentElement.parentElement.classList.add('bg-success');
    }
  }

  //   The Limit of the calories display
  _displayCaloriesLimit() {
    const limitCaloriesEL = document.querySelector('#calories-limit');
    limitCaloriesEL.innerHTML = this._calorieLimit;
  }

  //   Consumed Calories show
  _displayCaloriesConsumed() {
    const consumedCalories = document.querySelector('#calories-consumed');
    const consumed = this._meals.reduce(
      (total, meal) => total + meal.calories,
      0
    );
    consumedCalories.innerHTML = consumed;
  }

  //   Burned Calories show
  _displayCaloriesBurned() {
    const burnedCalories = document.querySelector('#calories-burned');
    const Burned = this._workouts.reduce(
      (total, workout) => total + workout.calories,
      0
    );
    burnedCalories.innerHTML = Burned;
  }

  //   The Remaining of the calories display
  _displayCaloriesRemaining() {
    const remainingCaloriesEL = document.querySelector('#calories-remaining'); // select from the DOM.
    const progressEl = document.querySelector('#calorie-progress'); // select progressbar from DOM.
    const remaining = this._calorieLimit - this._totalCalories; // the subtraction between limit & total used.
    remainingCaloriesEL.innerHTML = remaining; // change the innerhtml to the result of above one.

    // if the remaining less than 0 it'll change the color of remianing tab & progressBar to red.
    if (remaining <= 0) {
      remainingCaloriesEL.parentElement.parentElement.classList.remove(
        'bg-light'
      );
      remainingCaloriesEL.parentElement.parentElement.classList.add(
        'bg-danger'
      );
      progressEl.classList.remove('bg-success');
      progressEl.classList.add('bg-danger');
    } else {
      remainingCaloriesEL.parentElement.parentElement.classList.remove(
        'bg-danger'
      );
      remainingCaloriesEL.parentElement.parentElement.classList.add('bg-light');
      progressEl.classList.remove('bg-danger');
      progressEl.classList.add('bg-success');
    }
  }
  //   The Progress of the calories display

  // _displayCaloriesProgress() {
  //   const progressCalories = document.querySelector('#calorie-progress');
  //   const remainingCalories = this._calorieLimit - this._totalCalories;
  //   const progressPerenage = (remainingCalories / this._calorieLimit) * 100;
  //   progressCalories.style.width = `${progressPerenage}%`;
  // } // well this was turned off cuz it works the reverse!
  _displayCaloriesProgress() {
    const progressEl = document.getElementById('calorie-progress');
    const percentage = (this._totalCalories / this._calorieLimit) * 100;
    const width = Math.min(percentage, 100);
    progressEl.style.width = `${width}%`;
  }

  // Display the Meal in the DOM
  _displayNewMeal(meal) {
    const mealsEL = document.querySelector('#meal-items');
    const mealEL = document.createElement('div');
    mealEL.classList.add('card', 'my-2');
    mealEL.setAttribute('data-id', meal.id);
    mealEL.innerHTML = ` 
                  <div class="card-body">
                    <div class="d-flex align-items-center justify-content-between">
                      <h4 class="mx-1">${meal.name}</h4>
                      <div
                        class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5">${meal.calories}
                      </div>
                      <button class="delete btn btn-danger btn-sm mx-2">
                        <i class="fa-solid fa-xmark"></i>
                      </button>
                    </div>
                    </div>
    
        `;
    mealsEL.appendChild(mealEL);
  }

  // Display the Workout in the DOM

  _displayNewWorkout(workout) {
    const workoutsEL = document.querySelector('#workout-items');
    const workoutEL = document.createElement('div');
    workoutEL.classList.add('card', 'my-2');
    workoutEL.setAttribute('data-id', workout.id);
    workoutEL.innerHTML = ` 
                  <div class="card-body">
                    <div class="d-flex align-items-center justify-content-between">
                      <h4 class="mx-1">${workout.name}</h4>
                      <div
                        class="fs-1 bg-secondary text-white text-center rounded-2 px-2 px-sm-5">${workout.calories}
                      </div>
                      <button class="delete btn btn-danger btn-sm mx-2">
                        <i class="fa-solid fa-xmark"></i>
                      </button>
                    </div>
                    </div>
    
        `;
    workoutsEL.appendChild(workoutEL);
  }

  // The render() method is used to generate and return the virtual DOM representation of the component based on its current state and props.
  _render() {
    this._displayCaloriesTotal();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();
    this._displayCaloriesProgress();
  }
}

export default CalorieTracker;
