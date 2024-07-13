const tabs = document.querySelectorAll('.TAB-BTN');
tabs.forEach(tab => tab.addEventListener('click', () => tabClicked(tab)));

const tabClicked = (tab) => {
  tabs.forEach(tab => tab.classList.remove('active')); tab.classList.add('active');
  const contents = document.querySelectorAll('.CONTENT'); contents.forEach(content => content.classList.remove('SHOW'));
  const contentId = tab.getAttribute('CONTENT-id');
  const content = document.getElementById(contentId); content.classList.add('SHOW');}

  const currentActiveTab = document.querySelector('.TAB-BTN.active'); tabClicked(currentActiveTab);