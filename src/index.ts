import './index.css';

const app = document.querySelector<HTMLDivElement>('#app');
const mainLayout = document.querySelector<HTMLDivElement>('#main-layout');
const closeBtn = document.getElementById('close-popup');
const iframe = document.querySelector<HTMLIFrameElement>('iframe[name="content-frame"]');

const getLastNewsletterDate = async (): Promise<string> => {
    try {
        // Fetch the JSON file containing the date of the last newsletter item
        const response = await fetch('/news/last-update.json');
        if (response.ok) {
            const data = await response.json();
            return `/news/${data.lastUpdate}.html`;
        } else {
            console.error('Failed to fetch last-update.json');
        }
    } catch (error) {
        console.error('Error fetching last update:', error);
    }

    // Fallback: Get the most recent link from the sidebar
    const links = document.querySelectorAll<HTMLAnchorElement>('#newsletter-list a');
    if (links.length > 0) {
        const firstHref = links[0].getAttribute('href');
        if (firstHref) return firstHref;
    }

    // Secondary Fallback: Format current date as YYYY-MM-DD
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `/news/${year}-${month}-${day}.html`;
};

const closePopup = async () => {
    if (app) {
        app.style.display = 'none';
    }

    if (mainLayout && iframe) {
        mainLayout.style.display = 'flex';

        iframe.src = await getLastNewsletterDate();
    }
};

const updateActiveLink = (href: string) => {
    const links = document.querySelectorAll<HTMLAnchorElement>('#newsletter-list a');
    links.forEach(link => {
        if (link.getAttribute('href') === href) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
};

const handleSidebarClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const link = target.closest('a');
    
    if (link && iframe) {
        event.preventDefault();
        const href = link.getAttribute('href');
        if (href) {
            iframe.src = href;
            updateActiveLink(href);
        }
    }
};

closeBtn?.addEventListener('click', async () => {
    await closePopup();
    const currentSrc = iframe?.getAttribute('src');
    if (currentSrc) {
        updateActiveLink(currentSrc);
    }
});

document.querySelector('#newsletter-list')?.addEventListener('click', (e) => handleSidebarClick(e as MouseEvent));

console.log('Happy developing ✨');
