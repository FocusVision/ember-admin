let _server

const build = (type, ...resources) =>
  resources.map(resource => _server.create(type, resource))

export default function(server) {
  _server = server

  server.create('course', { title: 'Dogs 101' })
  server.create('course', { title: 'Cats 101' })
  server.create('course', { title: 'Birds 101' })
  server.create('toy', { name: 'Unowned' })

  build(
    'owner',
    {
      name: 'Dr. Evil',
      cats: build(
        'cat',
        {
          name: 'Mr. Bigglesworth',
          age: 1,
          toys: build(
            'toy',
            { name: 'Brush' },
            { name: 'Laser gun' }
          )
        }
      )
    },
    {
      name: 'Granny',
      cats: build(
        'cat',
        {
          name: 'Sylvester',
          age: 6
        }
      ),
      birds: build(
        'bird',
        {
          name: 'Tweety',
          age: 3
        }
      )
    },
    {
      name: 'Wendy',
      dogs: build(
        'dog',
        {
          name: 'Nana',
          age: 67
        }
      )
    }
  )
}
