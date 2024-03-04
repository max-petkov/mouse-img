class MouseTrail {
  constructor(config) {
    this.section =
      typeof config.section === "object"
        ? config.section
        : document.querySelector(config.section);

    this.mouse = {
      current: { x: 0, y: 0 },
      last: { x: 0, y: 0 },
      delta: { x: 0, y: 0 },
    };

    this.dist = {
        current: 0,
        total: 0,
    }

    this.gap = config.gap || 100;
    this.imgs = this.section.querySelectorAll("img");
    this.imgIndex = 0; 
  }

  events() {
      this.section.addEventListener("mousemove",this.mouseMove.bind(this));
      this.section.addEventListener("mouseenter",this.mouseEnter.bind(this));
  }

  mouseEnter(e) {
    this.mouse.last.x = e.clientX;
    this.mouse.last.y = e.clientY;
  }

  mouseMove(e) {
    this.mouse.current.x = e.clientX;
    this.mouse.current.y = e.clientY;

    this.mouse.delta.x = this.mouse.current.x - this.mouse.last.x;
    this.mouse.delta.y = this.mouse.current.y - this.mouse.last.y;

    
    this.mouse.last.x = this.mouse.current.x;
    this.mouse.last.y = this.mouse.current.y;

    
    this.dist.current = Math.hypot(this.mouse.delta.x, this.mouse.delta.y);
    this.dist.total += this.dist.current;

    
    if(this.dist.total > this.gap) {
        this.dist.total = 0;
        
        this.animate({
            head: this.imgs[this.imgIndex % this.imgs.length],
            tail: this.imgs[(this.imgIndex - 5) % this.imgs.length]
        });

        this.imgIndex++;
    }
  }

  animate(img) {
    img.head.style.top = this.mouse.current.y + "px";
    img.head.style.left = this.mouse.current.x + "px";
    img.head.style.zIndex = this.imgIndex;

    img.head.setAttribute("data-status", "active");
    if(img.tail) img.tail.setAttribute("data-status", "hidden");
  }

  images() {
    const url = 'https://picsum.photos/v2/list?page=3';

    fetch(url)
    .then(res => res.json())
    .then(res => res.forEach(img => console.log(img)))
    .catch(err => console.log(err))
  }

  init() {
    this.events();
    // this.images();
  }
}

new MouseTrail({
  section: ".mouse--imgs",
  gap: 100,
}).init();
