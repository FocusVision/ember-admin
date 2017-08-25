import Ember from 'ember'
import DS from 'ember-data'
import AdminAdapterMixin from 'ember-admin/mixins/admin-adapter-mixin'

const {
  JSONAPIAdapter
} = DS

export default JSONAPIAdapter.extend(AdminAdapterMixin, {
  coalesceFindRequests: true,
  pathForType(type) {
    return Ember.String.pluralize(type)
  }
})
