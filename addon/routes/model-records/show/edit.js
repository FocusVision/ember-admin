import Ember from 'ember'
import WriteMixin from 'ember-admin/mixins/model-records/write'

const {
  Route
} = Ember

export default Route.extend(WriteMixin, {
  model() {
    return this.modelFor('model-records.show')
  },
  templateAdminPath: 'admin/edit'
})
