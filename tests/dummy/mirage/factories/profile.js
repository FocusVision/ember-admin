import { Factory, faker } from 'ember-cli-mirage'

const {
  phone: { phoneNumber }
} = faker

export default Factory.extend({
  phoneNumber
})
