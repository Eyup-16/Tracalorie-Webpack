import '@fortawesome/fontawesome-free/js/all';
import { Modal, Collapse } from 'bootstrap';
import CalorieTracker from './Tracker';
import { Meal, Workout } from './Items';
import './css/bootstrap.css';
import './css/style.css';

class App {
  constructor() {
    this._tracker = new CalorieTracker();
    this._LoadEventListners();
    this._tracker.loadItem(); // this to load the meals & workouts items.
  }

  // Was Replaced with _newItem() method //

  // _newMeal(event) {
  //   event.preventDefault();
  //   const name = document.querySelector('#meal-name');
  //   const calories = document.querySelector('#meal-calories');
  //   if (name.value == '' || calories.value == '') {
  //     alert('Please fill in all fields');
  //     return;
  //   }
  //   const meal = new Meal(name.value, +calories.value);
  //   this.tracker.addMeal(meal);
  //   // Reset input fields
  //   name.value = '';
  //   calories.value = '';

  //   // close the collapse
  //   const collapseMeal = document.querySelector('#collapse-meal');
  //   const bsCollapse = new bootstrap.Collapse(collapseMeal, {
  //     toggle: true,
  //   });
  // }

  // _newWorkout(event) {
  //   event.preventDefault();
  //   const name = document.querySelector('#workout-name');
  //   const calories = document.querySelector('#workout-calories');
  //   if (name.value === '' || calories.value === '') {
  //     alert('Please fill in all fields');
  //     return;
  //   }
  //   const workout = new Workout(name.value, +calories.value);
  //   this.tracker.addWorkout(workout);

  //   // Reset input fields
  //   name.value = '';
  //   calories.value = '';

  //   // Collapse the workout form
  //   const collapseWorkout = new bootstrap.Collapse(
  //     document.querySelector('#collapse-workout'),
  //     {
  //       toggle: true,
  //     }
  //   );
  // }

  _LoadEventListners() {
    document
      .querySelector('#workout-form')
      .addEventListener('submit', this._newItem.bind(this));
    document
      .querySelector('#meal-form')
      .addEventListener('submit', this._newItem.bind(this));
    document
      .querySelector('#meal-items')
      .addEventListener('click', this._removeItem.bind(this, 'meal')); // Pass 'meal' as type
    document
      .querySelector('#workout-items')
      .addEventListener('click', this._removeItem.bind(this, 'workout')); // Pass 'workout' as type
    document
      .querySelector('#filter-meals')
      .addEventListener('keyup', this._filterItem.bind(this, 'meal'));
    document
      .querySelector('#filter-workouts')
      .addEventListener('keyup', this._filterItem.bind(this, 'workout'));
    document
      .querySelector('#reset')
      .addEventListener('click', this._resetItem.bind(this));
    document
      .querySelector('#limit-form')
      .addEventListener('submit', this._setLimit.bind(this));
  }

  _newItem(event) {
    event.preventDefault();
    let name, calories; // Initiate the variables
    const formID = event.target.id; // Get the ID of the form that was submitted
    //
    if (formID === 'meal-form') {
      name = document.querySelector('#meal-name');
      calories = document.querySelector('#meal-calories');
    } else if (formID === 'workout-form') {
      name = document.querySelector('#workout-name');
      calories = document.querySelector('#workout-calories');
    }
    //
    if (name.value === '' || calories.value === '') {
      alert('Please fill in all fields');
      return;
    }
    // // Create either a Meal or Workout based on the form submitted
    let choice;
    if (formID === 'meal-form') {
      choice = new Meal(name.value, +calories.value);
      this._tracker.addMeal(choice);
    } else if (formID === 'workout-form') {
      choice = new Workout(name.value, +calories.value);
      this._tracker.addWorkout(choice);
    }
    // Reset input fields
    if (formID === 'meal-form') {
      name.value = '';
      calories.value = '';
    } else if (formID === 'workout-form') {
      name.value = '';
      calories.value = '';
    }

    // Collapse the form
    const collapseId = `#collapse-${formID.replace('-form', '')}`;
    // delete bootsrap to fix the problem
    const bsCollapse = new Collapse(document.querySelector(collapseId), {
      toggle: true,
    });
  }
  // // Deleted either a Meal or Workout based on the form submitted
  _removeItem(type, event) {
    if (
      event.target.classList.contains('delete') ||
      event.target.classList.contains('fa-xmark')
    ) {
      if (confirm('Are You sure ?')) {
        const id = event.target.closest('.card').getAttribute('data-id');
        if (type === 'meal') {
          this._tracker.removeMeal(id);
        } else if (type === 'workout') {
          this._tracker.removeWorkout(id);
        }
        event.target.closest('.card').remove();
      }
    }
  }

  _filterItem(type, event) {
    const text = event.target.value.toLowerCase();
    document.querySelectorAll(`#${type}-items .card`).forEach((item) => {
      const name = item.firstElementChild.firstElementChild.textContent;

      if (name.toLowerCase().indexOf(text) !== -1) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  }

  _resetItem() {
    if (confirm('Are you sure you want to reset all data?')) {
      console.log('if confirmed');
      this._tracker.reset(); // Call reset method from CalorieTracker
      this._clearItemsFromDOM(); // Clear items from the DOM
      this._resetProgressBar(); // Reset progress bar
    }
  }

  _clearItemsFromDOM() {
    document.querySelector('#meal-items').innerHTML = '';
    document.querySelector('#workout-items').innerHTML = '';
    document.querySelector('#filter-meals').value = '';
    document.querySelector('#filter-workouts').value = ''; // Corrected ID here
  }

  _resetProgressBar() {
    const progressEl = document.getElementById('calorie-progress');
    progressEl.style.width = '0%';
  }

  _setLimit(event) {
    event.preventDefault();

    const limit = document.querySelector('#limit');

    if (limit.value === '') {
      alert('Please fill in the field');
      return;
    }
    this._tracker.setLimit(parseInt(limit.value)); // + to convert the string into a number.
    limit.value = '';
    const modalEL = document.querySelector('#limit-modal');
    const modal = Modal.getInstance(modalEL);
    modal.hide();
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const app = new App();
});
