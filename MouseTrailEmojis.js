class MouseTrailImages {
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
    };

    this.gap = config.gap || 100;
    this.emojis = [
      "🐶",
      "🐱",
      "🐭",
      "🐹",
      "🐰",
      "🐻",
      "🐼",
      "🐨",
      "🐯",
      "🦁",
      "🐮",
      "🐷",
      "🐸",
      "🐵",
      "🐔",
      "⚽",
      "🏀",
      "🏈",
      "⚾",
      "🎾",
      "🏐",
      "🏉",
      "🎱",
      "🏓",
      "🏸",
      "🥅",
      "🏒",
      "🏑",
      "🥊",
      "🥋",
      "😀",
      "😃",
      "😄",
      "😁",
      "😆",
      "😅",
      "😂",
      "🤣",
      "😊",
      "😇",
      "🙂",
      "🙃",
      "😉",
      "😌",
      "😍",
      "🥰",
      "😘",
      "😗",
      "😙",
      "😚",
    ];
  }

  events() {
    this.section.addEventListener("mousemove", this.mouseMove.bind(this));
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

    if (this.dist.total > this.gap) {
      this.dist.total = 0;
      this.createEmoji();
    }
  }

  createEmoji() {
    let emoji = document.createElement("span");
    emoji.textContent = this.emojis[Math.round(Math.random() * (this.emojis.length - 1))];
    emoji.style.top = this.mouse.current.y + "px";
    emoji.style.left = this.mouse.current.x + "px";
    emoji.classList.add("emoji", "animate");
    emoji.style.setProperty("--y", this.randomNumber(150) + "px");
    emoji.style.setProperty("--x", this.randomNumber(150) + "px");

    this.section.append(emoji);


    setTimeout(() => {
      emoji.remove();
      emoji = null;
    }, 800)
  }

  randomNumber(n) {
    return Math.floor(Math.random() * (n - (-n) + 1)) - n;
}

  images() {
    const url = "https://picsum.photos/v2/list?page=3";

    fetch(url)
      .then((res) => res.json())
      .then((res) => res.forEach((img) => console.log(img)))
      .catch((err) => console.log(err));
  }

  init() {
    this.events();
  }
}

new MouseTrailImages({
  section: ".mouse--emojis",
  gap: 5,
}).init();
