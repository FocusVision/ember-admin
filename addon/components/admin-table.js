import Ember from 'ember'
import layout from 'ember-admin/templates/components/admin-table'

const {
  Component,
  isArray,
  computed,
  A,
  isEmpty
} = Ember

export default Component.extend({
  layout,
  tagName: 'table',
  dataTest: computed(function() {
    return `admin-table-${this.get('recordType')}`
  }),

  model: null,
  columns: computed(() => A()),

  normalizedModel: computed('model', function() {
    const model = this.get('model')

    if (isArray(model)) {
      return model
    }

    return isEmpty(model) ? A([]) : A([model])
  }),

  registerColumn(column) {
    this.get('columns').pushObject(column)
  },

  unregisterColumn(column) {
    this.get('columns').removeObject(column)
  },

  onRowClick() {},

  actions: {
    onRowClick(model) {
      this.onRowClick(model)
    }
  }
})
