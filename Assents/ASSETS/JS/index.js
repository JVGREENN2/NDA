document.addEventListener('DOMContentLoaded', () => {
    // Tab Switching Logic
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
