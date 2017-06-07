import Ember from 'ember'

const {
  set,
  Route,
  String: { singularize }
} = Ember

export default Route.extend({
  // setupController(controller, model) {
  //   this._super(controller, model)
  //   set(
  //     controller,
  //     'recordType',
  //     singularize(this.paramsFor('model-records').name)
  //   )
  // }
})
