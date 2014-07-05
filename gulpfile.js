// User configs

var configs = {
  buildAssets: 'build/public/assets/',
  buildAssetsVendor: 'build/public/assets/vendor/',
  buildHtml: 'build/public/',
  buildPublic: 'build/public/',
  buildSrc: 'build/public/',
  buildSrcDemo: 'build/public/demo/',
  buildTmpSrc: 'build/demo/',
  buildVendor: 'build/public/vendor/',

  compileMainJs: 'main.js',

  compileAssets: 'bin/public/assets/',
  compileAssetsVendor: 'bin/public/assets/vendor/',
  compileHtml: 'bin/public/',
  compilePublic: 'bin/public/',
  compileSrc: 'bin/public/src/',

  mbTmpSrc: 'build/mb/',
  rootFiles: ['public/**/*.*']
};

var appFiles = {
  assets: ['demo/assets/**/*.*'],
  html: ['demo/index.html'],
  jsx: ['demo/src/**/*.jsx'],
};

var mbFiles = {
  jsx: ['src/*.jsx', 'src/*/*.jsx'],
};

var docFiles = {
  md: ['src/*/docs/*.md'],
  jsx: ['src/*/docs/*.jsx']
};

var vendorFiles = {
  assets: [
    'vendor/bootstrap/fonts/*.*',
  ],
  js: [
    'vendor/mithril/mithril.js',
    'vendor/min-require/min-require.js'
  ],
};

var consts = {
  livereloadPort: 35729,
};

/* -------------------------------------------------------------------------- */
// Implement tasks

var fs = require('fs');
var gulp = require('gulp');
var path = require('path');
var plugins = require('gulp-load-plugins')();
var runSequence = require('run-sequence');

var colors = plugins.util.colors;
var log = plugins.util.log;

function clean(filepath, cb) {
  log('Cleaning', colors.magenta(filepath));
  gulp.src(filepath, {read: false})
    .pipe(plugins.clean({force: false}))
    .on('end', cb || function() {})
    .on('error', log);
}

function revName(filename) {
  var index = filename.search(/\.[^.]*$/);
  return filename.substr(0, index) + '-*' + filename.substr(index);
}

gulp.task('copyDocsSources', function(cb) {
  gulp.src(docFiles.jsx, {base: 'src'})
    .pipe(plugins.changed(configs.buildSrcDemo))
    .pipe(gulp.dest(configs.buildTmpSrc))
    .on('end', cb || function(){})
    .on('error', log);
});

gulp.task('buildDocsMd', function(cb) {
  gulp.src(docFiles.md, {base:'src'})
    .pipe(plugins.plumber())
    .pipe(plugins.changed(configs.buildTmpSrc, {extension: '.jsx'}))
    .pipe(plugins.markdown())
    .pipe(plugins.insert.prepend('<div>\n'))
    .pipe(plugins.insert.append('</div>'))
    .pipe(plugins.rename({
      prefix: '_',
      extname: '.jsx'
    }))
    .pipe(gulp.dest(configs.buildTmpSrc))
    .on('end', cb || function(){})
    .on('error', log);
});

gulp.task('buildDocsMsx', function(cb) {
  gulp.src(path.join(configs.buildTmpSrc, '**/docs/*.jsx'), {base: configs.buildTmpSrc})
    .pipe(plugins.plumber())
    .pipe(plugins.changed(configs.buildTmpSrc, {extension: '.js'}))
    .pipe(plugins.msx())
    // .pipe(plugins.sweetjs({modules: ['./res/template-compiler.sjs']}))
    // .pipe(plugins.size({showFiles: true}))
    .pipe(gulp.dest(configs.buildTmpSrc))
    .on('end', cb || function(){})
    .on('error', log);
});

gulp.task('buildDemoMsx', function(cb) {
  gulp.src(docFiles.jsx, {base:'src'})
    .pipe(plugins.plumber())
    .pipe(plugins.changed(configs.buildTmpSrc, {extension: '.js'}))
    .pipe(plugins.msx())
    // .pipe(plugins.sweetjs({modules: ['./res/template-compiler.sjs']}))
    // .pipe(plugins.size({showFiles: true}))
    .pipe(gulp.dest(configs.buildTmpSrc))
    .on('end', cb || function(){})
    .on('error', log);
});

// Combine *.jsx, wrap them in CommonJs style and store in build/src/app
gulp.task('buildAppScriptsInclude', function(cb) {
  gulp.src(path.join(configs.buildTmpSrc, '**/*.js'), {base: configs.buildTmpSrc})
    .pipe(plugins.plumber())
    // .pipe(plugins.changed(configs.buildSrcDemo))
    .pipe(plugins.includeJs({ext:'js', cache:true, showFiles:'Building'}))
    .pipe(plugins.includeJs({exactName: true, cache:'jsx', keyword: 'CONTENT', recursive: false, transform: function(s) { return JSON.stringify(s); }}))
    .pipe(plugins.jsPrettify({indent_size:2,max_preserve_newlines:2}))
    .pipe(plugins.wrapRequire())
    // .pipe(plugins.size({showFiles: true}))
    .pipe(gulp.dest(configs.buildSrcDemo))
    .on('end', cb || function(){})
    .on('error', log);
});

// Convert app scripts from .jsx to .js
gulp.task('buildAppScriptsMsx', function(cb) {
  gulp.src(appFiles.jsx, {base: 'demo/src'})
    .pipe(plugins.plumber())
    .pipe(plugins.changed(configs.buildTmpSrc, {extension: '.js'}))
    .pipe(plugins.msx())
    // .pipe(plugins.sweetjs({modules: ['./res/template-compiler.sjs']}))
    // .pipe(plugins.size({showFiles: true}))
    .pipe(gulp.dest(configs.buildTmpSrc))
    .on('end', cb || function(){})
    .on('error', log);
});

// Combine and convert *.jsx
gulp.task('buildAppScripts', function(cb) {
  runSequence('buildDocsMd', 'buildDocsMsx', 'buildDemoMsx', 'buildAppScriptsMsx', 'buildAppScriptsInclude', cb);
});

// Copy vendor scripts to build/public/vendor
gulp.task('buildVendorScripts', function(cb) {
  gulp.src(vendorFiles.js, {base: 'vendor'})
    .pipe(gulp.dest('build/public/vendor'))
    .on('end', cb || function(){})
    .on('error', log);
});

// Concat all scripts to bin/public/assets/main-***.js
gulp.task('compileScripts', function(cb) {
  clean(path.join(configs.compileAssets, revName(configs.compileMainJs)), _compileScripts);

  function _compileScripts() {
    var glob = [].concat(
      // vendorFiles.js || [],
      path.join(configs.buildPublic, 'vendor/min-require/min-require.js'),
      [ path.join(configs.buildSrcDemo, '**/*.js'),
        path.join('!' + configs.buildSrcDemo, '**/_*.js') ]
    );
    gulp.src(glob)
      .pipe(plugins.plumber())
      .pipe(plugins.concat(configs.compileMainJs))
      .pipe(plugins.insert.append('\n\nrequire(\'main\');\n'))
      .pipe(plugins.streamify(plugins.uglify({mangle: true})))
      .pipe(plugins.streamify(plugins.rev()))
      .pipe(plugins.size({showFiles: true}))
      .pipe(gulp.dest(configs.compileAssets))
      .on('end', cb || function() {})
      .on('error', log);
  }
});

// Copy vendor and app assets to build/public/assets
gulp.task('buildAppAssets', function(cb) {
  gulp.src(appFiles.assets, {base: 'demo/assets'})
    .pipe(plugins.changed(configs.buildAssets))
    .pipe(gulp.dest(configs.buildAssets))
    .on('end', cb || function(){})
    .on('error', log);
});

gulp.task('buildVendorAssets', function(cb) {
  gulp.src(vendorFiles.assets)
    .pipe(gulp.dest(configs.buildAssetsVendor))
    .on('end', cb || function(){})
    .on('error', log);
});

// Copy assets from build/public/assets to bin/public/assets
gulp.task('compileAssets', function(cb) {
  gulp.src(path.join(configs.buildAssets, '**/*.*'), {base: configs.buildAssets})
    .pipe(gulp.dest(configs.compileAssets))
    .on('end', cb || function(){})
    .on('error', log);
});

function injectHtml(tag, path, glob) {
  return plugins.inject(
    gulp.src(glob, {read:false}), {
      starttag: '<!-- ' + tag + '.{{ext}} -->',
      endtag: '<!-- end -->',
      addRootSlash: false,
      ignorePath: path,
      sort: function(a,b) {return a < b? -1 : a > b? 1 : 0;}
    }
  );
}

gulp.task('buildIndexHtml', function(cb) {
  gulp.src(appFiles.html)
    .pipe(plugins.plumber())
    .pipe(injectHtml('vendor', configs.buildPublic,
      [
        path.join(configs.buildAssetsVendor, '**/*.css'),
        path.join(configs.buildVendor, '**/*.js'),
        path.join(configs.buildPublic, 'assets/mithril-bootstrap.js')
      ]
    ))
    .pipe(injectHtml('demo', configs.buildPublic,
      [
        path.join(configs.buildPublic, 'assets/demo.css'),
        path.join(configs.buildSrcDemo, '**/*.js'),
        path.join('!' + configs.buildSrcDemo, '**/_*.js')
      ]
    ))
    .pipe(plugins.insert.append('<script>require(\'main\');</script>'))
    .pipe(plugins.insert.append('<script src="//localhost:' + consts.livereloadPort + '/livereload.js"></script>'))
    // .pipe(plugins.size({showFiles:true}))
    .pipe(gulp.dest(configs.buildHtml))
    .on('end', cb || function(){})
    .on('error', log);
});

gulp.task('compileIndexHtml', function(cb) {
  gulp.src(appFiles.html)
    .pipe(plugins.plumber())
    .pipe(injectHtml('demo', configs.compilePublic,
    [
      path.join(configs.compileAssets, 'vendor/bootstrap.css'),
      path.join(configs.compileAssets, 'demo.css'),
      path.join(configs.compileAssets, 'vendor/mithril.js'),
      path.join(configs.compileAssets, 'mithril-bootstrap.js'),
      path.join(configs.compileAssets, revName(configs.compileMainJs))
    ]))
    .pipe(plugins.minifyHtml())
    .pipe(plugins.size({showFiles:true}))
    .pipe(gulp.dest(configs.compileHtml))
    .on('end', cb || function(){})
    .on('error', log);
});

gulp.task('buildRootFiles', function(cb) {
  gulp.src(configs.rootFiles, {base:'.'})
    .pipe(plugins.changed('build'))
    .pipe(gulp.dest('build'))
    .on('end', cb || function(){})
    .on('error', log);
});

gulp.task('compileRootFiles', function(cb) {
  gulp.src(configs.rootFiles, {base:'.'})
    .pipe(gulp.dest('bin'))
    .on('end', cb || function(){})
    .on('error', log);
});

gulp.task('buildBootstrapMsx', function(cb) {
  gulp.src(mbFiles.jsx, {base: 'src'})
    .pipe(plugins.plumber())
    .pipe(plugins.changed(configs.mbTmpSrc, {extension: '.js'}))
    .pipe(plugins.msx())
    .pipe(gulp.dest(configs.mbTmpSrc))
    .on('end', cb || function(){})
    .on('error', log);
});

gulp.task('buildBootstrapInclude', function(cb) {
  gulp.src(path.join(configs.mbTmpSrc, '**/*.js'), {base:configs.mbTmpSrc})
    .pipe(plugins.plumber())
    .pipe(plugins.includeJs({ext:'js', cache:true, showFiles:'Building'}))
    .pipe(gulp.dest('dist'))
    .pipe(gulp.dest('build/public/assets'))
    .on('end', cb || function(){})
    .on('error', log);
});

gulp.task('buildBootstrap', function(cb) {
  runSequence('buildBootstrapMsx', 'buildBootstrapInclude', function() {
    gulp.src('dist/*.js')
      .pipe(gulp.dest(configs.buildAssets));
    cb();
  });
});

/* -------------------------------------------------------------------------- */
// Major tasks

gulp.task('clean', function(cb) {
  clean(['build', 'bin', 'dist'], cb);
});

gulp.task('build', function(cb) {
  runSequence('clean',[
      'copyDocsSources',
      'buildAppScripts', 'buildVendorScripts',
      'buildAppAssets', 'buildVendorAssets',
      'buildRootFiles', 'buildBootstrap'
    ],
    'buildIndexHtml',
    cb);
});

gulp.task('compile', function(cb) {
  runSequence('build',
    ['compileScripts', 'compileAssets', 'compileRootFiles'],
    'compileIndexHtml',
    cb);
});

gulp.task('default', ['compile']);

// Tasks to run whenever a source file changes
gulp.task('watch', function(cb) {

  var eventColors = {
    added: colors.green,
    changed: colors.magenta,
    deleted: colors.red,
    renamed: colors.green
  };
  function logChanged(e) {
    var c = eventColors[e.type] || colors.white;
    log('[' + c(e.type) + ']', colors.magenta(path.relative(process.cwd(), e.path)));
  }

  var lr = plugins.livereload(consts.livereloadPort);
  function runTasks() {
    var args = arguments;
    return function(e){ runSequence.apply(this, args); };
  }
  function reload(filepath) {
    return function(cb){ lr.changed(filepath); };
  }

  var indexHtmlPath = 'index.html';

  gulp.watch(appFiles.assets, runTasks('buildAppAssets', reload('assets/demo.css')));
  gulp.watch(appFiles.html, runTasks('buildIndexHtml', reload(indexHtmlPath)));
  gulp.watch(configs.rootFiles, runTasks('buildRootFiles'));
  gulp.watch([appFiles.jsx, docFiles.jsx, docFiles.md], function(e) {
    logChanged(e);

    runSequence('copyDocsSources', 'buildAppScripts', 'buildIndexHtml', reload(indexHtmlPath));
  });
  gulp.watch(mbFiles.jsx, function(e) {
    logChanged(e);

    runSequence('buildBootstrap', reload(indexHtmlPath));
  });
});
