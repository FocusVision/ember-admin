import Ember from 'ember'

const {
  Checkbox,
  computed,
  computed: { alias }
} = Ember

export default Checkbox.extend({
  checked: alias('value'),
  attributeBindings: ['dataTest:data-test', 'disabled'],

  disabled: alias('column.disabled'),
  dataTest: computed(function() {
    return `admin-field-boolean-${this.get('column.key')}`
  })
})
