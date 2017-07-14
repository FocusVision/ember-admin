import { Model, hasMany, belongsTo } from 'ember-cli-mirage'

export default Model.extend({
  profile: belongsTo('profile', { inverse: 'owner' }),
  birds: hasMany('bird', { inverse: 'owner' }),
  cats: hasMany('cat', { inverse: 'owner' }),
  dogs: hasMany('dog', { inverse: 'owner' }),
  courses: hasMany('course', { inverse: 'owners' })
})
