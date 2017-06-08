import ApplicationSerializer from './application'


export default ApplicationSerializer.extend({
  attrs: {
    foo: { serialize: false },
    fleas: { serialize: false }
  }
})
