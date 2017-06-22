import Ember from 'ember'
import EmberDataRouteMixin from 'ember-data-route'

const {
  Mixin,
  A,
  inject: { service }
} = Ember

const relationshipsFor = model => {
  const relationships = []

  model.get('constructor.relationshipsByName').forEach(relationship =>
    relationships.push(relationship))

  return A(relationships)
}

export default Mixin.create(EmberDataRouteMixin, {
  admin: service(),

  setupController(controller, model) {
    this._super(controller, model)
    controller.set('relationships', relationshipsFor(model))
  },

  willTransitionConfirm() {
    return window.confirm(
      'You have unsaved changes. Are you sure you want to continue?'
    )
  }
})
