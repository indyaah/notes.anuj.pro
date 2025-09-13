---
layout: home
title: Anuj's Engineering Notes
permalink: /
---

Archive:

{% assign _pages = site.pages | sort: 'title' %}

<section>
  <h2><a href="{{ '/notes/philosophy/' | relative_url }}">Philosophy</a></h2>
  <ul>
  {% assign _found = 0 %}
  {% for p in _pages %}
    {% if p.url and p.url contains '/notes/philosophy/' and p.url != '/notes/philosophy/' and p.title %}
      <li>
        <a href="{{ p.url | relative_url }}">{{ p.title }}</a>
        {% if p.tags and p.tags.size > 0 %}
          <span class="tag-list-inline">
            {% for t in p.tags %}
              {% assign _slug = t | slugify %}
              {% assign _first = _slug | slice: 0, 1 %}
              {% assign _c = 'c10' %}
              {% assign _g1 = 'a,b' | split: ',' %}
              {% assign _g2 = 'c,d' | split: ',' %}
              {% assign _g3 = 'e,f' | split: ',' %}
              {% assign _g4 = 'g,h' | split: ',' %}
              {% assign _g5 = 'i,j' | split: ',' %}
              {% assign _g6 = 'k,l' | split: ',' %}
              {% assign _g7 = 'm,n' | split: ',' %}
              {% assign _g8 = 'o,p,q' | split: ',' %}
              {% assign _g9 = 'r,s,t,u' | split: ',' %}
              {% assign _g10 = 'v,w,x,y,z' | split: ',' %}
              {% if _g1 contains _first %}{% assign _c = 'c1' %}
              {% elsif _g2 contains _first %}{% assign _c = 'c2' %}
              {% elsif _g3 contains _first %}{% assign _c = 'c3' %}
              {% elsif _g4 contains _first %}{% assign _c = 'c4' %}
              {% elsif _g5 contains _first %}{% assign _c = 'c5' %}
              {% elsif _g6 contains _first %}{% assign _c = 'c6' %}
              {% elsif _g7 contains _first %}{% assign _c = 'c7' %}
              {% elsif _g8 contains _first %}{% assign _c = 'c8' %}
              {% elsif _g9 contains _first %}{% assign _c = 'c9' %}
              {% else %}{% assign _c = 'c10' %}{% endif %}
              <span class="tag-chip {{ _c }}"><a href="{{ '/tags/' | relative_url }}#tag-{{ t | slugify }}">{{ t }}</a></span>
            {% endfor %}
          </span>
        {% endif %}
      </li>
      {% assign _found = _found | plus: 1 %}
    {% endif %}
  {% endfor %}
  {% if _found == 0 %}
    <li><span class="a-muted">No notes yet.</span></li>
  {% endif %}
  </ul>
</section>

<section>
  <h2><a href="{{ '/notes/process/' | relative_url }}">Process</a></h2>
  <ul>
  {% assign _found = 0 %}
  {% for p in _pages %}
    {% if p.url and p.url contains '/notes/process/' and p.url != '/notes/process/' and p.title %}
      <li>
        <a href="{{ p.url | relative_url }}">{{ p.title }}</a>
        {% if p.tags and p.tags.size > 0 %}
          <span class="tag-list-inline">
            {% for t in p.tags %}
              {% assign _slug = t | slugify %}
              {% assign _first = _slug | slice: 0, 1 %}
              {% assign _c = 'c10' %}
              {% assign _g1 = 'a,b' | split: ',' %}
              {% assign _g2 = 'c,d' | split: ',' %}
              {% assign _g3 = 'e,f' | split: ',' %}
              {% assign _g4 = 'g,h' | split: ',' %}
              {% assign _g5 = 'i,j' | split: ',' %}
              {% assign _g6 = 'k,l' | split: ',' %}
              {% assign _g7 = 'm,n' | split: ',' %}
              {% assign _g8 = 'o,p,q' | split: ',' %}
              {% assign _g9 = 'r,s,t,u' | split: ',' %}
              {% assign _g10 = 'v,w,x,y,z' | split: ',' %}
              {% if _g1 contains _first %}{% assign _c = 'c1' %}
              {% elsif _g2 contains _first %}{% assign _c = 'c2' %}
              {% elsif _g3 contains _first %}{% assign _c = 'c3' %}
              {% elsif _g4 contains _first %}{% assign _c = 'c4' %}
              {% elsif _g5 contains _first %}{% assign _c = 'c5' %}
              {% elsif _g6 contains _first %}{% assign _c = 'c6' %}
              {% elsif _g7 contains _first %}{% assign _c = 'c7' %}
              {% elsif _g8 contains _first %}{% assign _c = 'c8' %}
              {% elsif _g9 contains _first %}{% assign _c = 'c9' %}
              {% else %}{% assign _c = 'c10' %}{% endif %}
              <span class="tag-chip {{ _c }}"><a href="{{ '/tags/' | relative_url }}#tag-{{ t | slugify }}">{{ t }}</a></span>
            {% endfor %}
          </span>
        {% endif %}
      </li>
      {% assign _found = _found | plus: 1 %}
    {% endif %}
  {% endfor %}
  {% if _found == 0 %}
    <li><span class="a-muted">No notes yet.</span></li>
  {% endif %}
  </ul>
</section>

<section>
  <h2><a href="{{ '/notes/tools/' | relative_url }}">Tools</a></h2>
  <ul>
  {% assign _found = 0 %}
  {% for p in _pages %}
    {% if p.url and p.url contains '/notes/tools/' and p.url != '/notes/tools/' and p.title %}
      <li>
        <a href="{{ p.url | relative_url }}">{{ p.title }}</a>
        {% if p.tags and p.tags.size > 0 %}
          <span class="tag-list-inline">
            {% for t in p.tags %}
              {% assign _slug = t | slugify %}
              {% assign _first = _slug | slice: 0, 1 %}
              {% assign _c = 'c10' %}
              {% assign _g1 = 'a,b' | split: ',' %}
              {% assign _g2 = 'c,d' | split: ',' %}
              {% assign _g3 = 'e,f' | split: ',' %}
              {% assign _g4 = 'g,h' | split: ',' %}
              {% assign _g5 = 'i,j' | split: ',' %}
              {% assign _g6 = 'k,l' | split: ',' %}
              {% assign _g7 = 'm,n' | split: ',' %}
              {% assign _g8 = 'o,p,q' | split: ',' %}
              {% assign _g9 = 'r,s,t,u' | split: ',' %}
              {% assign _g10 = 'v,w,x,y,z' | split: ',' %}
              {% if _g1 contains _first %}{% assign _c = 'c1' %}
              {% elsif _g2 contains _first %}{% assign _c = 'c2' %}
              {% elsif _g3 contains _first %}{% assign _c = 'c3' %}
              {% elsif _g4 contains _first %}{% assign _c = 'c4' %}
              {% elsif _g5 contains _first %}{% assign _c = 'c5' %}
              {% elsif _g6 contains _first %}{% assign _c = 'c6' %}
              {% elsif _g7 contains _first %}{% assign _c = 'c7' %}
              {% elsif _g8 contains _first %}{% assign _c = 'c8' %}
              {% elsif _g9 contains _first %}{% assign _c = 'c9' %}
              {% else %}{% assign _c = 'c10' %}{% endif %}
              <span class="tag-chip {{ _c }}"><a href="{{ '/tags/' | relative_url }}#tag-{{ t | slugify }}">{{ t }}</a></span>
            {% endfor %}
          </span>
        {% endif %}
      </li>
      {% assign _found = _found | plus: 1 %}
    {% endif %}
  {% endfor %}
  {% if _found == 0 %}
    <li><span class="a-muted">No notes yet.</span></li>
  {% endif %}
  </ul>
</section>

<section>
  <h2><a href="{{ '/notes/effectiveness/' | relative_url }}">Effectiveness</a></h2>
  <ul>
  {% assign _found = 0 %}
  {% for p in _pages %}
    {% if p.url and p.url contains '/notes/effectiveness/' and p.url != '/notes/effectiveness/' and p.title %}
      <li>
        <a href="{{ p.url | relative_url }}">{{ p.title }}</a>
        {% if p.tags and p.tags.size > 0 %}
          <span class="tag-list-inline">
            {% for t in p.tags %}
              {% assign _slug = t | slugify %}
              {% assign _first = _slug | slice: 0, 1 %}
              {% assign _c = 'c10' %}
              {% assign _g1 = 'a,b' | split: ',' %}
              {% assign _g2 = 'c,d' | split: ',' %}
              {% assign _g3 = 'e,f' | split: ',' %}
              {% assign _g4 = 'g,h' | split: ',' %}
              {% assign _g5 = 'i,j' | split: ',' %}
              {% assign _g6 = 'k,l' | split: ',' %}
              {% assign _g7 = 'm,n' | split: ',' %}
              {% assign _g8 = 'o,p,q' | split: ',' %}
              {% assign _g9 = 'r,s,t,u' | split: ',' %}
              {% assign _g10 = 'v,w,x,y,z' | split: ',' %}
              {% if _g1 contains _first %}{% assign _c = 'c1' %}
              {% elsif _g2 contains _first %}{% assign _c = 'c2' %}
              {% elsif _g3 contains _first %}{% assign _c = 'c3' %}
              {% elsif _g4 contains _first %}{% assign _c = 'c4' %}
              {% elsif _g5 contains _first %}{% assign _c = 'c5' %}
              {% elsif _g6 contains _first %}{% assign _c = 'c6' %}
              {% elsif _g7 contains _first %}{% assign _c = 'c7' %}
              {% elsif _g8 contains _first %}{% assign _c = 'c8' %}
              {% elsif _g9 contains _first %}{% assign _c = 'c9' %}
              {% else %}{% assign _c = 'c10' %}{% endif %}
              <span class="tag-chip {{ _c }}"><a href="{{ '/tags/' | relative_url }}#tag-{{ t | slugify }}">{{ t }}</a></span>
            {% endfor %}
          </span>
        {% endif %}
      </li>
      {% assign _found = _found | plus: 1 %}
    {% endif %}
  {% endfor %}
  {% if _found == 0 %}
    <li><span class="a-muted">No notes yet.</span></li>
  {% endif %}
  </ul>
</section>
