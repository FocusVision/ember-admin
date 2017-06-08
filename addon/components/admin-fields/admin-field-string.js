import Ember from 'ember'

const {
  TextField,
  computed: { alias }
} = Ember

export default TextField.extend({
  attributeBindings: ['disabled'],
  disabled: alias('column.disabled')
})
