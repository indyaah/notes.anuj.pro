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
      <li class="note-tag"><a href="{{ '/tags/' | relative_url }}#tag-{{ tag | slugify }}">{{ tag }}{% if _count > 0 %} ({{ _count }}){% endif %}</a></li>
    {% endif %}
  {% endfor %}
</ul>
{% endif %}
