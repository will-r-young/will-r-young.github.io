let userInteracting = false;
let trailInterval;

document.addEventListener("mousemove", (e) => {
  userInteracting = true;

  const trail = document.createElement("div");
  trail.className = "trail";
  trail.style.left = `${e.pageX}px`;
  trail.style.top = `${e.pageY}px`;
  document.body.appendChild(trail);

  setTimeout(() => {
    trail.remove();
  }, 800);

  mouse.x = e.clientX;
  mouse.y = e.clientY;
});
