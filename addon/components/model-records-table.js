import Ember from 'ember'
import ColumnsMixin from 'ember-admin/mixins/model-records/columns'

const {
  get,
  set,
  isNone,
  computed,
  computed: { alias },
  getOwner,
  run: { debounce },
  Component
} = Ember

export default Component.extend(ColumnsMixin, {
  includedColumns: ['id'],

  didReceiveAttrs(...args) {
    this._super(...args)

    const owner = getOwner(this)
    const templateAdminPath = get(this, 'templateAdminPath') || 'admin/index'
    let templatePath = `${templateAdminPath}/${get(this, 'recordType')}`
    if (!owner.resolveRegistration(`template:${templatePath}`)) {
      templatePath = `${templateAdminPath}/default`
    }

    set(this, 'layout', owner.resolveRegistration(`template:${templatePath}`))
  },

  relationshipGiven: computed('relationshipName', 'relationshipId', function() {
    return get(this, 'relationshipName') && get(this, 'relationshipId')
  }),

  hideCreate: computed('relationshipName', 'relationshipId', function() {
    const relationshipName = get(this, 'relationshipName')
    const relationshipId = get(this, 'relationshipId')

    if (relationshipId) {
      if (isNone(relationshipName)) {
        return true
      }
      const { store } = this.admin
      const constructor = store.modelFor(get(this, 'recordType'))
      const { kind } = constructor.inverseFor(relationshipName, store)

      if (kind === 'belongsTo' && get(this, 'records.length') > 0) {
        return true
      }
    }

    return false
  }),

  pageCount: alias('records.meta.page-count'),

  updateQueryParams() {
    const filter = this.get('filter')
    this.transitionToRoute({ queryParams: { 'filter[keyword]': filter }})
  },

  actions: {
    filterChange() {
      debounce(this, this.updateQueryParams, 500)
    }
  }
})
