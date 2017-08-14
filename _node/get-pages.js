
'use strict';

var OPTIONS = require('./make-pages-options.js');

var fs = require('fs');
var jsdom = require("jsdom");

var sectionsData = OPTIONS.SECTIONS_DATA;

function getSectionData(element) {
  var sectionData = {
    title: element.querySelector('h2').textContent,
    pages: []
  }
  console.log('# ' + sectionData.title);
  var links = element.querySelectorAll('a');
  var href;
  for (var index = 0; index < links.length; index++) {
    href = links[index].getAttribute('href');
    console.log('adding: ' + href);
    sectionData.pages.push({
      url: href,
      title: links[index].textContent
    });
  }
  return sectionData;
}

jsdom.env(
  OPTIONS.SITE_MAP_URL,
  function (err, window) {
    var document = window.document;
    var sections = document.querySelectorAll('.site_map > div:not(.content_spacing)');

    for (var index = 0; index < sections.length; index++) {
      sectionsData.push(getSectionData(sections[index]));
    }

    fs.writeFile('../_data/pages.json', JSON.stringify(sectionsData), 'utf8', (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
);
