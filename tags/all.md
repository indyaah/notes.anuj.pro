---
layout: page
title: All tags
permalink: /tags/all/
order: 51
---

Browse all tags across notes. Click a tag to view notes for that tag.

{% assign _tagstring = '' %}
{% for p in site.pages %}
  {% if p.url and p.url contains '/notes/' and p.tags and p.title %}
    {% for t in p.tags %}
      {% assign _tagstring = _tagstring | append: t | append: '|' %}
    {% endfor %}
  {% endif %}
{% endfor %}
{% assign _all_tags = _tagstring | split: '|' | uniq | sort %}

{% if _all_tags.size == 0 %}
<p class="a-muted">No tags yet.</p>
{% else %}
<ul class="note-tags-list">
  {% for tag in _all_tags %}
    {% if tag and tag != '' %}
      {% assign _count = 0 %}
      {% for p in site.pages %}
        {% if p.url and p.url contains '/notes/' and p.tags and p.title and p.tags contains tag %}
          {% assign _count = _count | plus: 1 %}
        {% endif %}
      {% endfor %}
      {% assign _slug = tag | slugify %}
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
      <li class="tag-chip {{ _c }}"><a href="{{ '/tags/' | relative_url }}#tag-{{ tag | slugify }}">{{ tag }}{% if _count > 0 %} ({{ _count }}){% endif %}</a></li>
    {% endif %}
  {% endfor %}
</ul>
{% endif %}
