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
  visitCatEdit: visitable('/admin/cat/:cat_id/edit'),
  visitCatNew: visitable('/admin/cat/new'),
  visitBirdEdit: visitable('/admin/bird/:bird_id/edit'),
  visitOwnerEdit: visitable('/admin/owner/:owner_id/edit'),
  visitDogs: visitable('/admin/dogs'),
  visitDogsEdit: visitable('/admin/dogs/:dog_id/edit'),
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
    itemScope: '.owner table tbody tr',
    item: {
      id: text('td', { at: 0 }),
      name: text('td', { at: 1 })
    }
  }),

  toys: collection({
    itemScope: '.toy table tbody tr',
    item: {
      id: text('td', { at: 0 }),
      name: text('td', { at: 1 })
    }
  }),

  courses: collection({
    itemScope: '.course table tbody tr'
  }),

  paginatorIsVisible: isVisible('[data-test=fv-paginator]'),
  paginatorPages: collection({
    itemScope: '[data-test=fv-paginator-page]',
    item: {
      click: clickable('[data-test=link-to]')
    }
  }),

  filterBy: fillable('input[data-test=filter-input]'),
  fillInName: fillable('input[data-test=edit-input-name]'),
  fillInAge: fillable('input[data-test=edit-input-age]'),
  fillInTitle: fillable('input[data-test=edit-input-title]'),


  formLabelName: text('label[data-test=form-label-name]'),

  clickModelTypeCat: clickable('a[data-test=models-list-item-cat]'),
  clickFirstCatRecord: clickable('a[data-test=record-list-item]', {
    at: 0
  }),

  clickLastToyRecord: clickable('a[data-test=record-list-item]', {
    at: 2
  }),

  clickCreateToyRelationship: clickable('a[data-test=button-create-toy]'),
  clickCreateCourseRelationship: clickable('a[data-test=button-create-course]'),

  clickSave: clickable('button[data-test=button-save]'),
  clickDelete: clickable('button[data-test=button-delete]'),
  clickCancel: clickable('button[data-test=button-cancel]'),
  clickCreate: clickable('a[data-test=button-create]')
})
