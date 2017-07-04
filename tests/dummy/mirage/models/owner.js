import { Model, hasMany } from 'ember-cli-mirage'

export default Model.extend({
  birds: hasMany('bird', { inverse: 'owner' }),
  cats: hasMany('cat', { inverse: 'owner' }),
  dogs: hasMany('dog', { inverse: 'owner' }),
  courses: hasMany('course', { inverse: 'owners' })
})
