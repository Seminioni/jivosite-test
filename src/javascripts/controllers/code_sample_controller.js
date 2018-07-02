import {
  Controller
} from "stimulus";

import {
  copyTextToClipboard
} from '../utils'
import hljs from 'highlight.js';

export default class CodeSample extends Controller {
  static targets = ["code"];

  connect() {
    hljs.highlightBlock(this.codeTarget)
  }

  copy(e) {
    e.preventDefault();
    copyTextToClipboard(this.codeTarget.innerText)
    alert(`Исходный код был скопирован в буфер обмена и выведен сюда:
    ${this.codeTarget.innerText}`)
  }
}
