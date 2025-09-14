---
layout: home
title: Engineering Notes
permalink: /
---

{% comment %}
  Dynamically list all top-level sections under /notes/ and their child notes.
  - Discovers section slugs from page URLs, excluding reserved "all".
  - Uses the section index page title as the label (fallback to capitalized slug).
  - Sorts sections by the index page `order` (fallback 9999).
  - Displays tag chips with deterministic colors.
{% endcomment %}

{% assign _pages = site.pages | sort: 'title' %}

{% assign _sections_raw = '' %}
{% for p in site.pages %}
  {% if p.url and p.url contains '/notes/' and p.title %}
    {% assign _u = p.url %}
    {% assign _rest = _u | remove_first: '/notes/' %}
    {% assign _slug = _rest | split: '/' | first %}
    {% if _slug and _slug != '' and _slug != 'all' %}
      {% assign _sections_raw = _sections_raw | append: _slug | append: '|' %}
    {% endif %}
  {% endif %}
{% endfor %}
{% assign _section_slugs = _sections_raw | split: '|' | uniq | sort %}

{% assign _pairs = '' %}
{% for _slug in _section_slugs %}
  {% assign _section_url = '/notes/' | append: _slug | append: '/' %}
  {% assign _ord = 9999 %}
  {% for ip in site.pages %}
    {% if ip.url == _section_url and ip.order %}
      {% assign _ord = ip.order %}
      {% break %}
    {% endif %}
  {% endfor %}
  {% assign _pairs = _pairs | append: _ord | append: '::' | append: _slug | append: '|' %}
{% endfor %}
{% assign _items = _pairs | split: '|' | sort %}

{% for it in _items %}
  {% if it and it != '' %}
    {% assign _bits = it | split: '::' %}
    {% assign _slug = _bits[1] %}
    {% assign _section_url = '/notes/' | append: _slug | append: '/' %}
    {% assign _label = '' %}
    {% for ip in site.pages %}
      {% if ip.url == _section_url and ip.title %}
        {% assign _label = ip.title %}
        {% break %}
      {% endif %}
    {% endfor %}
    {% if _label == '' %}
      {% assign _label = _slug | replace: '-', ' ' | capitalize %}
    {% endif %}

<section>
  <h2><a href="{{ _section_url | relative_url }}">{{ _label }}</a></h2>
  <ul>
  {% assign _found = 0 %}
  {% for p in _pages %}
    {% if p.url and p.url contains _section_url and p.url != _section_url and p.title %}
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

  {% endif %}
{% endfor %}
