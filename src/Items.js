// Class of meal (from here we create new meals)
class Meal {
  constructor(name, calories) {
    this.id = `${Math.random().toString(16).slice(2)}`;
    this.name = name;
    this.calories = calories;
  }
}
// Class of workout (from here we create new workouts)
class Workout {
  constructor(name, calories) {
    this.id = `${Math.random().toString(16).slice(2)}`;
    this.name = name;
    this.calories = calories;
  }
}

export { Meal, Workout };
