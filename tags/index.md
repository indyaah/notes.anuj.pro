---
layout: page
title: Tag
permalink: /tags/
order: 50
---

Select a tag from any note to view its notes here. Looking for the full list? See <a href="{{ '/tags/all/' | relative_url }}">All tags</a>.

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

<div id="tag-view-container">
  {% for tag in _all_tags %}
    {% if tag and tag != '' %}
    <section class="tag-section" id="tag-{{ tag | slugify }}-section">
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
    </section>
    {% endif %}
  {% endfor %}
</div>

<p id="tag-hint" class="a-muted">Tip: click a tag on any note to jump straight here.</p>

{% endif %}
