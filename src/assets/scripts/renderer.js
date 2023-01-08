/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */

const types = ['chrome', 'node', 'electron', 'v8'];

const appName = document.getElementById('app-name');
const appDescription = document.getElementById('app-description');

const appAutor = document.getElementById('app-autor');
const appVersion = document.getElementById('app-version');
const appCompany = document.getElementById('app-company');
const appCopyright = document.getElementById('app-copyright');

const btnWindowMinimize = document.getElementById('window-minimize');
const btnWindowClose = document.getElementById('window-close');

const inptOpacity = document.getElementById('opacity');
const btnScheme = document.getElementById('scheme');

const currentOpacity = document.getElementById('current-opacity');
const currentScheme = document.getElementById('current-scheme');

const btnNotification = document.getElementById('notification');

const btnDialog = document.getElementById('dialog');
const userSelection = document.getElementById('user-selection');

const handlerLoaded = () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = `v${text}`;
  };

  types.forEach(type => {
    replaceText(`${type}-version`, window.appRuntime.versions[type]);
  });

  appAutor.innerHTML = `${window.appRuntime.app.autor}`;
  appVersion.innerHTML = `${window.appRuntime.app.version}`;
  appCompany.innerHTML = `${window.appRuntime.app.company}`;
  appName.innerHTML = window.appRuntime.app.name;
  appDescription.innerHTML = window.appRuntime.app.description;
  appCopyright.innerHTML = window.appRuntime.app.copyright;
};

const handlerMinimize = () => {
  window.appRuntime.send('window-minimize');
};

const handlerClose = () => {
  window.appRuntime.send('window-close');
};

const handlerOpacity = () => {
  const { value, min, max } = inptOpacity;
  const percent = parseInt((((value - min) * 100) / (max - min)).toFixed(2), 10);
  const style = `${percent}% 100%`;
  inptOpacity.style.backgroundSize = style;
  const opacity = parseInt(inptOpacity.value, 10) / 100;
  currentOpacity.innerText = value;
  window.appRuntime.send('opacity', opacity);
};

const handlerTheme = async () => {
  const isDarkMode = await window.appRuntime.invoke('theme-mode:toggle');
  currentScheme.innerHTML = isDarkMode ? 'Dark' : 'Light';
};

const handlerNotification = () => {
  window.appRuntime.send('notification', {
    title: 'This is a title notification',
    body: 'This is a body notification',
    urgency: 0,
    icon: 'app',
  });
};

const handlerDialog = async () => {
  const options = {
    user: ['Cats 🐱', 'Dogs 🐶', 'Pigs 🐷'],
    invoke: {
      message: 'What are your favorite animals',
      type: 'question',
      buttons: ['Cats', 'Dogs', 'Or pigs'],
      defaultId: 0,
      title: 'I am a title',
      detail: 'I am a details',
      icon: 'app',
      textWidth: 1,
      normalizeAccessKeys: true,
    },
  };
  const selection = await window.appRuntime.invoke('dialog:message', options.invoke);
  userSelection.innerHTML = options.user[selection] || null;
};

window.addEventListener('DOMContentLoaded', handlerLoaded);

btnWindowMinimize.addEventListener('click', handlerMinimize);
btnWindowClose.addEventListener('click', handlerClose);

inptOpacity.addEventListener('change', handlerOpacity);
btnScheme.addEventListener('click', handlerTheme);

btnNotification.addEventListener('click', handlerNotification);
btnDialog.addEventListener('click', handlerDialog);
