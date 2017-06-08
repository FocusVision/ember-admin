import Ember from 'ember'
import layout
  from 'ember-admin/templates/components/admin-fields/admin-field-boolean'

const {
  A,
  Component,
  computed,
  isEmpty,
  computed: { notEmpty }
} = Ember

export default Ember.Component.extend({
  layout,
  tagName: 'select',
  attributeBindings: ['dataTest:data-test'],
  dataTest: 'admin-field-boolean',

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
