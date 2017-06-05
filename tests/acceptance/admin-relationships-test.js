import Ember from 'ember'
import { describe, it, before, after, beforeEach, afterEach } from 'mocha'
import { expect } from 'chai'
import startApp from '../helpers/start-app'
import destroyApp from '../helpers/destroy-app'
import { visit, findAll } from 'ember-native-dom-helpers'
import {
  rowValuesEqual,
  inputPropertiesEqual
} from '../helpers/equality-helpers'
import Pretender from 'pretender'
import page from '../pages/model-index'

const {
  run
} = Ember

describe('Acceptance: Admin Relationships', () => {
  let application
  let server
  let toy
  beforeEach(() => application = startApp())
  afterEach(() => destroyApp(application))

  before(() => {
    server = new Pretender(function() {
      this.get('/admin/cats', () =>
        [
          200,
          { 'Content-Type': 'application/json' },
          JSON.stringify({ cats: [], owners: [], toys: [] })
        ]
      )
      this.get('/admin/cats/1', () => {
        const cats = [
          { id: 1, name: 'Felix', age: 10, owner: 1, toys: [1, 2] }
        ]
        const owners = [
          { id: 1, name: 'Pat Sullivan', cats: [1] }
        ]
        const toys = [
          { id: 1, name: 'Ball', cat: 1 },
          { id: 2, name: 'Mouse', cat: 1 }
        ]
        return [
          200,
          { 'Content-Type': 'application/json' },
          JSON.stringify({ cats, owners, toys })
        ]
      })
      this.get('/admin/birds', () =>
        [
          200,
          { 'Content-Type': 'application/json' },
          JSON.stringify({ birds: [], toys: [] })
        ]
      )
      this.get('/admin/birds/1', () => {
        const birds = [
          { id: 1, name: 'Boomer', toys: [3] }
        ]
        const toys = [
          { id: 3, name: 'Duck', bird: 1 }
        ]
        return [
          200,
          { 'Content-Type': 'application/json' },
          JSON.stringify({ birds, toys })
        ]
      })
      this.post('/admin/toys', request => {
        toy = JSON.parse(request.requestBody).toy
        toy.id = 3

        return [
          200,
          { 'Content-Type': 'application/json' },
          JSON.stringify({ toys: [toy] })
        ]
      })
      this.post('/admin/courses', request => {
        const { course } = JSON.parse(request.requestBody)
        course.id = 3

        return [
          200,
          { 'Content-Type': 'application/json' },
          JSON.stringify({ courses: [course] })
        ]
      })
      this.get('/admin/toys', () => {
        const toys = [
          { id: 1, name: 'Ball', cat: 1 },
          { id: 2, name: 'Mouse', cat: 1 }
        ]

        if (toy) {
          toys.push(toy)
        }
        return [
          200,
          { 'Content-Type': 'application/json' },
          JSON.stringify({ toys })
        ]
      })
      this.get('/admin/owners', () =>
        [
          200,
          { 'Content-Type': 'application/json' },
          JSON.stringify({ owners: [] })
        ]
      )
      this.get('/admin/courses', () =>
        [
          200,
          { 'Content-Type': 'application/json' },
          JSON.stringify({ courses: [] })
        ]
      )
      this.get('/admin/owners/1', () => {
        const owners = [{ id: 1, name: 'Brian', courses: [1] }]
        const courses = [{ id: 1, title: 'Teach Your Dog', owners: [1] }]

        return [
          200,
          { 'Content-Type': 'application/json' },
          JSON.stringify({ owners, courses })
        ]
      })
    })
  })

  after(() => {
    server.shutdown()
  })

  it('should list relationships', async () => {
    await page.visitCatEdit({cat_id: 1})

    expect(page.owners(0).id).to.equal('1')
    expect(page.owners(0).name).to.equal('Pat Sullivan')

    expect(page.toys(0).id).to.equal('1')
    expect(page.toys(0).name).to.equal('Ball')

    expect(page.toys(1).id).to.equal('2')
    expect(page.toys(1).name).to.equal('Mouse')
  })

  it('should create new model as a relationship to parent', async () => {
    await page
      .visitCatEdit({cat_id: 1})
      .clickCreateToyRelationship()
      .fillInName('Bell')
      .clickSave()

    expect(page.toyCount).to.equal(3)
    expect(page.toys(2).id).to.equal('3')
    expect(page.toys(2).name).to.equal('Bell')
  })

  it(
    'should not display "Create" if singular relationship model exists',
    async () => {
      await page.visitCatEdit({cat_id: 1})

      expect(findAll('a[data-test=button-create]')).to.have.length(0)
    }
  )

  it(
    'should not display "Create" if no inverse relationship exists',
    async () => {
      await page.visitBirdEdit({ bird_id: 1 })

      expect(page.toys().count).to.equal(1)
      expect(findAll('a[data-test=button-create]')).to.have.length(0)
    }
  )

  it(
    'should properly create Many-to-Many relationship with inverse',
    async () => {
      await page.visitOwnerEdit({ owner_id: 1 })

      expect(page.courses().count).to.equal(1)

      await page.clickCreateCourseRelationship().fillInTitle('New Course!').clickSave()

      expect(page.courses().count).to.equal(2)
    }
  )
})
