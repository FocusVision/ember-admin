import Ember from 'ember'
import layout from 'ember-admin/templates/components/admin-form'

const {
  Component,
  getOwner,
  computed
} = Ember

export default Component.extend({
  layout,
  classNames: ['admin-form'],

  excludedColumns: ['id'],

  currentRouteName: computed('currentPath', function() {
    const actionName = getOwner(this)
      .lookup('controller:application')
      .currentPath
      .split('.')
      .pop()

    return ['edit', 'new'].includes(actionName) ? actionName : 'edit'
  }),

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
