import DS from 'ember-data'
import HasManyQuery from 'ember-data-has-many-query'

const {
  attr,
  hasMany,
  belongsTo,
  Model
} = DS
const { ModelMixin } = HasManyQuery

export default Model.extend(ModelMixin, {
  name: attr('string'),

  profile: belongsTo('profile', { inverse: 'owner' }),
  birds: hasMany('bird', { inverse: 'owner' }),
  cats: hasMany('cat', { inverse: 'owner' }),
  dogs: hasMany('dog', { inverse: 'owner' }),
  courses: hasMany('course', { inverse: 'owners' })
})
