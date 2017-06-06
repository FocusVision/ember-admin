import { Model, hasMany } from 'ember-cli-mirage'

export default Model.extend({
  toys: hasMany('toy')
})
