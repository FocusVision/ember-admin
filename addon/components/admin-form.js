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

  save() {},
  delete() {},
  cancel() {},
  onUpdate() {},

  actions: {
    save() {
      this.save()
    },

    delete() {
      this.delete()
    },

    cancel() {
      this.cancel()
    },

    onUpdate(key, val) {
      this.onUpdate(key, val)
    },

    preventDefault(e) {
      e.preventDefault()
    }
  }
})
