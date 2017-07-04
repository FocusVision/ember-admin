import Ember from 'ember'
import layout from 'ember-admin/templates/components/admin-form'
import FilteredColumnsMixin
  from 'ember-admin/mixins/model-records/filtered-columns-mixin'

const {
  Component
} = Ember

export default Component.extend(FilteredColumnsMixin, {
  layout,
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
