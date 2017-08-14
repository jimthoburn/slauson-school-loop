
'use strict';

var fs = require('fs');
var jsdom = require("jsdom");

var extraSectionsData = [];

jsdom.env(
  'http://ahs-ausd-ca.schoolloop.com/cms/page_view?d=x&piid=&vpid=1344353760609',
  function (err, window) {
    var document = window.document;
    var element = document.getElementById('nav_page');
    var data = {
      title: element.querySelector('.title').textContent,
      pages: []
    }
    var links = element.querySelectorAll('a');
    var href;
    for (var index = 0; index < links.length; index++) {
      href = links[index].getAttribute('href');
      console.log('adding: ' + href);
      data.pages.push({
        url: href,
        title: links[index].textContent
      });
    }

    extraSectionsData.push(data);

    fs.writeFile('../_data/pages-extra.json', JSON.stringify(extraSectionsData), 'utf8', (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
);
