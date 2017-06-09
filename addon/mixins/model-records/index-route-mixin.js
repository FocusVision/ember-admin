import Ember from 'ember'

const {
  Mixin,
  computed,
  String: { singularize }
} = Ember

export default Mixin.create({
  queryParams: {
    'filter[keyword]': { refreshModel: true, replace: true },
    page: { refreshModel: true, replace: true },
    size: { refreshModel: true, replace: true }
  },

  extractQueryParams(params) {
    const queryParams = {}
    const keys = ['filter[keyword]', 'page', 'size']
    keys.forEach(key => {
      if (params[key]) {
        queryParams[key] = params[key]
      }
    })
    return queryParams
  }
})
