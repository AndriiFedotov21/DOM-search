var searchButton = document.querySelector('.selector-find');
var buttonParent = document.querySelector('.nav-top');
var inputSearch = document.querySelector('.selector');
var buttonNext = document.querySelector('.selector-next');
var buttonPrevious = document.querySelector('.selector-prev');
var buttonFirstChild = document.querySelector('.nav-bottom');
var buttonPrevSibling = document.querySelector('.nav-left');
var buttonNextSibling = document.querySelector('.nav-right');
var buttonHolder = document.querySelector('.jsbursa-panel');
var buttonGrandparent = buttonHolder.insertBefore(document.createElement('button'),buttonFirstChild);
var buttonGrandchild = buttonHolder.insertBefore(document.createElement('button'),buttonPrevSibling);


var selectMenu = buttonHolder.insertBefore(document.createElement('select'),buttonNext);
var optionValue = 1;

for(var i = 1; i <= 10; i++) {
    var option = document.createElement('option');
    selectMenu.append('option');
    selectMenu.add(option);
    option.value = option.text = i;
}



var selector = '';
var collection = [];
var activeElementIndex = 0;
var activeElement = null;




function toggleButtons (property) {
        buttonGrandchild.disabled = property.disableButtonGrandchild || false,
        buttonGrandparent.disabled = property.disableButtonGrandparent || false,
        buttonNext.disabled = property.disableNextButton || false,
        buttonPrevious.disabled = property.disablePrevButton || false,
        buttonPrevSibling.disabled = property.disablePrevSiblingButton || false,
        buttonNextSibling.disabled = property.disableNextSiblingButton || false,
        buttonFirstChild.disabled = property.disabledFirstChildButton || false,
        buttonParent.disabled = property.disabledParentButton || false;
}

function checkButtonsAvailability() {
    var currentElement = activeElement || collection[activeElementIndex];
    var outOfCollection = activeElementIndex + optionValue;

    return {
        disableButtonGrandchild: !(currentElement && currentElement.children[0] && currentElement.children[0].children[0]),
        disableButtonGrandparent: !(currentElement && currentElement.parentElement && currentElement.parentElement.parentElement),
        disableNextButton: activeElementIndex === collection.length - 1 || outOfCollection >= collection.length,
        disablePrevButton: activeElementIndex === 0 || activeElementIndex - optionValue < 0,
        disablePrevSiblingButton: !currentElement.previousElementSibling,
        disableNextSiblingButton: !currentElement.nextElementSibling,
        disabledFirstChildButton: !currentElement.children[0],
        disabledParentButton: !currentElement.parentElement,
    };
}
function disableTopNavigationButtons() {
    buttonNext.disabled = true;
    buttonPrevious.disabled = true;

}
function  highlightElement(elem) {
    elem.setAttribute('style', 'outline: 4px solid red; background: skyblue');
}
function  unHighlightElement(elem) {
    elem.setAttribute('style', '');
}

function bottomPanelNavigation(current, prev) {
    var nextElement = prev;

    unHighlightElement(current);
    highlightElement(prev);

    activeElement = nextElement;

    toggleButtons(checkButtonsAvailability());
    disableTopNavigationButtons();
}


function  disableButtons() {
    toggleButtons({
        disabledFirstChildButton: true,
        disableButtonGrandparent: true,
        disableButtonGrandchild: true,
        disableNextButton: true,
        disablePrevButton: true,
        disablePrevSiblingButton: true,
        disableNextSiblingButton: true,
        disabledParentButton: true
    });
}

searchButton.onclick = function () {
    var newEl = inputSearch.value;
    var currentElement = activeElement || collection[activeElementIndex];
    if(currentElement) {
        unHighlightElement(currentElement);
        activeElement = null;
        activeElementIndex = 0;
    }
    if(document.querySelector(newEl)) {
        selector = newEl;
        collection = document.querySelectorAll(selector);
        toggleButtons(checkButtonsAvailability());
        highlightElement(collection[0]);


    } else {
        alert('There is no such selector');
        disableButtons();
    }

};

selectMenu.onchange = function getSelectedText() {
    optionValue = +selectMenu.options[selectMenu.selectedIndex].value;
    toggleButtons(checkButtonsAvailability());


};

buttonNext.onclick = function () {

    activeElementIndex += optionValue;
    unHighlightElement(collection[activeElementIndex - optionValue]);
    highlightElement(collection[activeElementIndex]);


    toggleButtons(checkButtonsAvailability());

};

buttonPrevious.onclick = function () {

    activeElementIndex -= optionValue;
    unHighlightElement(collection[activeElementIndex + optionValue]);
    highlightElement(collection[activeElementIndex]);


    toggleButtons(checkButtonsAvailability());

};

buttonNextSibling.onclick = function () {
    var currentElement = activeElement || collection[activeElementIndex];
    var nextElement = currentElement.nextElementSibling;

    bottomPanelNavigation(currentElement, nextElement);

};
buttonParent.onclick = function () {
    var currentElement = activeElement || collection[activeElementIndex];
    var nextElement = currentElement.parentElement;

    bottomPanelNavigation(currentElement, nextElement);

};
buttonGrandparent.onclick = function () {
    var currentElement = activeElement || collection[activeElementIndex];
    var nextElement = currentElement.parentNode.parentElement;

    bottomPanelNavigation(currentElement, nextElement);

};
buttonPrevSibling.onclick = function () {
    var currentElement = activeElement || collection[activeElementIndex];
    var nextElement = currentElement.previousElementSibling;


    bottomPanelNavigation(currentElement, nextElement);

};

buttonFirstChild.onclick = function () {

    var currentElement = activeElement || collection[activeElementIndex];
    var nextElement = currentElement.firstElementChild;


    bottomPanelNavigation(currentElement, nextElement);

};
buttonGrandchild.onclick = function () {

    var currentElement = activeElement || collection[activeElementIndex];
    var nextElement = currentElement.firstElementChild.firstElementChild;


    bottomPanelNavigation(currentElement, nextElement);

};


buttonGrandchild.setAttribute('disabled', 'disabled');
buttonGrandparent.setAttribute('disabled', 'disabled');

buttonGrandparent.style = 'display: block';
buttonGrandparent.innerHTML = 'Прародитель';
buttonGrandchild.style = 'display: block';
buttonGrandchild.innerHTML = 'Внук';



