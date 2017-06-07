import Ember from 'ember'
import WriteMixin from 'ember-admin/mixins/model-records/write'

const {
  Route,
  String: { singularize }
} = Ember

export default Route.extend(WriteMixin, {
  model(params) {
    const modelName = singularize(this.paramsFor('model-records').name)
    return this.admin.store
      .find(modelName, params.id)
  },
  templateAdminPath: 'admin/edit'
})
