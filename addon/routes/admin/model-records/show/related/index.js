import Ember from 'ember'
import IndexRouteMixin
  from 'ember-admin/mixins/model-records/index-route-mixin'

const {
  Route,
  inject: { service },
  String: { singularize }
} = Ember

export default Route.extend(IndexRouteMixin, {
  model(params) {
    const modelName = singularize(
      this.paramsFor('admin.model-records.show.related').relationship_name
    )

    return this.get('admin.store')
      .query(modelName, this.extractQueryParams(params))
  }
})
