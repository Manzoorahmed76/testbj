/*
* dev: Sazumi Viki
* github: github.com/sazumivicky
* ig: @moe.sazumiviki
* site: www.sazumi.moe
*/

document.addEventListener('DOMContentLoaded', () => {
    const popup = document.getElementById('popupReminder');
    const overlay = document.getElementById('overlay');
    const closePopup = document.getElementById('closePopup');
    const dontShowAgain = document.getElementById('dontShowAgain');

    if (!localStorage.getItem('dontShowPopup')) {
      popup.style.display = 'block';
      overlay.classList.remove('hidden');
    }

    closePopup.addEventListener('click', () => {
      if (dontShowAgain.checked) {
        localStorage.setItem('dontShowPopup', 'true');
      }
      popup.style.display = 'none';
      overlay.classList.add('hidden');
    });
  });
