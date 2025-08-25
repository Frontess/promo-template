document.addEventListener("DOMContentLoaded", function () {
  // Форма заявки
  const form = document.querySelector(".promo-form");
  const nameInput = document.getElementById("name");
  const phoneInput = document.getElementById("phone");
  const messageBox = document.getElementById("form-message");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    const phoneRegex =
      /^\+?\d{1,3}[\s-]?\(?\d{1,4}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/;

    if (!name || !phone) {
      messageBox.textContent = "Пожалуйста, заполните все поля.";
      messageBox.style.color = "red";
      return;
    }

    if (!phoneRegex.test(phone)) {
      messageBox.textContent = "Введите корректный номер телефона.";
      messageBox.style.color = "red";
      return;
    }

    messageBox.textContent = "Заявка отправлена!";
    messageBox.style.color = "green";
  });

  // Карусель
  const track = document.querySelector(".carousel-container");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  const cards = document.querySelectorAll(".card");

  // Прокрутка по кнопкам
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", () => {
      track.scrollBy({ left: -track.offsetWidth, behavior: "smooth" });
    });

    nextBtn.addEventListener("click", () => {
      track.scrollBy({ left: track.offsetWidth, behavior: "smooth" });
    });
  }

  // Карусель (Drag & Drop)
  let isDragging = false;
  let startX;
  let scrollStart;

  const startDrag = (x) => {
    isDragging = true;
    startX = x;
    scrollStart = track.scrollLeft;
    track.classList.add("dragging");
  };

  const moveDrag = (x) => {
    if (!isDragging) return;
    const delta = x - startX;
    track.scrollLeft = scrollStart - delta;
  };

  const endDrag = () => {
    isDragging = false;
    track.classList.remove("dragging");
  };

  track.addEventListener("mousedown", (e) => startDrag(e.pageX));
  track.addEventListener("mousemove", (e) => moveDrag(e.pageX));
  track.addEventListener("mouseup", endDrag);
  track.addEventListener("mouseleave", endDrag);

  track.addEventListener("touchstart", (e) => startDrag(e.touches[0].pageX));
  track.addEventListener("touchmove", (e) => moveDrag(e.touches[0].pageX));
  track.addEventListener("touchend", endDrag);

  // Автопрокрутка
  if (track) {
    setInterval(() => {
      const scrollIncrement = track.offsetWidth;
      if (track.scrollLeft + scrollIncrement >= track.scrollWidth) {
        track.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        track.scrollBy({ left: scrollIncrement, behavior: "smooth" });
      }
    }, 6000);
  }
});
