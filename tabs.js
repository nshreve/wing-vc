// Tabs Component
{
  const components = document.querySelectorAll("[data-tabs='component']");

  components.forEach((c) => {
    const tab = Array.from(c.querySelectorAll("[data-tabs='item']"));
    const visual = Array.from(c.querySelectorAll("[data-tabs='visual'] > *"));

    const activate = (index) => {
      const targetVisual = visual[index]?.children.length
        ? visual[index]
        : visual[0];
      tab.forEach((el) => el.classList.remove("is-active"));
      visual.forEach((el) => el.classList.remove("is-active"));
      tab[index].classList.add("is-active");
      targetVisual.classList.add("is-active");
    };

    tab.forEach((t, index) => {
      t.addEventListener("mouseenter", () => activate(index));
      t.addEventListener("click", () => activate(index));
    });

    // Init
    activate(0);
  });
}
