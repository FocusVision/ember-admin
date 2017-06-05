import Ember from 'ember'
import EmberDataRouteMixin from 'ember-data-route'

const {
  get,
  getOwner,
  Mixin
} = Ember

export default Mixin.create(EmberDataRouteMixin, {
  renderTemplate() {
    const templatePath =
      `${this.templateAdminPath}/${this.paramsFor('model-records').name}`
    const defaultTemplatePath = `${this.templateAdminPath}/default`

    if (getOwner(this).lookup(`template:${templatePath}`)) {
      this.render(templatePath)
    } else {
      this.render(defaultTemplatePath)
    }
  },
  willTransitionConfirm() {
    return window.confirm(
      'You have unsaved changes. Are you sure you want to continue?'
    )
  }
})
