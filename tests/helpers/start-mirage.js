import mirageInitializer
  from 'ember-admin/initializers/ember-cli-mirage'

export default function startMirage(container) {
  mirageInitializer.initialize(container)
}
