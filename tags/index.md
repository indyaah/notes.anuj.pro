---
layout: page
title: Tags
permalink: /tags/
order: 50
---

Browse notes by tag. Click a tag below to jump to its section.

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

<h2>All tags</h2>
<ul class="note-tags-list">
  {% for tag in _all_tags %}
    {% if tag and tag != '' %}
      {% assign _count = 0 %}
      {% for p in site.pages %}
        {% if p.url and p.url contains '/notes/' and p.tags and p.title and p.tags contains tag %}
          {% assign _count = _count | plus: 1 %}
        {% endif %}
      {% endfor %}
      <li class="note-tag"><a href="#tag-{{ tag | slugify }}">{{ tag }}{% if _count > 0 %} ({{ _count }}){% endif %}</a></li>
    {% endif %}
  {% endfor %}
</ul>

<hr>

{% for tag in _all_tags %}
  {% if tag and tag != '' %}
  <h2 id="tag-{{ tag | slugify }}">{{ tag }}</h2>
  <ul>
    {% assign _found = 0 %}
    {% assign _pages = site.pages | sort: 'title' %}
    {% for p in _pages %}
      {% if p.url and p.url contains '/notes/' and p.tags and p.title and p.tags contains tag %}
        <li><a href="{{ p.url | relative_url }}">{{ p.title }}</a></li>
        {% assign _found = _found | plus: 1 %}
      {% endif %}
    {% endfor %}
    {% if _found == 0 %}
      <li><span class="a-muted">No notes for this tag yet.</span></li>
    {% endif %}
  </ul>
  {% endif %}
{% endfor %}

{% endif %}
