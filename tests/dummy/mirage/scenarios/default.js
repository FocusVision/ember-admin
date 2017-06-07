let _server

const build = (type, ...resources) =>
  resources.map(resource => _server.create(type, resource))

export default function(server) {
  _server = server

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
          age: 67,
          toys: build(
            'toy',
            { name: 'Broom' },
            { name: 'Vacuum' },
            { name: 'Duster' }
          )
        }
      )
    }
  )
}
