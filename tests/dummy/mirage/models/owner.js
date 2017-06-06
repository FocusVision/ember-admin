import { Model, hasMany } from 'ember-cli-mirage'

export default Model.extend({
  cats: hasMany('cat'),
  courses: hasMany('course')
})
