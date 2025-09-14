---
layout: page
title: Philosophy
order: 10
permalink: /notes/philosophy/
---

Notes exploring the philosophy of software engineering: values, trade-offs, and first principles.

{% assign _pages = site.pages | sort: 'title' %}
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
