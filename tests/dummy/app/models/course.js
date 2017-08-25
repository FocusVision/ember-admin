import DS from 'ember-data'
import AdminModelMixin from 'ember-admin/mixins/admin-model-mixin'

const {
  attr,
  hasMany,
  Model
} = DS

export default Model.extend(AdminModelMixin, {
  title: attr('string'),

  owners: hasMany('owner', { inverse: 'courses' })
})
