import Ember from 'ember'
import layout from 'ember-admin/templates/components/admin-table'
import FilteredColumnsMixin
  from 'ember-admin/mixins/model-records/filtered-columns-mixin'

const {
  Component,
  isArray,
  computed,
  A
} = Ember

export default Component.extend({
  layout,

  dataTest: computed(function() {
    return `admin-table-${this.get('recordType')}`
  }),

  model: null,
  columns: computed(() => A()),

  registerColumn(column) {
    this.get('columns').pushObject(column)
  },

  unregisterColumn(column) {
    this.get('columns').removeObject(column)
  }
})
