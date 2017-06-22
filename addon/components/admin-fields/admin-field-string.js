import Ember from 'ember'

const {
  TextField,
  computed: { alias }
} = Ember

export default TextField.extend({
  classNames: ['fv-text-control'],
  attributeBindings: ['disabled'],
  disabled: alias('column.disabled')
})
