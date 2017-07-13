import Ember from 'ember'

const {
  TextField,
  computed: { alias }
} = Ember

export default TextField.extend({
  classNames: ['admin-input'],
  attributeBindings: ['disabled'],
  disabled: alias('column.disabled'),
  input({ target: { value }}) {
    this.onUpdate(this.get('column.key'), value)
  }
})
