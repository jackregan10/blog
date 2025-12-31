// script.js
// Wait for DOM, then wire up nav links
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = Array.from(document.querySelectorAll('.nav-link'));
  const content = document.getElementById('content');

  if (!navLinks.length) {
    content.innerHTML = '<p class="error">No navigation links found.</p>';
    return;
  }

  // helper: set active link
  function setActiveLink(activeLink) {
    navLinks.forEach(link => link.classList.toggle('active', link === activeLink));
  }

  // helper: load file and display text
  async function loadFile(filePath, clickedLink) {
    // show loading state
    content.textContent = 'Loading…';
    setActiveLink(clickedLink);

    try {
      const resp = await fetch(filePath, {cache: "no-store"});
      if (!resp.ok) {
        if (resp.status === 404) throw new Error('File not found (404).');
        throw new Error('Network response not OK: ' + resp.status);
      }
      const text = await resp.text();
      // Put the text into the panel, allowing HTML for images/links
      content.innerHTML = text || '(file is empty)';
      // move focus to content for keyboard users
      content.focus();
    } catch (err) {
      console.error(err);
      content.innerHTML = `<p class="error">Error loading file: ${escapeHtml(err.message)}</p>`;
    }
  }

  // attach click handlers
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault(); // prevent default link behavior
      const file = link.dataset.file;
      if (!file) {
        content.innerHTML = '<p class="error">No file specified for this link.</p>';
        return;
      }
      loadFile(file, link);
    });
  });

  // optional: load first item automatically
  // navButtons[0].click();
});

// tiny helper to avoid inserting raw error strings as HTML
function escapeHtml(s) {
  return s.replace(/[&<>"']/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[c]));
}
