import Ember from 'ember'
import layout
  from 'ember-admin/templates/components/column-actions-relationship'

const {
  Component
} = Ember

export default Component.extend({
  layout,

  actions: {
    remove(model, parentModel) {
      this.column.actionsHash.remove(model, parentModel)
    },

    add(model, parentModel) {
      this.column.actionsHash.add(model, parentModel)
    }
  }
})
