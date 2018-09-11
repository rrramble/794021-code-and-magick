'use strict';

/*
 * Текст задачи:
 * https://up.htmlacademy.ru/javascript/15/tasks/12
 */

var SELECTOR_HIDDEN = '.hidden';
var SELECTOR_INSERT_DOM_TO = '.setup-similar-list';
var SELECTOR_TEMPLATE = '#similar-wizard-template';

var WIZARD_COUNT = 4;
var NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var SURNAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

var COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var EYES_COLORS = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];


/*
 * Main logic
 */

main();


function main() {
  showHtmlSelector('.setup');
  var wizards = createWizards(
      NAMES, SURNAMES, COAT_COLORS, EYES_COLORS, WIZARD_COUNT
  );
  var wizardsDom = domFromWizards(wizards, SELECTOR_TEMPLATE);
  renderDom(wizardsDom, SELECTOR_INSERT_DOM_TO);
  showHtmlSelector('.setup-similar');
}


/*
 * Business-logic functions
 */

function createWizards(
    firstNames, surnames, coatColors, eyesColors, wizardCount
) {
  var result = [];

  for (var i = 0; i < wizardCount; i++) {
    var wizard = {};
    wizard.name = selectFullName(firstNames, surnames);
    wizard.coatColor = selectCoatColor(coatColors);
    wizard.eyesColor = selectEyesColor(eyesColors);
    result.push(wizard);
  }
  return result;
}

function domFromWizards(wizardDatum, htmlTemplateSelector) {
  var dom = [];
  for (var i = 0; i < wizardDatum.length; i++) {
    dom.push(domFromWizard(wizardDatum[i], htmlTemplateSelector));
  }
  return dom;
}

function domFromWizard(wizardData, htmlTemplateSelector) {
  var domTemplate = document.querySelector(htmlTemplateSelector);
  var dom = domTemplate.content.cloneNode(true);

  var domName = dom.querySelector('.setup-similar-label');
  domName.textContent = wizardData.name;

  var domCoat = dom.querySelector('.wizard-coat');
  domCoat.setAttribute('fill', wizardData.coatColor);

  var domEyes = dom.querySelector('.wizard-eyes');
  domEyes.setAttribute('fill', wizardData.eyesColor);

  return dom;
}

function selectFullName(firstNames, surnames) {
  var firstName = randomFromList(firstNames);
  var surname = randomFromList(surnames);
  var result = fullName(firstName, surname);
  return result;
}

function selectCoatColor(coatColors) {
  var result = randomFromList(coatColors);
  return result;
}

function selectEyesColor(eyesColors) {
  var result = randomFromList(eyesColors);
  return result;
}


// Misc functions

function renderDom(domElements, htmlSelector) {
  var domFragment = document.createDocumentFragment();
  for (var i = 0; i < domElements.length; i++) {
    domFragment.appendChild(domElements[i]);
  }
  var domSelector = document.querySelector(htmlSelector);
  domSelector.appendChild(domFragment);
}

function showHtmlSelector(htmlSelector) {
  var el = document.querySelector(htmlSelector);
  var className = htmlClassFromSelector(SELECTOR_HIDDEN);
  el.classList.remove(className);
}

function fullName(firstName, secondName) {
  return firstName + ' ' + secondName;
}

function htmlClassFromSelector(htmlSelector) {
  var firstChar = htmlSelector[0];
  if (firstChar === '.') {
    return htmlSelector.slice(1);
  }
  return undefined;
}

function randomFromList(list) {
  var index = randomInRange(0, list.length);
  var result = list[index];
  return result;
}

function randomInRange(start, end, randomFunction) {
  if (randomFunction === undefined) {
    randomFunction = Math.random;
  }

  var randomValue = randomFunction() * (end - start) + start;
  var result = Math.floor(randomValue);
  return result;
}
