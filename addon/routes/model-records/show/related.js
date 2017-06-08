import Ember from 'ember'

const {
  Route
} = Ember

export default Route.extend({
  queryParams: {
    filter: { refreshModel: true },
    page: { refreshModel: true }
  },
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
