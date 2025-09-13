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
      // Show only caret icon via CSS; avoid duplicating link text
      btn.textContent = '';
      var btnLabel = directLink ? (directLink.textContent || 'Section').trim() : (labelText || 'Section');
      btn.setAttribute('aria-label', 'Toggle ' + btnLabel);
      btn.setAttribute('title', 'Toggle ' + btnLabel);

      if(directLink){
        li.insertBefore(btn, directLink);
      } else {
        li.insertBefore(btn, sub);
      }
      // Expanded by default
      li.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
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

  ready(function(){
    buildAnchorsAndToc();
    highlightActiveSidebarLink();
    buildCollapsibleSidebarTree();
    sidebarSearch();
    persistSidebarScroll();
    setupTagsFilterPage();
    setupMermaid();
  });
})();
