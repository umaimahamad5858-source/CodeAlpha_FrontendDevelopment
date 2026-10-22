const filterButtons = document.querySelectorAll(".filter");
const items = Array.from(document.querySelectorAll(".item"));

const lightbox = document.getElementById("lightbox");
const lbImg = document.getElementById("lbImg");
const lbCaption = document.getElementById("lbCaption");
const lbClose = document.getElementById("lbClose");
const lbPrev = document.getElementById("lbPrev");
const lbNext = document.getElementById("lbNext");

let visibleItems = [...items];
let currentIndex = 0;
let touchStartX = 0;

// -----------------------------
// FILTER IMAGES
// -----------------------------
function updateVisibleItems(category) {
    items.forEach((item) => {
        const itemCategory = item.dataset.category;

        if (category === "all" || itemCategory === category) {
            item.classList.remove("hide");
        } else {
            item.classList.add("hide");
        }
    });

    visibleItems = items.filter(
        (item) => !item.classList.contains("hide")
    );
}

// Filter button click
filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        filterButtons.forEach((btn) => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const category = button.dataset.filter;
        updateVisibleItems(category);

        // Close lightbox if no images are visible
        if (visibleItems.length === 0) {
            closeLightbox();
        }
    });
});

// -----------------------------
// SHOW IMAGE IN LIGHTBOX
// -----------------------------
function showImage(index) {
    if (visibleItems.length === 0) {
        return;
    }

    currentIndex =
        (index + visibleItems.length) % visibleItems.length;

    const image = visibleItems[currentIndex].querySelector("img");

    if (!image) {
        return;
    }

    lbImg.src = image.src;
    lbImg.alt = image.alt;

    lbCaption.textContent =
        `${image.alt} (${currentIndex + 1} / ${visibleItems.length})`;
}

// -----------------------------
// OPEN LIGHTBOX
// -----------------------------
function openLightbox(item) {
    const index = visibleItems.indexOf(item);

    if (index === -1) {
        return;
    }

    currentIndex = index;

    showImage(currentIndex);

    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";
}

// -----------------------------
// CLOSE LIGHTBOX
// -----------------------------
function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";
}

// -----------------------------
// IMAGE CLICK
// -----------------------------
items.forEach((item) => {

    item.addEventListener("click", () => {
        openLightbox(item);
    });

    // Keyboard support
    item.addEventListener("keydown", (event) => {

        if (event.key === "Enter" || event.key === " ") {

            event.preventDefault();

            openLightbox(item);
        }
    });

});

// -----------------------------
// NEXT BUTTON
// -----------------------------
lbNext.addEventListener("click", () => {
    showImage(currentIndex + 1);
});

// -----------------------------
// PREVIOUS BUTTON
// -----------------------------
lbPrev.addEventListener("click", () => {
    showImage(currentIndex - 1);
});

// -----------------------------
// CLOSE BUTTON
// -----------------------------
lbClose.addEventListener("click", () => {
    closeLightbox();
});

// -----------------------------
// CLICK OUTSIDE IMAGE TO CLOSE
// -----------------------------
lightbox.addEventListener("click", (event) => {

    if (event.target === lightbox) {
        closeLightbox();
    }

});

// -----------------------------
// KEYBOARD CONTROLS
// -----------------------------
document.addEventListener("keydown", (event) => {

    if (!lightbox.classList.contains("open")) {
        return;
    }

    if (event.key === "ArrowRight") {
        showImage(currentIndex + 1);
    }

    if (event.key === "ArrowLeft") {
        showImage(currentIndex - 1);
    }

    if (event.key === "Escape") {
        closeLightbox();
    }

});

// -----------------------------
// TOUCH / SWIPE SUPPORT
// -----------------------------
lightbox.addEventListener(
    "touchstart",
    (event) => {
        touchStartX = event.changedTouches[0].clientX;
    },
    { passive: true }
);

lightbox.addEventListener(
    "touchend",
    (event) => {

        const touchEndX = event.changedTouches[0].clientX;

        const difference = touchEndX - touchStartX;

        if (Math.abs(difference) > 50) {

            if (difference < 0) {
                showImage(currentIndex + 1);
            } else {
                showImage(currentIndex - 1);
            }

        }
    },
    { passive: true }
);
