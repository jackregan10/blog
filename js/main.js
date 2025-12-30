// Simple JS: toggle mobile nav
document.addEventListener('DOMContentLoaded', function(){
  var btn = document.querySelector('.nav-toggle');
  var nav = document.getElementById('main-nav');
  if (!btn || !nav) return;
  btn.addEventListener('click', function(){
    var expanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', String(!expanded));
    var isHidden = nav.getAttribute('aria-hidden') === 'false' ? false : true;
    if (isHidden){
      nav.setAttribute('aria-hidden', 'false');
      nav.style.display = 'block';
    } else {
      nav.setAttribute('aria-hidden', 'true');
      nav.style.display = 'none';
    }
  });
});

