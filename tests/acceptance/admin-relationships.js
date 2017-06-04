import Ember from 'ember'
import { describe, it, before, after } from 'mocha'
import { expect, assert } from 'chai'
import startApp from '../helpers/start-app'
import {
  rowValuesEqual
} from '../helpers/equality-helpers'
import { fillInByLabel } from '../helpers/fill-in-by'
import Pretender from 'pretender'

const {
  run
} = Ember

let App
let server
let toy

describe('Acceptance: Admin Relationships', () => {
  before(() => {
    App = startApp()

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
    run(App, 'destroy')
    server.shutdown()
    toy = undefined
  })

  it('should list relationships', assert => {
    visit('/admin/cat/1/edit')

    andThen(() => {
      const ownerRows = find('.owner table tr')
      rowValuesEqual(assert, ownerRows.eq(0), 'id', 'name')
      rowValuesEqual(assert, ownerRows.eq(1), '1', 'Pat Sullivan')

      const toyRows = find('.toy table tr')
      rowValuesEqual(assert, toyRows.eq(0), 'id', 'name')
      rowValuesEqual(assert, toyRows.eq(1), '1', 'Ball')
      rowValuesEqual(assert, toyRows.eq(2), '2', 'Mouse')
    })
  })

  it('should create new model as a relationship to parent', assert => {
    visit('/admin/cat/1/edit')

    andThen(() => {
      click('.toy a:contains("Create")')
    })

    andThen(() => {
      fillInByLabel('name', 'Bell')
      click(find('button.save'))
    })

    andThen(() => {
      click('.toy a:contains("Bell")')
    })

    andThen(() => {
      click('.cat a:contains("Felix")')
    })

    andThen(() => {
      const toyRows = find('.toy table tr')
      rowValuesEqual(assert, toyRows.eq(3), '3', 'Bell')
    })
  })

  it(
    'should not display "Create" if singular relationship model exists',
    assert => {
      visit('/admin/cat/1/edit')

      andThen(() => {
        const createLink = find('.owner a:contains("Create")')
        assert.equal(0, createLink.length, 'should not find the Create link')
      })
    }
  )

  it(
    'should not display "Create" if no inverse relationship exists',
    assert => {
      visit('/admin/bird/1/edit')

      andThen(() => {
        const toysTable = find('.toy')
        assert.equal(
          1,
          toysTable.length,
          'should find the toy relationship table'
        )
        const createLink = find('.toy a:contains("Create")')
        assert.equal(0, createLink.length, 'should not find the Create link')
      })
    }
  )

  it(
    'should properly create Many-to-Many relationship with inverse',
    assert => {
      visit('/admin/owner/1/edit')

      andThen(() => {
        const coursesTable = find('.course')
        assert.equal(
          1,
          coursesTable.length,
          'should find the course relationship table'
        )
        click('.course a:contains("Create")')
      })

      andThen(() => {
        fillInByLabel('title', 'New Course!')
        click(find('button.save'))
      })
    }
  )
})
