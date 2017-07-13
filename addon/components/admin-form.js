import Ember from 'ember'
import layout from 'ember-admin/templates/components/admin-form'

const {
  Component
} = Ember

export default Component.extend({
  layout,
  classNames: ['admin-form'],

  excludedColumns: ['id'],

  model: null,
  parentModel: null,
  recordType: null,

  actions: {
    save(model, parentModel) {
      this.save(model, parentModel)
    },

    delete() {
      this.delete()
    },

    cancel() {
      this.cancel()
    },

    preventDefault(e) {
      e.preventDefault()
    }
  }
})
