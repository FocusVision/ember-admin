import DS from 'ember-data'
import HasManyQuery from 'ember-data-has-many-query'

const {
  attr,
  hasMany,
  Model
} = DS
const { ModelMixin } = HasManyQuery

export default Model.extend(ModelMixin, {
  name: attr('string'),
  birds: hasMany('bird'),
  cats: hasMany('cat', { async: true }),
  dogs: hasMany('dog', { inverse: 'owner' }),
  courses: hasMany('course', { inverse: 'owners', async: true })
})
