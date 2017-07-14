import Ember from 'ember'
import IndexRouteMixin
  from 'ember-admin/mixins/model-records/index-route-mixin'

const {
  Route,
  String: { singularize }
} = Ember

export default Route.extend(IndexRouteMixin, {
  model(params) {
    const modelName = this._modelName()

    return this.get('admin.store').query(
      modelName,
      this.extractQueryParams(params)
    )
  },

  setupController(controller, model) {
    this._super(controller, model)

    controller.set('recordType', this._modelName())
  },

  _modelName() {
    return singularize(this.paramsFor('admin.model-records').name)
  }
})
