import { Factory, faker } from 'ember-cli-mirage'

const {
  name: { firstName },
  random: { number, arrayElement }
} = faker

export default Factory.extend({
  name: firstName,
  age: () => number({ min: 1, max: 20 }),
  fleas: () => arrayElement([true, false])
})
