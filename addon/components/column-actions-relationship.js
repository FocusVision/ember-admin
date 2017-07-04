import Ember from 'ember'
import layout
  from 'ember-admin/templates/components/column-actions-relationship'

const {
  Component
} = Ember

export default Component.extend({
  layout,

  actions: {
    remove(model) {
      this.column.actionsHash.remove(model)
    },

    add(model) {
      this.column.actionsHash.add(model)
    }
  }
})
