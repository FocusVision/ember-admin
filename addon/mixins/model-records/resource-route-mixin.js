import Ember from 'ember'
import EmberDataRouteMixin from 'ember-data-route'

const {
  computed,
  getOwner,
  Mixin,
  String: { singularize },
  inject: { service }
} = Ember

export default Mixin.create(EmberDataRouteMixin, {
  admin: service(),

  recordType: computed(function() {
    return singularize(this.paramsFor('admin.model-records').name)
  }),

  setupController(controller, model) {
    this._super(controller, model)
    controller.set('_recordType', this.get('recordType'))
  },

  willTransitionConfirm() {
    return window.confirm(
      'You have unsaved changes. Are you sure you want to continue?'
    )
  }
})
