---
layout: page
title: All notes
permalink: /notes/all/
order: 2
---

Browse all notes grouped by top-level topic.

{% assign _pages = site.pages | sort: 'title' %}

<section>
  <h2><a href="{{ '/notes/philosophy/' | relative_url }}">Philosophy</a></h2>
  <ul>
  {% assign _found = 0 %}
  {% for p in _pages %}
    {% if p.url and p.url contains '/notes/philosophy/' and p.url != '/notes/philosophy/' and p.title %}
      <li><a href="{{ p.url | relative_url }}">{{ p.title }}</a></li>
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
      <li><a href="{{ p.url | relative_url }}">{{ p.title }}</a></li>
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
      <li><a href="{{ p.url | relative_url }}">{{ p.title }}</a></li>
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
      <li><a href="{{ p.url | relative_url }}">{{ p.title }}</a></li>
      {% assign _found = _found | plus: 1 %}
    {% endif %}
  {% endfor %}
  {% if _found == 0 %}
    <li><span class="a-muted">No notes yet.</span></li>
  {% endif %}
  </ul>
</section>
