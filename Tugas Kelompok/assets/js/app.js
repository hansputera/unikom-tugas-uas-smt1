document.addEventListener("DOMContentLoaded", () => {
  /* ================= TAB SYSTEM ================= */
  const tabs = document.querySelectorAll(".tab-btn");
  const contents = document.querySelectorAll(".tab-content");
  const details = document.querySelectorAll(".detail-page");

  function resetView() {
    tabs.forEach((b) => b.classList.remove("active"));
    contents.forEach((c) => c.classList.remove("active"));
    details.forEach((d) => (d.style.display = "none"));
  }

  tabs.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.dataset.tab;
      const targetSection = document.getElementById(targetId);
      if (!targetSection) return;

      resetView();
      btn.classList.add("active");
      targetSection.classList.add("active");
    });
  });

  /* ================= ROADMAP CARD ================= */
  document.querySelectorAll(".roadmap-card").forEach((card) => {
    let timer;
    let animating = false;

    /* Hover animation */
    card.addEventListener("mouseenter", () => {
      if (animating) return;
      animating = true;

      card.classList.add("hide");
      clearTimeout(timer);

      timer = setTimeout(() => {
        card.classList.remove("hide");
        card.classList.add("spin");
        animating = false;
      }, 450);
    });

    card.addEventListener("mouseleave", () => {
      clearTimeout(timer);
      card.classList.remove("hide", "spin");
      animating = false;
    });

    /* Click → Detail Page (JIKA ADA data-detail) */
    card.addEventListener("click", () => {
      const type = card.dataset.detail;
      if (!type) return;

      const detail = document.getElementById(`detail-${type}`);
      if (!detail) return;

      resetView();
      detail.style.display = "block";
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  /* ================= BACK BUTTON ================= */
  document.querySelectorAll(".back-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      resetView();

      const roadmapTab = document.querySelector('[data-tab="roadmap"]');
      const roadmapSection = document.getElementById("roadmap");

      if (roadmapTab) roadmapTab.classList.add("active");
      if (roadmapSection) roadmapSection.classList.add("active");

      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  /* ================= ABOUT EXPANDABLE ================= */
  document.querySelectorAll(".expandable-card").forEach((card) => {
    let timer;

    /* Click → expand */
    card.addEventListener("click", () => {
      card.classList.toggle("expanded");
    });

    /* Hover animation (reuse roadmap animation) */
    card.addEventListener("mouseenter", () => {
      if (card.classList.contains("expanded")) return;

      card.classList.add("hide");
      clearTimeout(timer);

      timer = setTimeout(() => {
        card.classList.remove("hide");
        card.classList.add("spin");
      }, 450);
    });

    card.addEventListener("mouseleave", () => {
      clearTimeout(timer);
      card.classList.remove("hide", "spin");
    });
  });
});
