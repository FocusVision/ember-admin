import { Model, hasMany, belongsTo } from 'ember-cli-mirage'

export default Model.extend({
  toys: hasMany('toy'),
  owner: belongsTo('owner')
})
