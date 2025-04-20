module.exports = {
  apps: [
    {
      name: 'SharpArchive',
      exec_mode: 'cluster',
      instances: 'max',
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start',
      autorestart: true,
    },
    {
      name: 'SharpArchiveApi',
      instances: 1,
      script: './server/server.js',
    },
    {
      name: 'SharpArchiveDev',
      exec_mode: 'fork',
      instances: 1,
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start',
      autorestart: true,
    },
    {
      name: 'SharpArchiveStaging',
      exec_mode: 'fork',
      instances: 1,
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start',
      autorestart: true,
    },

    {
      name: 'SharpArchiveAlert',
      exec_mode: 'fork',
      instances: 1,
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start',
      autorestart: true,
      env: {
        PORT: 4000,
      },
    },
  ],
}
