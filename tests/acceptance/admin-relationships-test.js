import { describe, it, before, after, beforeEach, afterEach } from 'mocha'
import { expect } from 'chai'
import startApp from '../helpers/start-app'
import destroyApp from '../helpers/destroy-app'
import { findAll } from 'ember-native-dom-helpers'
import page from '../pages/model-index'

describe('Acceptance: Admin Relationships', () => {
  let application

  const toyNames = ['Ball', 'Mouse']
  const ownerName = 'Pat Sullivan'

  beforeEach(() => {
    application = startApp()

    const owner = server.create('owner', { name: ownerName })
    const toys = toyNames.map(
      toy => server.create('toy', { name: toy })
    )
    server.create('cat', { owner, toys })
  })
  afterEach(() => destroyApp(application))

  before(() => {
    // server = new Pretender(function() {
    //   this.get('/admin/cats', () =>
    //     ([
    //       200,
    //       { 'Content-Type': 'application/json' },
    //       JSON.stringify({ cats: [], owners: [], toys: [] })
    //     ])
    //   )
    //   this.get('/admin/cats/1', () => {
    //     const cats = [
    //       { id: 1, name: 'Felix', age: 10, owner: 1, toys: [1, 2] }
    //     ]
    //     const owners = [
    //       { id: 1, name: 'Pat Sullivan', cats: [1] }
    //     ]
    //     const toys = [
    //       { id: 1, name: 'Ball', cat: 1 },
    //       { id: 2, name: 'Mouse', cat: 1 }
    //     ]
    //     return [
    //       200,
    //       { 'Content-Type': 'application/json' },
    //       JSON.stringify({ cats, owners, toys })
    //     ]
    //   })
    //   this.get('/admin/birds', () =>
    //     [
    //       200,
    //       { 'Content-Type': 'application/json' },
    //       JSON.stringify({ birds: [], toys: [] })
    //     ]
    //   )
    //   this.get('/admin/birds/1', () => {
    //     const birds = [
    //       { id: 1, name: 'Boomer', toys: [3] }
    //     ]
    //     const toys = [
    //       { id: 3, name: 'Duck', bird: 1 }
    //     ]
    //     return [
    //       200,
    //       { 'Content-Type': 'application/json' },
    //       JSON.stringify({ birds, toys })
    //     ]
    //   })
    //   this.post('/admin/toys', request => {
    //     toy = JSON.parse(request.requestBody).toy
    //     toy.id = 3
    //
    //     return [
    //       200,
    //       { 'Content-Type': 'application/json' },
    //       JSON.stringify({ toys: [toy] })
    //     ]
    //   })
    //   this.post('/admin/courses', request => {
    //     const { course } = JSON.parse(request.requestBody)
    //     course.id = 3
    //
    //     return [
    //       200,
    //       { 'Content-Type': 'application/json' },
    //       JSON.stringify({ courses: [course] })
    //     ]
    //   })
    //   this.get('/admin/toys', () => {
    //     const toys = [
    //       { id: 1, name: 'Ball', cat: 1 },
    //       { id: 2, name: 'Mouse', cat: 1 }
    //     ]
    //
    //     if (toy) {
    //       toys.push(toy)
    //     }
    //     return [
    //       200,
    //       { 'Content-Type': 'application/json' },
    //       JSON.stringify({ toys })
    //     ]
    //   })
    //   this.get('/admin/owners', () =>
    //     [
    //       200,
    //       { 'Content-Type': 'application/json' },
    //       JSON.stringify({ owners: [] })
    //     ]
    //   )
    //   this.get('/admin/courses', () =>
    //     [
    //       200,
    //       { 'Content-Type': 'application/json' },
    //       JSON.stringify({ courses: [] })
    //     ]
    //   )
    //   this.get('/admin/owners/1', () => {
    //     const owners = [{ id: 1, name: 'Brian', courses: [1] }]
    //     const courses = [{ id: 1, title: 'Teach Your Dog', owners: [1] }]
    //
    //     return [
    //       200,
    //       { 'Content-Type': 'application/json' },
    //       JSON.stringify({ owners, courses })
    //     ]
    //   })
    // })
  })

  after(() => {
    // server.shutdown()
  })


  it('should list relationships', async () => {
    await page.visitCatEdit({ cat_id: 1 })

    expect(page.owners().count).to.equal(1)
    expect(page.owners().text).to.include(ownerName)
    expect(page.toys().count).to.equal(2)
    expect(page.toys().text.split(' ')).to.include.members(toyNames)
  })

  it('should create new model as a relationship to parent', async () => {
    await page
      .visitCatEdit({ cat_id: 1 })
      .clickCreateToyRelationship()
      .fillInName('Bell')
      .clickSave()

    expect(page.toys().count).to.equal(3)
    expect(page.toys(2).name).to.equal('Bell')
  })

  it(
    'should not display "Create" if singular relationship model exists',
    async () => {
      await page.visitCatEdit({ cat_id: 1 })

      expect(findAll('a[data-test=button-create]')).to.have.length(0)
    }
  )

  it(
    'should not display "Create" if no inverse relationship exists',
    async () => {
      const toys = server.createList('toy', 1, { name: 'Bird toy' })
      server.create('bird', { toys })

      await page.visitBirdEdit({ bird_id: 1 })

      expect(page.toys().count).to.equal(1)
      expect(findAll('a[data-test=button-create]')).to.have.length(0)
    }
  )

  it(
    'should properly create Many-to-Many relationship with inverse',
    async () => {
      const courses = server.createList('course', 1)
      server.create('owner', { courses })

      await page.visitOwnerEdit({ owner_id: 2 })

      expect(page.courses().count).to.equal(1)

      await page
        .clickCreateCourseRelationship()
        .fillInTitle('New Course!')
        .clickSave()

      expect(page.courses().count).to.equal(2)
    }
  )
})
