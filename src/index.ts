import './index.css';

const app = document.querySelector<HTMLDivElement>('#app');
const mainLayout = document.querySelector<HTMLDivElement>('#main-layout');
const closeBtn = document.getElementById('close-popup');
const iframe = document.querySelector<HTMLIFrameElement>('iframe[name="content-frame"]');

const getLastNewsletterDate = () => {
    const links = document.querySelectorAll<HTMLAnchorElement>('#newsletter-list a');
    if (links.length > 0) {
        // Return the href of the first (most recent) link
        return links[0].getAttribute('href');
    }

    // Fallback: Format current date as YYYY-MM-DD
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `/news/${year}-${month}-${day}.html`;
};

const closePopup = () => {
    if (app) {
        app.style.display = 'none';
    }

    if (mainLayout && iframe) {
        mainLayout.style.display = 'flex';

        iframe.src = getLastNewsletterDate() || '/news/2026-03-13.html';
    }
};

closeBtn?.addEventListener('click', closePopup);

console.log('Happy developing ✨');