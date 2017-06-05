import Ember from 'ember'
import WriteMixin from 'ember-admin/mixins/model-records/write'

const {
  get,
  Route,
  RSVP: { Promise }
} = Ember

export default Route.extend(WriteMixin, {
  model(params) {
    return this.admin.store
      .find(this.paramsFor('model-records').name, params.id)
  },
  templateAdminPath: 'admin/edit'
})
