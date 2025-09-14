---
layout: page
title: Tools
order: 30
permalink: /notes/tools/
---

Notes about the tools we use to build software effectively.

{% assign _pages = site.pages | sort: 'title' %}
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
