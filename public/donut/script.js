const base = `<span class="console__user">$root</span > <span class="console__separator">></span>`;
const baseWithCursor = base + " _";

const command = "node --watch ./i♥coffee.js".split("");

const code = document.createElement("pre");
code.classList.add("console");
code.innerHTML = base;
document.body.appendChild(code);

// INFO: Ожидание ввода комманды. В это время происходит моргание каретки ввода.
const awaiting = () => {
  let time = 1;
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      if (time > 2) {
        clearInterval(interval);
        resolve();
      } else {
        code.innerHTML = time % 2 === 0 ? base : baseWithCursor;
        time++;
      }
    }, 800);
  });
};

// INFO: Процесс ввода комманды.
const typing = () => {
  return new Promise((resolve) => {
    let step = 1;
    const interval = setInterval(() => {
      if (step > command.length) {
        clearInterval(interval);
        return resolve();
      }
      code.innerHTML = `${base} ${command.slice(0, step).join("")}`;
      step++;
    }, 80);
  });
};

// INFO: Вывод приветствия.
const welcome = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      code.innerHTML = `<span class="welcome"><span class="welcome__separators">======</span> Привет и добро пожаловать в <span class="welcome__company">BitBox!</span> <span class="welcome__separators">======</span></span>`;
      resolve();
    }, 500);
  });
};

// INFO: Запуск крутящегося пончика.
const spin = () => {
  const pre = document.createElement("pre");
  pre.classList.add("donut");
  document.body.appendChild(pre);

  let x = 1760,
    z = 0,
    y = 0;
  setInterval(() => {
    (z += 0.07), (y += 0.03);
    const a = [...new Array(x)].map((_, r) => (r % 80 === 79 ? "\n" : " ")),
      r = new Array(x).fill(0),
      t = Math.cos(z),
      e = Math.sin(z),
      n = Math.cos(y),
      o = Math.sin(y);
    for (let s = 0; s < 6.28; s += 0.07) {
      const c = Math.cos(s),
        h = Math.sin(s);
      for (let s = 0; s < 6.28; s += 0.02) {
        const v = Math.sin(s),
          M = Math.cos(s),
          i = c + 2,
          l = 1 / (v * i * e + h * t + 5),
          p = v * i * t - h * e,
          d = 0 | (40 + 30 * l * (M * i * n - p * o)),
          m = 0 | (12 + 15 * l * (M * i * o + p * n)),
          f =
            0 | (8 * ((h * e - v * c * t) * n - v * c * e - h * t - M * c * o)),
          y = d + 80 * m;
        m < 22 &&
          m >= 0 &&
          d >= 0 &&
          d < 79 &&
          l > r[y] &&
          ((r[y] = l), (a[y] = ".,-~:;=!*#$@"[f > 0 ? f : 0]));
      }
    }
    pre.innerHTML = a.join("");
  }, 50); /* JS by 
                @housamz */

  // Inspired by
  // https://www.a1k0n.net/2011/07/20/donut-math.html
};

const start = async () => {
  await awaiting();
  await typing();
  await welcome();
  spin();
};

start();
