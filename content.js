// This content script hides difficulty and acceptance tags on LeetCode's problemset and problem description pages
function hideLeetCodeTags() {
  console.log('LeetCode Cleaner: Running hideLeetCodeTags');
  // Hide difficulty tags in problemset table
  document.querySelectorAll('p.text-sd-hard, p.text-sd-easy, p.text-sd-medium').forEach(el => {
    el.style.visibility = 'hidden';
  });
  // Hide acceptance percentage in problemset table
  document.querySelectorAll('div.text-sd-muted-foreground.w-\\[70px\\]').forEach(el => {
    el.style.visibility = 'hidden';
  });

  // Hide difficulty tag in problem description page (new selector)
  document.querySelectorAll('div.text-difficulty-hard, div.text-difficulty-medium, div.text-difficulty-easy').forEach(el => {
    el.style.visibility = 'hidden';
  });

  // Hide acceptance percentage in problem description page (both number and %)
  document.querySelectorAll('span.text-sd-muted-foreground.text-xs, span.text-sd-foreground.text-lg').forEach(el => {
    el.style.visibility = 'hidden';
  });

  // Hide value of accepted and acceptance rate label in problem description page
  document.querySelectorAll('div.text-sd-muted-foreground.text-sm').forEach(el => {
    if (el.textContent.trim() === 'Accepted' || el.textContent.trim() === 'Acceptance Rate') {
      el.style.visibility = 'hidden';
      // Also hide the next sibling span with the number
      const parentDiv = el.parentElement;
      if (parentDiv) {
        parentDiv.querySelectorAll('span.text-sd-foreground.text-lg').forEach(span => {
          span.style.visibility = 'hidden';
        });
        parentDiv.querySelectorAll('span.text-sd-muted-foreground.text-xs').forEach(span => {
          span.style.visibility = 'hidden';
        });
      }
    }
  });
}

// Run on page load
hideLeetCodeTags();

// Also run when the page changes (LeetCode is SPA)
const observer = new MutationObserver(() => {
  hideLeetCodeTags();
});
observer.observe(document.body, { childList: true, subtree: true });

console.log('LeetCode Cleaner: Content script loaded');
