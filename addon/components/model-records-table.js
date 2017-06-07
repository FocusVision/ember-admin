import Ember from 'ember'
import ColumnsMixin from 'ember-admin/mixins/model-records/columns'

const {
  get,
  set,
  isBlank,
  isNone,
  computed,
  computed: { alias },
  getOwner,
  Component
} = Ember

export default Component.extend(ColumnsMixin, {
  includedColumns: ['id'],

  pageCount: alias('records.meta.page-count'),

  didReceiveAttrs(...args) {
    this._super(...args)

    const owner = getOwner(this)
    let templatePath = `admin/index/${get(this, 'recordType')}`
    if (!owner.resolveRegistration(`template:${templatePath}`)) {
      templatePath = 'admin/index/default'
    }

    set(this, 'layout', owner.resolveRegistration(`template:${templatePath}`))
  },

  filteredRecords: computed('records', 'filter', function() {
    if (isBlank(get(this, 'filter'))) {
      return get(this, 'records')
    }

    const filter = get(this, 'filter').toLowerCase()
    const columns = get(this, 'filteredColumns')

    return get(this, 'records').filter(record => {
      let value

      for (let i = 0; i < columns.length; i++) {
        value = (get(record, columns[i]) || '').toString().toLowerCase()

        if (value.indexOf(filter) > -1) {
          return true
        }
      }

      return false
    })
  }),

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
  })
})
