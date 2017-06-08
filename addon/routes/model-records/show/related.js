import Ember from 'ember'
import PaginatedRouteMixin
  from 'ember-admin/mixins/model-records/paginated-route'

const {
  Route
} = Ember

export default Route.extend(PaginatedRouteMixin, {
  model(params) {
    const queryParams = {}
    const keys = ['page', 'filter', 'size']
    keys.forEach(key => {
      if (params[key]) {
        queryParams[key] = params[key]
      }
    })
    return this
      .modelFor('model-records.show')
      .query(params.relationship_name, queryParams)
  }
})
