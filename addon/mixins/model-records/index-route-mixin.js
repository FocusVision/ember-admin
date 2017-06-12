import Ember from 'ember'

const {
  computed,
  computed: { alias },
  inject: { service },
  Mixin,
  String: { singularize }
} = Ember

export default Mixin.create({
  admin: service(),

  queryParams: {
    'filter[keyword]': { refreshModel: true, replace: true },
    page: { refreshModel: true, replace: true },
    size: { refreshModel: true, replace: true }
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
