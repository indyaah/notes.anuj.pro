(function() {
  function ready(fn){ if(document.readyState!=='loading'){ fn(); } else { document.addEventListener('DOMContentLoaded', fn); } }

  function slugify(text){
    return text.toString().toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }

  function buildAnchorsAndToc(){
    var article = document.querySelector('.page-content') || document.getElementById('main-content');
    var tocRoot = document.getElementById('page-toc');
    var tocAside = document.getElementById('toc');
    if(!article || !tocRoot){
      if(tocAside){ tocAside.classList.add('hidden'); }
      return;
    }

    var headings = Array.prototype.slice.call(article.querySelectorAll('h2, h3'));
    if(headings.length === 0){
      if(tocAside){ tocAside.classList.add('hidden'); }
      return;
    } else {
      if(tocAside){ tocAside.classList.remove('hidden'); }
    }

    var currentH2List = document.createElement('ul');
    var rootList = document.createElement('ul');
    tocRoot.innerHTML = '';

    headings.forEach(function(h){
      if(!h.id){ h.id = slugify(h.textContent); }
      // Add small anchor link inside heading
      if(!h.querySelector('a.heading-anchor')){
        var anchor = document.createElement('a');
        anchor.href = '#' + h.id;
        anchor.className = 'heading-anchor';
        anchor.setAttribute('aria-label', 'Link to this section');
        anchor.textContent = '#';
        h.appendChild(anchor);
      }

      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = '#' + h.id;
      a.textContent = h.textContent.replace(/#/g,'').trim();

      if(h.tagName.toLowerCase() === 'h2'){
        a.className = 'lvl-2';
        currentH2List = document.createElement('ul');
        li.appendChild(a);
        li.appendChild(currentH2List);
        rootList.appendChild(li);
      } else {
        a.className = 'lvl-3';
        var h3li = document.createElement('li');
        h3li.appendChild(a);
        currentH2List.appendChild(h3li);
      }
    });

    tocRoot.appendChild(rootList);

    // Smooth scroll for TOC links
    tocRoot.addEventListener('click', function(e){
      var a = e.target.closest('a[href^="#"]');
      if(!a) return;
      var id = a.getAttribute('href').slice(1);
      var target = document.getElementById(id);
      if(!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', '#' + id);
    });

    // Scrollspy
    var tocLinks = Array.prototype.slice.call(tocRoot.querySelectorAll('a'));
    function onScroll(){
      var fromTop = window.scrollY + 100; // offset for header spacing
      var current = headings[0];
      for(var i=0; i<headings.length; i++){
        if(headings[i].offsetTop <= fromTop) current = headings[i]; else break;
      }
      var id = current && current.id;
      tocLinks.forEach(function(link){
        if(link.getAttribute('href') === '#' + id){ link.classList.add('is-active'); }
        else { link.classList.remove('is-active'); }
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  function highlightActiveSidebarLink(){
    var nav = document.getElementById('sidebar-nav');
    if(!nav) return;
    var links = nav.querySelectorAll('a[href]');
    var loc = window.location;
    var currentPath = (loc.pathname || '/').replace(/\/index\.html$/, '/');
    links.forEach(function(a){
      var href = a.getAttribute('href');
      if(!href) return;
      // Resolve relative URLs by creating a temporary link
      var tmp = document.createElement('a'); tmp.href = href; var path = tmp.pathname;
      path = path.replace(/\/index\.html$/, '/');
      if(path === currentPath){ a.classList.add('active'); }
    });
  }

  function buildCollapsibleSidebarTree(){
    var tree = document.querySelector('#sidebar-nav .nav-tree');
    if(!tree) return;

    // Mark items with children and insert toggle buttons
    var items = Array.prototype.slice.call(tree.querySelectorAll('li'));
    items.forEach(function(li){
      var sub = li.querySelector(':scope > ul');
      if(!sub) return;
      li.classList.add('has-children');

      var directLink = li.querySelector(':scope > a');
      var labelText = '';
      var nodesToRemove = [];
      Array.prototype.slice.call(li.childNodes).forEach(function(n){
        if(n.nodeType === 3){ // text node
          var txt = (n.textContent || '').trim();
          if(txt){ labelText += (labelText ? ' ' : '') + txt; }
          nodesToRemove.push(n);
        }
      });
      nodesToRemove.forEach(function(n){ try { li.removeChild(n); } catch(_){} });

      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'tree-toggle';
      var btnLabel = directLink ? (directLink.textContent || 'Section').trim() : (labelText || 'Section');
      // If there is a direct link, show caret-only to avoid duplicate text; otherwise include the label text
      btn.textContent = directLink ? '' : btnLabel;
      btn.setAttribute('aria-label', 'Toggle ' + btnLabel);
      btn.setAttribute('title', 'Toggle ' + btnLabel);

      if(directLink){
        li.insertBefore(btn, directLink);
      } else {
        li.insertBefore(btn, sub);
      }
      // Default collapsed
      btn.setAttribute('aria-expanded', 'false');
    });

    // Auto-expand ancestors of the active link
    var activeLink = tree.querySelector('a.active');
    if(activeLink){
      var p = activeLink.parentElement;
      while(p && p !== tree){
        if(p.tagName === 'LI' && p.classList.contains('has-children')){
          p.classList.add('open');
          var t = p.querySelector(':scope > .tree-toggle');
          if(t) t.setAttribute('aria-expanded', 'true');
        }
        p = p.parentElement;
      }
    }

    // Toggle handler
    tree.addEventListener('click', function(e){
      var btn = e.target.closest('.tree-toggle');
      if(!btn) return;
      e.preventDefault();
      var li = btn.parentElement;
      var isOpen = li.classList.contains('open');
      if (!isOpen) {
        // Collapse all other open topics
        var openLis = tree.querySelectorAll('li.has-children.open');
        openLis.forEach(function(openLi) {
          if (openLi !== li) {
            openLi.classList.remove('open');
            var t = openLi.querySelector(':scope > .tree-toggle');
            if (t) t.setAttribute('aria-expanded', 'false');
          }
        });
      }
      var open = li.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  function sidebarSearch(){
    var input = document.getElementById('sidebar-search');
    var nav = document.querySelector('#sidebar-nav .nav-tree');
    if(!input || !nav) return;
    var allItems = Array.prototype.slice.call(nav.querySelectorAll('li'));

    function applyFilter(){
      var q = input.value.trim().toLowerCase();
      if(!q){
        allItems.forEach(function(li){ li.classList.remove('hidden'); });
        return;
      }
      // First hide those that don't match
      allItems.forEach(function(li){
        var text = li.textContent.toLowerCase();
        if(text.indexOf(q) >= 0){ li.classList.remove('hidden'); }
        else { li.classList.add('hidden'); }
      });
      // Ensure ancestors of visible items are shown and expanded
      allItems.forEach(function(li){
        if(!li.classList.contains('hidden')){
          var p = li.parentElement;
          while(p && p !== nav){
            if(p.tagName === 'LI'){
              p.classList.remove('hidden');
              if(p.classList.contains('has-children')){
                p.classList.add('open');
                var t = p.querySelector(':scope > .tree-toggle');
                if(t) t.setAttribute('aria-expanded', 'true');
              }
            }
            p = p.parentElement;
          }
        }
      });
    }

    input.addEventListener('input', applyFilter);
  }

  function persistSidebarScroll(){
    var sidebar = document.querySelector('.sidebar');
    if(!sidebar) return;
    var key = 'sidebar-scroll';
    try {
      var saved = localStorage.getItem(key);
      if(saved) sidebar.scrollTop = parseInt(saved, 10) || 0;
    } catch(_){}
    window.addEventListener('beforeunload', function(){
      try { localStorage.setItem(key, String(sidebar.scrollTop)); } catch(_){}
    });
  }

  function setupTagsFilterPage(){
    var path = window.location.pathname.replace(/\/index\.html$/, '/');
    if(!/\/tags\/$/.test(path)) return;

    var container = document.getElementById('tag-view-container');
    if(!container) return;

    var sections = Array.prototype.slice.call(container.querySelectorAll('.tag-section'));
    var hint = document.getElementById('tag-hint');

    function showForHash(){
      var hash = window.location.hash || '';
      var m = hash.match(/^#tag-([a-z0-9\-]+)/i);
      var targetId = m ? ('tag-' + m[1] + '-section') : null;
      var shown = false;
      sections.forEach(function(sec){
        if(targetId && sec.id === targetId){
          sec.classList.remove('hidden');
          shown = true;
        } else {
          sec.classList.add('hidden');
        }
      });
      if(hint){
        if(shown) hint.classList.add('hidden'); else hint.classList.remove('hidden');
      }
    }

    sections.forEach(function(sec){ sec.classList.add('hidden'); });
    showForHash();
    window.addEventListener('hashchange', showForHash);
  }

  function setupMermaid(){
    try {
      var sel = 'pre > code.language-mermaid, code.language-mermaid';
      var codes = Array.prototype.slice.call(document.querySelectorAll(sel));
      if(!codes.length) return;

      codes.forEach(function(code){
        var txt = code.textContent;
        var pre = code.closest('pre');
        var wrapper = code.closest('div.highlight') || pre || code;
        var container = document.createElement('div');
        container.className = 'mermaid';
        container.textContent = txt;
        if(wrapper && wrapper.parentNode){
          wrapper.parentNode.replaceChild(container, wrapper);
        }
      });

      function tryInit(attempt){
        attempt = attempt || 0;
        if(window.mermaid && typeof window.mermaid.initialize === 'function'){
          try {
            window.mermaid.initialize({ startOnLoad: false });
            if(typeof window.mermaid.run === 'function'){
              window.mermaid.run({ querySelector: '.mermaid' });
            } else if(typeof window.mermaid.init === 'function'){
              window.mermaid.init(undefined, document.querySelectorAll('.mermaid'));
            }
          } catch(_){ }
          return;
        }
        if(attempt < 20){ setTimeout(function(){ tryInit(attempt+1); }, 150); }
      }
      tryInit(0);
    } catch(_){ /* noop */ }
  }

  function setupSiteSearch(){
    var input = document.getElementById('site-search');
    var form = document.getElementById('site-search-form');
    var resultsBox = document.getElementById('site-search-results');
    if(!input || !form || !resultsBox) return;

    var data = null;
    var fetching = false;
    var fetched = false;

    function getIndexUrl(){
      // Build from site root
      var brand = document.querySelector('.topbar-left .topbar-brand');
      var base = (brand && brand.getAttribute('href')) || '/';
      if(base.slice(-1) !== '/') base += '/';
      return base + 'assets/search.json';
    }

    function fetchIndex(){
      if(fetching || fetched) return;
      fetching = true;
      var url = getIndexUrl();
      fetch(url, { credentials: 'same-origin' })
        .then(function(r){ return r.json(); })
        .then(function(j){ data = j || []; fetched = true; })
        .catch(function(){ data = []; fetched = true; })
        .finally(function(){ fetching = false; });
    }

    function clearResults(){
      resultsBox.innerHTML = '';
      resultsBox.classList.add('hidden');
    }

    function renderResults(items){
      if(!items || !items.length){ clearResults(); return; }
      var html = '<ul>' + items.map(function(it){
        var t = (it.title || '').replace(/</g,'&lt;');
        var u = it.url || '#';
        return '<li><a href="' + u + '">' + t + '</a></li>';
      }).join('') + '</ul>';
      resultsBox.innerHTML = html;
      resultsBox.classList.remove('hidden');
    }

    function search(q){
      if(!data || !data.length) return [];
      q = (q || '').toLowerCase().trim();
      if(!q) return [];
      var tokens = q.split(/\s+/).filter(Boolean);
      var res = [];
      data.forEach(function(p){
        var title = (p.title || '').toLowerCase();
        var content = (p.content || '').toLowerCase();
        var score = 0;
        var ok = true;
        for(var i=0;i<tokens.length;i++){
          var tk = tokens[i];
          var inTitle = title.indexOf(tk) >= 0;
          var inContent = content.indexOf(tk) >= 0;
          if(!inTitle && !inContent){ ok = false; break; }
          if(inTitle) score += 3; if(inContent) score += 1;
        }
        if(ok){ res.push({ title: p.title, url: p.url, score: score }); }
      });
      res.sort(function(a,b){ return b.score - a.score || a.title.localeCompare(b.title); });
      return res.slice(0, 10);
    }

    var debTimer = null;
    function onInput(){
      var q = input.value;
      if(q && q.length >= 2){ fetchIndex(); }
      if(debTimer) clearTimeout(debTimer);
      debTimer = setTimeout(function(){
        if(!q || q.trim().length < 2){ clearResults(); return; }
        var items = search(q);
        renderResults(items);
      }, 120);
    }

    input.addEventListener('input', onInput);
    input.addEventListener('focus', function(){ if(input.value.trim().length >= 2){ onInput(); } });

    form.addEventListener('keydown', function(e){
      if(e.key === 'Escape'){ clearResults(); input.blur(); }
      if(e.key === 'Enter'){
        var first = resultsBox.querySelector('a');
        if(first){ window.location.href = first.getAttribute('href'); e.preventDefault(); }
      }
    });

    document.addEventListener('click', function(e){
      if(!form.contains(e.target)){ clearResults(); }
    });
  }

  // Theme switching logic
  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    var btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.textContent = theme === 'dark' ? '☀️' : '🌙';
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
      btn.title = btn.getAttribute('aria-label');
    }
  }

  function getPreferredTheme() {
    var stored = localStorage.getItem('theme');
    if (stored) return stored;
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }

  ready(function() {
    buildAnchorsAndToc();
    highlightActiveSidebarLink();
    buildCollapsibleSidebarTree();
    sidebarSearch();
    persistSidebarScroll();
    setupTagsFilterPage();
    setupMermaid();
    setupSiteSearch();

    // Theme toggle
    var btn = document.getElementById('theme-toggle');
    if (btn) {
      var current = getPreferredTheme();
      setTheme(current);
      btn.addEventListener('click', function() {
        var newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
      });
    }
  });
})();
