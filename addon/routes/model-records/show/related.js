import Ember from 'ember'
import WriteMixin from 'ember-admin/mixins/model-records/write'

const {
  Route
} = Ember

export default Route.extend(WriteMixin, {
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
  },
  templateAdminPath: 'admin/related'
})
