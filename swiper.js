const quoteComponent = document.querySelectorAll("[data-slider='component']");

quoteComponent.forEach((component) => {
  const perView = component.dataset.perView
    ? Number(component.dataset.perView)
    : undefined;
  const perViewMobile = component.dataset.perViewMobile
    ? Number(component.dataset.perViewMobile)
    : undefined;
  const gap = component.dataset.gap ? Number(component.dataset.gap) : undefined;

  const autoplay =
    component.dataset.autoplay === "true" ? { delay: 5000 } : false;

  const navContainer = component.closest("section");
  const nextEl = navContainer
    ? navContainer.querySelector('[data-slider="forwards"]')
    : null;
  const prevEl = navContainer
    ? navContainer.querySelector('[data-slider="backwards"]')
    : null;
  const progressEl = navContainer
    ? navContainer.querySelector('[data-slider="progress"]')
    : null;

  const totalSlides = component.querySelectorAll(".swiper-slide").length;

  const updateNavVisibility = (swiper) => {
    if (!navContainer) return;
    const currentPerView = swiper.params.slidesPerView;
    navContainer.style.display =
      typeof currentPerView === "number" && currentPerView >= totalSlides
        ? "none"
        : "";
  };

  const minProgress = 15;

  const updateProgress = (swiper, progress) => {
    if (!progressEl) return;
    progressEl.style.width = `${minProgress + progress * (100 - minProgress)}%`;
  };

  const swiper = new Swiper(component, {
    direction: "horizontal",
    loop: false,
    slidesPerView: perViewMobile ?? 1.25,
    spaceBetween: gap ?? 16,
    navigation: {
      nextEl,
      prevEl,
      disabledClass: "is-disabled",
    },
    autoplay,
    breakpoints: {
      768: {
        slidesPerView: perView ?? 3.5,
      },
    },
    on: {
      init: updateNavVisibility,
      breakpoint: updateNavVisibility,
      progress: updateProgress,
    },
  });
});
