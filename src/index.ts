import './index.css';

const app = document.querySelector<HTMLDivElement>('#app');
const mainLayout = document.querySelector<HTMLDivElement>('#main-layout');
const closeBtn = document.getElementById('close-popup');
const iframe = document.querySelector<HTMLIFrameElement>('iframe[name="content-frame"]');

const closePopup = () => {
    if (app) {
        app.style.display = 'none';
    }

    if (mainLayout) {
        mainLayout.style.display = 'flex';
        // טעינת המבזק האחרון מהיום כברירת מחדל לאייפריים
        if (iframe && !iframe.src) {
           iframe.src = '/news/2026-03-13.html';
        }
    }
};

closeBtn?.addEventListener('click', closePopup);

console.log('Happy developing ✨');