import Ember from 'ember'

const {
  Route,
  inject: { service },
  String: { singularize }
} = Ember

export default Route.extend({
  admin: service(),

  model(params) {
    return this.get('admin.store').query(
      singularize(
        this.paramsFor('admin.model-records.show.related').relationship_name
      ),
      params
    )
  }
})
