import Ember from 'ember'
import layout
  from 'ember-admin/templates/components/admin-fields/admin-field-boolean'

const {
  A,
  Component,
  computed,
  isEmpty,
  computed: { notEmpty, alias }
} = Ember

export default Component.extend({
  layout,
  tagName: 'select',
  attributeBindings: ['dataTest:data-test', 'disabled'],
  dataTest: computed(function() {
    return `admin-field-boolean-${this.get('column.key')}`
  }),
  disabled: alias('column.disabled'),

  data: A([true, false]),
  value: null,
  boolValue: computed('value', function() {
    const value = this.get('value')

    if (isEmpty(value)) {
      return null
    }

    return value || value === 'true'
  }),
  placeholderText: 'Select',
  hasInitialValue: notEmpty('value'),

  onUpdate: () => {},

  change(e) {
    const value = e.target.value === 'true'
    this.onUpdate(this.get('column.key'), value)
  }
})
