import { Model, hasMany } from 'ember-cli-mirage'

export default Model.extend({
  birds: hasMany('bird', { inverse: 'owners' }),
  cats: hasMany('cat', { inverse: 'owners' }),
  dogs: hasMany('dog', { inverse: 'owners' }),
  courses: hasMany('course', { inverse: 'owners' })
})
