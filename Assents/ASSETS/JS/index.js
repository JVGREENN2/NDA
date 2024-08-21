document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.TAB-BTN');

    const tabClicked = (tab) => {
        tabs.forEach(tab => tab.classList.remove('active'));
        tab.classList.add('active');
        
        const contents = document.querySelectorAll('.CONTENT');
        contents.forEach(content => content.classList.remove('SHOW'));
        
        const contentId = tab.getAttribute('content-id');
        const content = document.getElementById(contentId);
        content.classList.add('SHOW');
    };

    tabs.forEach(tab => tab.addEventListener('click', () => tabClicked(tab)));
    
    const currentActiveTab = document.querySelector('.TAB-BTN.active');
    if (currentActiveTab) {
        tabClicked(currentActiveTab);
    }
});
        document.addEventListener("DOMContentLoaded", function() {
            const favicons = document.querySelectorAll('.favicon');
            favicons.forEach(favicon => {
                const url = favicon.getAttribute('data-url');
                const faviconUrl = new URL('/favicon.ico', url).href;
                favicon.src = faviconUrl;
            });
        });
