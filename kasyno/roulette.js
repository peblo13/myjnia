// Ruletka logic for Kasyno VIP
// Adds SVG segments, spin animation, and result display

const rouletteNumbers = [
  0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26
];
const rouletteColors = [
  'green', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black'
];

function showRoulette() {
  document.getElementById('roulette-section').style.display = 'block';
  drawRouletteWheel();
}
function hideRoulette() {
  document.getElementById('roulette-section').style.display = 'none';
}

function drawRouletteWheel() {
  const g = document.getElementById('wheel-segments');
  if (!g) return;
  g.innerHTML = '';
  const cx = 160, cy = 160, r = 140;
  const n = rouletteNumbers.length;
  for (let i = 0; i < n; i++) {
    const angle1 = (2 * Math.PI * i) / n;
    const angle2 = (2 * Math.PI * (i + 1)) / n;
    const x1 = cx + r * Math.cos(angle1);
    const y1 = cy + r * Math.sin(angle1);
    const x2 = cx + r * Math.cos(angle2);
    const y2 = cy + r * Math.sin(angle2);
    const color = rouletteColors[i] === 'red' ? '#e53935' : rouletteColors[i] === 'black' ? '#222' : '#43e97b';
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const d = `M${cx},${cy} L${x1},${y1} A${r},${r} 0 0,1 ${x2},${y2} Z`;
    path.setAttribute('d', d);
    path.setAttribute('fill', color);
    path.setAttribute('stroke', '#fff');
    path.setAttribute('stroke-width', '1');
    g.appendChild(path);
    // Number label
    const labelAngle = (angle1 + angle2) / 2;
    const lx = cx + (r - 30) * Math.cos(labelAngle);
    const ly = cy + (r - 30) * Math.sin(labelAngle) + 6;
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', lx);
    text.setAttribute('y', ly);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('font-size', '18');
    text.setAttribute('fill', '#fff');
    text.setAttribute('font-family', 'Inter, Arial, sans-serif');
    text.textContent = rouletteNumbers[i];
    g.appendChild(text);
  }
}

let spinning = false;
function spinRoulette() {
  if (spinning) return;
  spinning = true;
  const n = rouletteNumbers.length;
  const resultIndex = Math.floor(Math.random() * n);
  const anglePer = 360 / n;
  const stopAngle = 360 * 5 + (360 - resultIndex * anglePer - anglePer / 2); // 5 full spins + result
  const svg = document.querySelector('#roulette-wheel svg');
  svg.style.transition = 'none';
  svg.style.transform = 'rotate(0deg)';
  setTimeout(() => {
    svg.style.transition = 'transform 4s cubic-bezier(0.23,1.12,0.32,1)';
    svg.style.transform = `rotate(${stopAngle}deg)`;
    setTimeout(() => {
      document.getElementById('roulette-result').textContent = `Wynik: ${rouletteNumbers[resultIndex]} (${rouletteColors[resultIndex]})`;
      spinning = false;
    }, 4200);
  }, 50);
}

// If the DOM is ready, draw the wheel for preview
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  setTimeout(drawRouletteWheel, 200);
} else {
  document.addEventListener('DOMContentLoaded', drawRouletteWheel);
}
