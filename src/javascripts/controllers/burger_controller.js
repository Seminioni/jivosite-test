import {
  Controller
} from "stimulus";


export default class Burger extends Controller {
  onBurgerClick() {
    this.element.classList.toggle('is-active')
    document.querySelector('.page__navbar').classList.toggle('is-pressed')
  }
}
