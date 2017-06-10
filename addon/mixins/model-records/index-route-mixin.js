import Ember from 'ember'

const {
  Mixin,
  inject: { service }
} = Ember

export default Mixin.create({
  admin: service(),

  queryParams: {
    'filter[keyword]': { refreshModel: true },
    page: { refreshModel: true },
    size: { refreshModel: true }
  },

  extractQueryParams(params) {
    const queryParams = {}
    const keys = ['page', 'filter[keyword]', 'size']
    keys.forEach(key => {
      if (params[key]) {
        queryParams[key] = params[key]
      }
    })
    return queryParams
  }
})
