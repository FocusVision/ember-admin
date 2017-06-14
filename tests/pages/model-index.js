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
    itemScope: '.cat table thead',
    item: {
      id: text('td', { at: 0 }),
      name: text('td', { at: 1 }),
      age: text('td', { at: 2 })
    }
  }),

  cats: collection({
    itemScope: '.cat table tbody tr',
    item: {
      id: text('td', { at: 0 }),
      name: text('td', { at: 1 }),
      age: text('td', { at: 2 })
    }
  }),

  owners: collection({
    itemScope: '[data-test=admin-table-owner] table tbody tr',
    item: {
      id: text('td', { at: 0 }),
      name: text('td', { at: 1 })
    }
  }),

  hasManyToys: isVisible('[data-test=has-many-toys]'),
  clickToys: clickable('[data-test=has-many-toys] a'),
  toys: collection({
    itemScope: '[data-test=admin-table-toy] table tbody tr',
    item: {
      id: text('td', { at: 0 }),
      name: text('td', { at: 1 })
    }
  }),

  clickCourses: clickable('[data-test=has-many-courses] a'),

  courses: collection({
    itemScope: '[data-test=admin-table-course] table tbody tr'
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
  fillInName: fillable('input[data-test=admin-field-string-name]'),
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

  clickCreateRelatedToy: clickable('a[data-test=button-create-toy]'),
  clickCreateRelatedCourse: clickable('a[data-test=button-create-course]'),
  clickOwnerRelationship: clickable('li[data-test=has-many-owner] a'),
  clickSaveRelationship: clickable('button[data-test=button-save]', {
    scope: '[data-test=admin-form-for-relationship]'
  }),

  fillInRelationshipName: fillable('input[data-test=admin-field-string-name]', {
    scope: '[data-test=admin-form-for-relationship]'
  }),
  fillInRelationshipTitle: fillable('input[data-test=admin-field-string-title]', {
    scope: '[data-test=admin-form-for-relationship]'
  })
})
