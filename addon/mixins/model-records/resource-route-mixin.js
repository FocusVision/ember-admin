import Ember from 'ember'
import EmberDataRouteMixin from 'ember-data-route'

const {
  computed,
  getOwner,
  Mixin,
  String: { singularize }
} = Ember

export default Mixin.create(EmberDataRouteMixin, {
  templateAdminPath: null,

  recordType: computed(function() {
    return singularize(this.paramsFor('model-records').name)
  }),

  templatePath: computed('recordType', function() {
    return `${this.get('templateAdminPath')}/${this.get('recordType')}`
  }),

  defaultTemplatePath: computed(function() {
    return `${this.get('templateAdminPath')}/default`
  }),

  templateName: computed('templatePath', function() {
    const {
      templatePath,
      defaultTemplatePath
    } = this.getProperties('templatePath', 'defaultTemplatePath')

    return getOwner(this).lookup(`template:${templatePath}`) ?
      templatePath :
      defaultTemplatePath
  }),

  renderTemplate() {
    this.render(this.get('templateName'))
  },

  willTransitionConfirm() {
    return window.confirm(
      'You have unsaved changes. Are you sure you want to continue?'
    )
  }
})
