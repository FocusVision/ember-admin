import {
  create,
  collection,
  isVisible,
  visitable,
  text,
  clickable,
  fillable
} from 'ember-cli-page-object'

export default create({
  visit: visitable('/admin'),
  visitCats: visitable('/admin/cat'),
  visitCatEdit: visitable('/admin/cat/:cat_id'),
  visitCatNew: visitable('/admin/cat/new'),
  visitBirdEdit: visitable('/admin/bird/:bird_id'),
  visitOwnerEdit: visitable('/admin/owner/:owner_id'),
  visitDogs: visitable('/admin/dogs'),
  visitDogsEdit: visitable('/admin/dogs/:dog_id'),
  visitDogsNew: visitable('/admin/dogs/new'),

  modelLinks: text('[data-test=models-list] a', {
    multiple: true
  }),

  catHeaders: collection({
    scope: 'table[data-test=admin-table-cat] thead',
    itemScope: 'tr',
    item: {
      id: text('th', { at: 0 }),
      name: text('th', { at: 1 }),
      age: text('th', { at: 2 })
    }
  }),

  cats: collection({
    scope: 'table[data-test=admin-table-cat] tbody',
    itemScope: 'tr',
    item: {
      id: text('td', { at: 0 }),
      name: text('td', { at: 1 }),
      age: text('td', { at: 2 })
    }
  }),

  owners: collection({
    itemScope: 'table[data-test=admin-table-owner] tbody tr',
    item: {
      id: text('td', { at: 0 }),
      name: text('td', { at: 1 })
    }
  }),

  hasManyToys: isVisible('table[data-test=has-many-toys]'),
  clickToys: clickable('[data-test=has-many-toys] a'),
  toys: collection({
    itemScope: 'table[data-test=admin-table-toy] tbody tr',
    item: {
      id: text('td', { at: 0 }),
      name: text('td', { at: 1 })
    }
  }),

  clickCourses: clickable('[data-test=has-many-courses] a'),

  courses: collection({
    scope: '[data-test=admin-relationship-list] table[data-test=admin-table-course] tbody',
    itemScope: 'tr',
    item: {
      id: text('td', { at: 0 }),
      title: text('td', { at: 1 }),
      remove: clickable('button[data-test=button-remove-resource-relationship]')
    }
  }),

  relationshipCourses: collection({
    scope: '[data-test=admin-relationship-select] table[data-test=admin-table-course] tbody ',
    itemScope: 'tr',
    item: {
      id: text('td', { at: '0'}),
      title: text('td', { at: '1'}),
      add: clickable('button[data-test=button-add-resource-relationship]')
    }
  }),

  paginatorIsVisible: isVisible('[data-test=fv-paginator]'),
  paginatorPages: collection({
    itemScope: '[data-test=fv-paginator-page]',
    item: {
      click: clickable('[data-test=link-to]')
    }
  }),

  filterBy: fillable('input[data-test=filter-input]'),
  fillInName: fillable('input[data-test=admin-field-string-name]'),
  fillInAge: fillable('input[data-test=admin-field-string-age]'),
  fillInTitle: fillable('input[data-test=admin-field-string-title]'),
  clickFleas: clickable('input[data-test=admin-field-boolean-fleas]'),

  formLabelName: text('label[data-test=form-label-name]'),

  clickModelTypeCat: clickable('a[data-test=models-list-item-cat]'),
  clickFirstCatRecord: clickable('a[data-test=record-list-item]', {
    at: 0
  }),
  clickLastToyRecord: clickable('a[data-test=record-list-item]', {
    at: 2
  }),

  clickSave: clickable('button[data-test=button-save]'),
  clickDelete: clickable('button[data-test=button-delete]'),
  clickCancel: clickable('button[data-test=button-cancel]'),
  clickCreate: clickable('a[data-test=button-create]'),

  //Relationships
  clickCreateRelatedToy: clickable('a[data-test=button-create-toy]'),
  clickOwnerRelationship: clickable('li[data-test=has-many-owner] a'),

  clickCreateRelatedCourse: clickable('a[data-test=button-create-course]'),
  clickAddRelatedCourse: clickable('a[data-test=button-add-course]'),

  fillInRelationshipName: fillable('input[data-test=admin-field-string-name]', {
    scope: '[data-test=admin-form-for-relationship]'
  }),
  fillInRelationshipTitle: fillable('input[data-test=admin-field-string-title]',
    { scope: '[data-test=admin-form-for-relationship]' }
  ),

  clickSaveRelationship: clickable('button[data-test=button-save]', {
    scope: '[data-test=admin-form-for-relationship]'
  })
})
