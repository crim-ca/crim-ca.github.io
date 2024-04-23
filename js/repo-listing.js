/*
  Find all repositories with GitHub Pages  under the 'crim-ca' organization.
  Generates the HTML listing of found pages.
*/
(async () => {
  const response = await fetch(`https://api.github.com/orgs/crim-ca/repos`);
  const data = await response.json();
  pages = data.filter(f => { return f.has_pages })
  let htmlString = `<ol>`;
  for (let p of pages) {
    htmlString += `<li><a href="${p.name}">${p.name}</a> - <i>${p.description}</i></li>`;
  }
  htmlString += '</ol>';
  document.getElementById('pages').innerHTML = htmlString;
})()
