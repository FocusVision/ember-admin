/*jshint node:true*/
module.exports = {
  scenarios: [
    {
      name: 'ember-lts',
      npm: {
        devDependencies: {
          "ember": "~2.12.0"
        }
      }
    },
    {
      name: 'ember-latest',
      npm: {
        devDependencies: {
          "ember": "release"
        },
        resolutions: {
          "ember": "release"
        }
      }
    },
    {
      name: 'ember-beta',
      allowedToFail: true,
      npm: {
        devDependencies: {
          "ember": "beta"
        },
        resolutions: {
          "ember": "beta"
        }
      }
    },
    {
      name: 'ember-canary',
      allowedToFail: true,
      npm: {
        devDependencies: {
          "ember": "canary"
        },
        resolutions: {
          "ember": "canary"
        }
      }
    },
    {
      name: 'ember-alpha',
      allowedToFail: true,
      npm: {
        devDependencies: {
          "ember": "alpha"
        },
        resolutions: {
          "ember": "alpha"
        }
      }
    }
  ]
};
