import Ember from 'ember'
import layout from 'ember-admin/templates/components/admin-table-two'

const {
  Component,
  isArray,
  computed,
  A
} = Ember

export default Component.extend({
  layout,
  tagName: 'table',

  model: null,
  columns: A(),

  dataTest: computed(function() {
    return `admin-table-${this.get('recordType')}`
  }),

  normalizedModel: computed('model', function() {
    const model = this.get('model')

    if (isArray(model)) {
      return model
    }

    return A([model])
  }),

  registerColumn(column) {
    this.get('columns').pushObject(column)
  },

  unregisterColumn(column) {
    this.get('columns').removeObject(column)
  }
})
