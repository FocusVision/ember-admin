import Ember from 'ember'
import layout from '../templates/components/admin-filter-keyword'

const {
  Component,
  run: { debounce }
} = Ember

export default Component.extend({
  layout,

  placeholder: 'Enter text...',
  timeout: 500,

  value: null,
  onChange() {}, // passed in
  onChangeHandler(e) {
    this.onChange(e.target.value)
  },

  actions: {
    debounceInput(e) {
      debounce(this, this.onChangeHandler, e, this.get('timeout'))
    }
  }
})
