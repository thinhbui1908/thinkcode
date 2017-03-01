// Curriculum
require('../html/_curriculum');

// Scrolling behaviour
// require('../html/_scroll');

// Quiz timer
require('../html/_countdown');

// Earnings chart
require('../html/_flotchart-earnings');

// Angular App
require('./app/app.js');
require('./app/config.router.js');
require('./app/demo.js');
require('./app/utils.js');
require('./app/main.js');

// Library Directives
require('essential/js/angular/main');
require('layout/js/angular/main');
require('sidebar/js/angular/main');
require('media/js/angular/main');
require('material/js/angular/main');

// Custom Directives
require('./app/directives/navbar-transition-scroll');
require('./app/directives/countdown');
require('./app/directives/curriculum');
require('./app/directives/flotchart-earnings');
require('./app/directives/material-treeview');
require('./app/directives/treeView');
require('./app/directives/abn-tree-modified');

// Angular App Services
require('./app/services/demo')
require('./app/services/users')

// Angular App Controllers
require('./app/controllers/users.controller.js')