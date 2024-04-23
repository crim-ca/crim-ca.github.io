/*
  This function will look for matching GitHub Pages in a nested repository under the 'crim-ca' organization.
  If a 'crim-ca/{REPO}' publishes contents under its 'gh-pages' branch, they will be available from the
  GitHub API and can be auto-populated by the GitHub Pages.
  If a versioned schema reference is defined in the form 'vX.Y.Z/schema.json' (or nested), a list of corresponding
  URI pointing at the hosted source documents will be generated.
  Example of contents provided this way: 'https://github.com/crim-ca/dlm-extension/tree/gh-pages'
  Mapping to 'https://crim-ca.github.io/dlm-extension/'
*/
(async () => {
  const repo = window.location.href.split('/').slice(-2).shift()
  const response = await fetch(`https://api.github.com/repos/crim-ca/${repo}/git/trees/gh-pages?recursive=true`);
  const data = await response.json();
  schemas = data.tree.filter(f => {
    if (f.path.startsWith('v') && f.path.endsWith('json')) {
      return true
    }
  })
  let htmlString = `<h1>Schemas in <code>${repo}</code></h1><ul>`;
  for (let s of schemas) {
    htmlString += `<li><a href="${s.path}">${s.path}</a></li>`;
  }
  htmlString += '</ul>';
  document.getElementsByTagName('body')[0].innerHTML = htmlString;
})()
