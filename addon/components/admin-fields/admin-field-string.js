import Ember from 'ember'

const {
  TextField,
  computed: { alias }
} = Ember

export default TextField.extend({
  attributeBindings: ['disabled'],
  disabled: alias('column.disabled'),
  input(e) {
    this.onUpdate(this.get('column.key'), e.target.value)
  }
})
