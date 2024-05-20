// const butInstall = document.getElementById('buttonInstall');
// const textHeader = document.querySelector('h1');

// ////////////////////////////////////////////////////////////////////////////
// // Logic for installing the PWA
// // TODO: Add an event handler to the `beforeinstallprompt` event
// window.addEventListener('beforeinstallprompt', (event) => {
//     event.preventDefault();
//     butInstall.style.visibility = 'visible';
//     textHeader.textContent = 'Click the button to install';

//     // TODO: Implement a click event handler on the `butInstall` element
//     butInstall.addEventListener('click', async () => {
//         event.promt();
//         butInstall.setAttribute('disabled', true);
//         butInstall.textContent = 'Installed!';
//     });
// });

// // TODO: Add an handler for the `appinstalled` event
// window.addEventListener('appinstalled', (event) => {
//     textHeader.textContent = 'Successfully installed!';
//     console.log('👍', 'appinstalled', event);
// });
const butInstall = document.getElementById('buttonInstall');

// Variable to store the event
let deferredPrompt;

// Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the mini-infobar from appearing on mobile
  event.preventDefault();
  // Stash the event so it can be triggered later
  deferredPrompt = event;
  // Update UI notify the user they can install the PWA
  butInstall.style.display = 'block';
});

// Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
  if (!deferredPrompt) {
    return;
  }
  // Show the install prompt
  deferredPrompt.prompt();
  // Wait for the user to respond to the prompt
  const { outcome } = await deferredPrompt.userChoice;
  console.log(`User response to the install prompt: ${outcome}`);
  // Clear the deferredPrompt variable, it can only be used once
  deferredPrompt = null;
  // Hide the install button
  butInstall.style.display = 'none';
});

// Add a handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  console.log('PWA was installed', event);
  // Optionally, you can hide the install button or show a thank you message
  butInstall.style.display = 'none';
});
