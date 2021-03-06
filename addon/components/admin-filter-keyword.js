import Ember from 'ember'
import layout from 'ember-admin/templates/components/admin-filter-keyword'

const {
  Component,
  run: { debounce }
} = Ember

export default Component.extend({
  layout,

  classNames: ['admin-filter-keyword'],
  tagName: '',
  placeholder: 'Enter text...',
  timeout: 500,

  value: null,
  onInput() {},

  actions: {
    debounceInput({ target: { value }}) {
      debounce(this, this.onInput, value, this.get('timeout'))
    }
  }
})
