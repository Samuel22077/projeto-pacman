// Pac-Man comendo bolinhas
(function() {
  const canvas = document.getElementById('chaseCanvas');
  const ctx    = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  const CY = H / 2, R = 16;
  let pacX = -R, tick = 0;
  const dots = [];
  for (let x = 20; x < W; x += 22) dots.push({ x, eaten: false });

  function loop() {
    ctx.clearRect(0, 0, W, H);
    tick++;
    for (const d of dots) {
      if (!d.eaten) {
        ctx.beginPath(); ctx.arc(d.x, CY, 3, 0, Math.PI*2);
        ctx.fillStyle = '#ffb8ae'; ctx.fill();
      }
    }
    for (const d of dots)
      if (!d.eaten && Math.abs(pacX - d.x) < R) d.eaten = true;
    if (pacX > W + R) { pacX = -R; dots.forEach(d => d.eaten = false); }
    pacX += 1.6;
    const mouth = 0.04 + Math.abs(Math.sin(tick * 0.18)) * 0.28;
    ctx.save();
    ctx.translate(pacX, CY);
    ctx.beginPath(); ctx.moveTo(0, 0);
    ctx.arc(0, 0, R, mouth*Math.PI, (2-mouth)*Math.PI);
    ctx.closePath(); ctx.fillStyle = '#FFE000'; ctx.fill();
    ctx.beginPath(); ctx.arc(R*0.2, -R*0.45, R*0.12, 0, Math.PI*2);
    ctx.fillStyle = '#000'; ctx.fill();
    ctx.restore();
    requestAnimationFrame(loop);
  }
  loop();
})();

// Ícones da tabela
(function() {
  const d1 = document.getElementById('dot1').getContext('2d');
  d1.beginPath(); d1.arc(7, 7, 3, 0, Math.PI*2);
  d1.fillStyle = '#ffb8ae'; d1.fill();

  const d2 = document.getElementById('dot2').getContext('2d');
  d2.beginPath(); d2.arc(7, 7, 6, 0, Math.PI*2);
  d2.fillStyle = '#ffb8ae'; d2.fill();

  const c1 = document.getElementById('cherry1').getContext('2d');
  c1.fillStyle = '#FF0000';
  c1.beginPath(); c1.arc(6, 12, 5, 0, Math.PI*2); c1.fill();
  c1.beginPath(); c1.arc(14, 12, 5, 0, Math.PI*2); c1.fill();
  c1.strokeStyle = '#00aa00'; c1.lineWidth = 2;
  c1.beginPath(); c1.moveTo(6, 7); c1.quadraticCurveTo(10, 2, 14, 7);
  c1.stroke();

  const b1 = document.getElementById('bonus1').getContext('2d');
  b1.fillStyle = '#FFD700';
  b1.font = '14px serif';
  b1.textAlign = 'center';
  b1.fillText('★', 10, 15);
})();

function startGame() { window.location.href = 'pacman.html'; }
document.addEventListener('keydown', e => { if (e.key === 'Enter') 
startGame(); });