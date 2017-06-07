import Ember from 'ember'
import EmberDataRouteMixin from 'ember-data-route'

const {
  getOwner,
  Mixin,
  String: { singularize }
} = Ember

export default Mixin.create(EmberDataRouteMixin, {
  renderTemplate() {
    const templateName = singularize(this.paramsFor('model-records').name)
    const templatePath =
      `${this.templateAdminPath}/${templateName}`
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
