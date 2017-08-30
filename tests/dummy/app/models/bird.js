import DS from 'ember-data'
import AdminModelMixin from 'ember-admin/mixins/admin-model-mixin'

const {
  attr,
  belongsTo,
  Model
} = DS

export default Model.extend(AdminModelMixin, {
  name: attr('string'),
  age: attr('number'),

  owner: belongsTo('owner', { inverse: 'birds' })
})
