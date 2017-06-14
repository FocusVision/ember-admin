import Ember from 'ember'
import layout from 'ember-admin/templates/components/admin-filter-keyword'

const {
  Component,
  run: { debounce }
} = Ember

export default Component.extend({
  layout,

  placeholder: 'Enter text...',
  timeout: 500,

  value: null,
  onChange() {},

  actions: {
    debounceInput({ target: { value }}) {
      debounce(this, this.onChange, value, this.get('timeout'))
    }
  }
})
