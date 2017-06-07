import { belongsTo, hasMany, Model } from 'ember-cli-mirage'

export default Model.extend({
  toys: hasMany('toy'),
  owner: belongsTo('owner')
})
