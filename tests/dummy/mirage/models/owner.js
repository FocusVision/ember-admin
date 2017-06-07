import { Model, hasMany } from 'ember-cli-mirage'

export default Model.extend({
  birds: hasMany('bird'),
  cats: hasMany('cat'),
  dogs: hasMany('dog'),
  courses: hasMany('course')
})
