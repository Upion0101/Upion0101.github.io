---
layout: gallery
title: My Gallery
---

This is a collection of random images and videos featuring Bob.

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

### Random Videos

<div class="gallery">
  {% for video in site.static_files %}
    {% if video.path contains 'assets/videos' %}
      <div class="gallery-item">
        <video width="320" height="240" controls>
          <source src="{{ video.path }}" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      </div>
    {% endif %}
  {% endfor %}
</div>