'use strict';

const html = document.querySelector('html');

const fisrstPromise = new Promise((resolve, reject) => {
  html.addEventListener('click', (e) => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  html.addEventListener('click', (e) => {
    resolve('Second promise was resolved');
  });

  html.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let counter = 0;

  html.addEventListener('click', (e) => {
    counter++;
    resolve('Third promise was resolved');
  });

  html.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    counter++;
    resolve('Third promise was resolved');
  });

  if (counter === 2) {
    resolve('Third promise was resolved');
  }
});

const notifySuccess = document.createElement('div');

notifySuccess.classList.add('success');
notifySuccess.setAttribute('data-qa', 'notification');

const notifyError = document.createElement('div');

notifyError.classList.add('error');
notifyError.setAttribute('data-qa', 'notification');

fisrstPromise
  .then((message) => {
    notifySuccess.innerHTML = message;
    document.body.appendChild(notifySuccess);
  })
  .catch((error) => {
    notifyError.innerHTML = error.message;
    document.body.appendChild(notifyError);
  });

secondPromise
  .then((message) => {
    notifySuccess.innerHTML = message;
    document.body.appendChild(notifySuccess);
  })
  .catch((error) => {
    notifyError.innerHTML = error.message;
    document.body.appendChild(notifyError);
  });

thirdPromise
  .then((message) => {
    notifySuccess.innerHTML = message;
    document.body.appendChild(notifySuccess);
  })
  .catch((error) => {
    notifyError.innerHTML = error.message;
    document.body.appendChild(notifyError);
  });
