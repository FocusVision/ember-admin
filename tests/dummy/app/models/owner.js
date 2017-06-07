import DS from 'ember-data'

const {
  attr,
  hasMany,
  Model
} = DS

export default Model.extend({
  name: attr('string'),
  birds: hasMany('bird'),
  cats: hasMany('cat', { async: true }),
  dogs: hasMany('dog', { inverse: 'owner' }),
  courses: hasMany('course', { inverse: 'owners', async: true })
})
