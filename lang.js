document.addEventListener("DOMContentLoaded", () => {
    // 1. Tạo thanh Switch chèn tự động vào body
    const switchHTML = `
        <div class="lang-switch-container">
            <span class="lang-label id-en active">EN</span>
            <label class="switch">
                <input type="checkbox" id="lang-toggle">
                <span class="slider"></span>
            </label>
            <span class="lang-label id-vi">VI</span>
        </div>
    `;
    document.body.insertAdjacentHTML('afterbegin', switchHTML);

    const langToggle = document.getElementById("lang-toggle");
    const labelEN = document.querySelector(".lang-label.id-en");
    const labelVI = document.querySelector(".lang-label.id-vi");

    // 2. Lấy ngôn ngữ đã lưu (Mặc định là 'en')
    const savedLang = localStorage.getItem("preferred_lang") || "en";
    
    // Đặt trạng thái ban đầu cho checkbox (checked = vi, unchecked = en)
    langToggle.checked = (savedLang === "vi");
    
    // Áp dụng ngôn ngữ ban đầu ngay lập tức (không chờ hiệu ứng)
    applyLanguage(savedLang, false);

    // 3. Sự kiện gạt công tắc
    langToggle.addEventListener("change", () => {
        const selectedLang = langToggle.checked ? "vi" : "en";
        localStorage.setItem("preferred_lang", selectedLang);
        applyLanguage(selectedLang, true); // Chạy kèm hiệu ứng mượt
    });

    function applyLanguage(lang, animate = true) {
        // Cập nhật nhãn của nút Switch
        if (lang === "vi") {
            labelVI.classList.add("active");
            labelEN.classList.remove("active");
            document.documentElement.lang = "vi";
        } else {
            labelEN.classList.add("active");
            labelVI.classList.remove("active");
            document.documentElement.lang = "en";
        }

        const elements = document.querySelectorAll("[data-en][data-vi]");

        if (animate) {
            // Bước 1: Mờ dần chữ (Fade-out)
            elements.forEach(el => el.classList.add("lang-changing"));

            // Bước 2: Đợi hiệu ứng mờ xong (200ms) rồi mới đổi chữ & Hiện lên (Fade-in)
            setTimeout(() => {
                elements.forEach(el => {
                    el.innerHTML = el.getAttribute(`data-${lang}`);
                    el.classList.remove("lang-changing");
                });
            }, 200);
        } else {
            // Trường hợp tải trang lần đầu: Đổi luôn không cần chờ
            elements.forEach(el => {
                el.innerHTML = el.getAttribute(`data-${lang}`);
            });
        }
    }
});