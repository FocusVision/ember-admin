import Ember from 'ember'
import EmberDataRouteMixin from 'ember-data-route'

const {
  Mixin,
  inject: { service }
} = Ember

export default Mixin.create(EmberDataRouteMixin, {
  admin: service(),

  willTransitionConfirm() {
    return window.confirm(
      'You have unsaved changes. Are you sure you want to continue?'
    )
  }
})
