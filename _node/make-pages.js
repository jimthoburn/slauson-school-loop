
'use strict';

var OPTIONS = require('./make-pages-options.js');

var fs = require('fs');
var path = require('path');
var jsdom = require("jsdom");
var serializeDocument = require("jsdom").serializeDocument;

function init() {
  var filePath = path.join(__dirname, '../_data/pages.json');

  fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
    if (!err) {
      makePages(JSON.parse(data));
    } else {
      console.log(err);
    }
  });
}

function makePages(pagesData) {
  pagesData.forEach(function(section) {
    section.pages.forEach(function(page) {
      var url = OPTIONS.BASE_URL + page.url;
      jsdom.env(
        url,
        function (err, window) {

          console.log('creating: ' + url);
          var document = window.document;

          makeAbsolute(document, 'src');
          updateNavigation(document, pagesData);
          replaceQueryString(document, 'href');
          removeReturnURLs(document, 'href');
          //makeAbsolute(document, 'href');

          addHeadHTML(document, OPTIONS.HEAD_ELEMENT_HTML);
          replaceLogoHTML(document, OPTIONS.LOGO_HTML);
          replaceFooterHTML(document, OPTIONS.FOOTER_HTML);
          markEmptyParagraphs(document);
          //removeNbsp(document);

          var page_generation_id = document.querySelector('meta[name="page_generation_id"]');
          if (page_generation_id) page_generation_id.parentNode.removeChild(page_generation_id);

          var statsElement = document.querySelector('img[src*="/stats/"]');
          if (statsElement) statsElement.parentNode.removeChild(statsElement);

          var fileName = (page.url == '/') ? '/index' : page.url;

          var serializedDocument = serializeDocument(document);
          serializedDocument = makeBackgroundImageURLsAbsolute(serializedDocument);

var jekyllFrontMatter = `---
layout: null
---
`;
          fs.writeFile('../' + fileName.replace('?', '-') + '.html', jekyllFrontMatter + serializedDocument, 'utf8', (err) => {
            if (err) {
              console.log(err);
            }
          });
        }
      );
    });
  });
}

function makeAbsolute(document, attribute) {
  var elements = document.querySelectorAll('*[' + attribute + ']');
  for (var index = 0; index < elements.length; index++) {
    (function(element) {
      var attributeValue = element.getAttribute(attribute);
      if (attributeValue.indexOf('/') === 0) {
        element.setAttribute(attribute, OPTIONS.BASE_URL + attributeValue);
      }
    })(elements[index]);
  }
}

function replaceQueryString(document, attribute) {
  var elements = document.querySelectorAll('*[' + attribute + ']');
  for (var index = 0; index < elements.length; index++) {
    (function(element) {
      var attributeValue = element.getAttribute(attribute);
      if (attributeValue.indexOf('?') > 0 && attributeValue.indexOf('/portal') < 0 && attributeValue.indexOf('/') === 0) {
        element.setAttribute(attribute, attributeValue.replace('?', '-'));
      }
    })(elements[index]);
  }
}

function removeReturnURLs(document, attribute) {
  var elements = document.querySelectorAll('*[' + attribute + ']');
  for (var index = 0; index < elements.length; index++) {
    (function(element) {
      var attributeValue = element.getAttribute(attribute);
      if (attributeValue.indexOf('return_url') > 0) {
        element.setAttribute(attribute, attributeValue.replace(/&return_url=[^&]*/g, ''));
      }
    })(elements[index]);
  }
}

function addHeadHTML(document, html) {
  var head = document.querySelector('head');
  head.innerHTML = head.innerHTML + html;
}

function replaceLogoHTML(document, html) {
  var element = document.querySelector('#container_header a') || document.querySelector('#container_home_header img')

  if (element) {
    element.parentNode.innerHTML = html;
  }
}

function replaceFooterHTML(document, html) {
  var footer_table = document.querySelector('.footer_table');
  if (footer_table) footer_table.parentNode.removeChild(footer_table);

  var footer_footnote = document.querySelector('.footer_footnote');
  if (!footer_footnote) {
    footer_footnote = document.createElement('div');
    footer_footnote.className = 'footer_footnote';
    document.body.appendChild(footer_footnote);
  }

  footer_footnote.innerHTML = html;
}

function updateHREF(element, value) {
  element.setAttribute('href', value);
}

function updateNavigation(document, pagesData) {
  var elements = document.querySelectorAll('#public_main a');
  for (var index = 0; index < elements.length; index++) {
    elements[index].setAttribute('href', pagesData[index].pages[0].url);
  }
}

// KUDOS: http://stackoverflow.com/questions/13380906/hiding-an-element-that-contains-only-spaces-using-css#answer-13381114
function markEmptyParagraphs(document) {
  var allParas = document.getElementsByTagName('p');
  for(var i=0;i<allParas.length;i++){
    if(allParas[i].getElementsByTagName('*').length == 0 && (allParas[i].innerHTML == '' || allParas[i].innerHTML == ' ' || allParas[i].innerHTML == '&nbsp;')){
      allParas[i].className += ' is-empty';
    }
  }
}

function makeBackgroundImageURLsAbsolute(serializedDocument) {
  return serializedDocument.replace(/url\(\/simg/g, `url(${ OPTIONS.BASE_URL }/simg`);
}

// http://stackoverflow.com/questions/19549524/removing-non-break-spaces-in-javascript#answer-19549773
function removeNbsp(element) {
  var child = element.firstChild;
  if (!child) return;
  do {
    if (child.nodeType === 3) {
      child.nodeValue = child.nodeValue.replace(/\u00A0/g, '');
    } else {
      removeNbsp(child);
    }
  } while (child = child.nextSibling);
}

init();
