import Ember from 'ember'
import { formatResourceName } from 'ember-admin/helpers/format-resource-name'

const {
  Route
} = Ember

export default Route.extend({
  afterModel(_, transition) {
    this.set('breadCrumb', {
      title: formatResourceName([transition.params['admin.model-records'].name])
    })
  },

  setupController(controller, model) {
    this._super(controller, model)

    controller.set('recordType', this.paramsFor('admin.model-records').name)
  }
})
