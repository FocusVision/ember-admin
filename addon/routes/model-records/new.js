import Ember from 'ember'
import WriteMixin from 'ember-admin/mixins/model-records/write'

const {
  Route,
  String: { singularize }
} = Ember

export default Route.extend(WriteMixin, {
  templateAdminPath: 'admin/new',
  model() {
    return this.admin.store.createRecord(
      singularize(this.paramsFor('model-records').name)
    )
  }
})
