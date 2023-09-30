---
layout: gallery
title: My Gallery
---

This is a collection of images and videos featuring Bob.

### Random Images

<div class="gallery">
  {% for image in site.static_files %}
    {% if image.path contains 'assets/photos' %}
      <div class="gallery-item">
        <img src="{{ image.path }}" alt="Random Image">
      </div>
    {% endif %}
  {% endfor %}
</div>
