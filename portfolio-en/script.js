const portfolioVideos = document.querySelectorAll(".iphone-frame video");

function loadPortfolioVideo(video) {
  if (!video.dataset.src || video.src) {
    return;
  }

  video.src = video.dataset.src;
  video.load();
}

const videoObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      loadPortfolioVideo(entry.target);
      videoObserver.unobserve(entry.target);
    }
  });
}, {
  root: document.querySelector(".iphone-gallery"),
  rootMargin: "260px",
  threshold: 0.01
});

portfolioVideos.forEach((video) => {
  videoObserver.observe(video);

  video.addEventListener("play", () => {
    loadPortfolioVideo(video);

    portfolioVideos.forEach((otherVideo) => {
      if (otherVideo !== video) {
        otherVideo.pause();
      }
    });
  });
});
