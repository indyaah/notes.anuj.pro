---
layout: page
title: Process
order: 20
permalink: /notes/process/
---

Processes that improve outcomes through feedback, visibility, and alignment.

{% assign _pages = site.pages | sort: 'title' %}
<ul>
{% assign _found = 0 %}
{% for p in _pages %}
  {% if p.url and p.url contains '/notes/methodologies/' and p.title %}
    <li><a href="{{ p.url | relative_url }}">{{ p.title }}</a></li>
    {% assign _found = _found | plus: 1 %}
  {% endif %}
{% endfor %}
{% if _found == 0 %}
  <li><span class="a-muted">No notes yet.</span></li>
{% endif %}
</ul>
