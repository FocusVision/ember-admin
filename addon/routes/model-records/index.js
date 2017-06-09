import Ember from 'ember'
import IndexRouteMixin
  from 'ember-admin/mixins/model-records/index-route-mixin'

const {
  Route,
  String: { singularize }
} = Ember

export default Route.extend(IndexRouteMixin, {
  model(params) {
    return this.admin.store.query(this.get('recordType'), params)
  }
})
