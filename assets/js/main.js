// Copy email to clipboard
document.addEventListener('click', function(e){
  const btn = e.target.closest('[data-copy]');
  if(!btn) return;
  const text = btn.getAttribute('data-copy');
  navigator.clipboard && navigator.clipboard.writeText(text).then(function(){
    const label = btn.querySelector('.copy-label');
    if(label){
      const original = label.textContent;
      label.textContent = 'copied!';
      setTimeout(function(){ label.textContent = original; }, 1400);
    }
  });
});

// Lightbox for illustration gallery
document.addEventListener('DOMContentLoaded', function(){
  const lightbox = document.querySelector('.lightbox');
  if(!lightbox) return;
  const lbImg = lightbox.querySelector('img');
  const lbCaption = lightbox.querySelector('figcaption');

  document.querySelectorAll('.g-item').forEach(function(item){
    item.addEventListener('click', function(){
      const img = item.querySelector('img');
      lbImg.src = img.src;
      lbImg.alt = img.alt;
      lbCaption.textContent = item.getAttribute('data-caption') || img.alt;
      lightbox.classList.add('open');
    });
  });

  lightbox.addEventListener('click', function(e){
    if(e.target === lightbox || e.target.closest('.lightbox-close')){
      lightbox.classList.remove('open');
    }
  });
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape') lightbox.classList.remove('open');
  });
});

// Click a progress video to enlarge it in a lightbox; click the surrounding area to close
document.addEventListener('DOMContentLoaded', function(){
  const videoLightbox = document.querySelector('.video-lightbox');
  if(!videoLightbox) return;
  const lbVideoWrap = videoLightbox.querySelector('.lightbox-video-wrap');
  const lbVideo = videoLightbox.querySelector('video');

  function closeVideoLightbox(){
    lbVideo.pause();
    videoLightbox.classList.remove('open');
  }

  document.querySelectorAll('.video-wrap').forEach(function(wrap){
    const video = wrap.querySelector('video');
    if(!video) return;
    wrap.addEventListener('click', function(){
      lbVideoWrap.style.aspectRatio = wrap.getAttribute('data-aspect') || '';
      lbVideo.src = video.currentSrc || video.src;
      videoLightbox.classList.add('open');
      lbVideo.currentTime = 0;
      lbVideo.play();
    });
  });

  videoLightbox.addEventListener('click', function(e){
    if(e.target === videoLightbox || e.target.closest('.lightbox-close')){
      closeVideoLightbox();
    }
  });
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && videoLightbox.classList.contains('open')) closeVideoLightbox();
  });
});
