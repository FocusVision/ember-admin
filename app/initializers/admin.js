import AdminStore from 'ember-admin/stores/admin'

export function initialize(app) {
  app.register('store:admin', AdminStore)
  app.inject('service:admin', 'store', 'store:admin')
}

export default {
  after: 'ember-data',
  name: 'admin',
  initialize: initialize
}
