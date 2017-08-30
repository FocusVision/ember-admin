import DS from 'ember-data'
import AdminModelMixin from 'ember-admin/mixins/admin-model-mixin'

const {
  attr,
  hasMany,
  belongsTo,
  Model
} = DS

export default Model.extend(AdminModelMixin, {
  name: attr('string'),

  profile: belongsTo('profile', { inverse: 'owner' }),
  birds: hasMany('bird', { inverse: 'owner' }),
  cats: hasMany('cat', { inverse: 'owner' }),
  dogs: hasMany('dog', { inverse: 'owner' }),
  courses: hasMany('course', { inverse: 'owners' })
})
