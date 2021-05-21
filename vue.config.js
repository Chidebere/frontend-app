module.exports = {
    pages: {
      index: {
        // entry for the page
        entry: './src/pages/Userpage/main.js',
        // the source template
        template: 'public/index.html',
        // output as dist/index.html
        filename: 'index.html',
        // when using title option,
        title: 'Home',
        // chunks to include on this page, by default includes
        // extracted common chunks and vendor chunks.
        chunks: ['chunk-vendors', 'chunk-common', 'index']
      },
      admin: {
        // entry for the page
        entry: './src/pages/Adminpage/main.js',
        // the source template
        template: 'public/admin.html',
        // output as dist/adminoffice.html
        filename: 'admin.html',
        // when using title option,
        title: 'Admin Login',
        // chunks to include on this page, by default includes
        // extracted common chunks and vendor chunks.
        chunks: ['chunk-vendors', 'chunk-common', 'admin']
      }
    },
    lintOnSave: process.env.NODE_ENV !== 'production',
    // proxy API requests to Valet during development
    devServer: {
      proxy: 'http://localhost:8000',
  
      historyApiFallback: {
        rewrites: [
          { from: /\/index/, to: '/index.html' },
          { from: /\/admin/, to: '/admin.html' }
        ]
      }
  
    },
  
    // output built static files to Laravel's public dir.
    // note the "build" script in package.json needs to be modified as well.
    outputDir: '../dist',
  
    indexPath: process.env.NODE_ENV === 'production'
      ? '../dist/index.html'
      : '../dist/admin.html'

  }
  