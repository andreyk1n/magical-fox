// Рекомендації https://andreyk1n.github.io/webAudit/
document.addEventListener("DOMContentLoaded", () => {
    let errorCount = 1; // Лічильник помилок

    function logError(message, element) {
        console.warn(`${errorCount++}: ${message}`, element);
        if (element) {
            element.style.border = "2px dashed red"; // Підсвічування проблемного елемента
        }
    }

    function checkTitle() {
        if (!document.title) {
            logError("Тег <title> відсутній.");
        }
    }

    function checkMetaDescription() {
        const metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            logError("Мета-опис (meta description) відсутній.");
        }
    }

    function checkHeadings() {
        const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
        if (!headings.length) {
            logError("Заголовки (h1-h6) відсутні.");
        }
    }

    function checkImageAltAttributes() {
        document.querySelectorAll("img").forEach(img => {
            if (!img.alt) {
                logError("Зображення без атрибуту alt:", img);
            }

            const widthAttr = img.getAttribute("width");
            const heightAttr = img.getAttribute("height");
            const decimalPattern = /^\d+\.\d+$/;

            if (decimalPattern.test(widthAttr) || decimalPattern.test(heightAttr)) {
                logError("Зображення має width або height з десятковим значенням. Перевірте, чи у вас не встановлено width або height як 'auto':", img);
            }

            const computedStyles = window.getComputedStyle(img);
            const computedWidth = parseFloat(computedStyles.width);
            const computedHeight = parseFloat(computedStyles.height);

            if (!Number.isInteger(computedWidth) || !Number.isInteger(computedHeight)) {
                logError('Зображення має дробове значення width або height - можливо, у CSS встановлено width або height як "auto":', img);
            }

            if (computedStyles.width === "auto" || computedStyles.height === "auto") {
                logError("Зображення має width або height, встановлені як 'auto' через CSS:", img);
            }
        });
    }

    function checkCanonicalTag() {
        const canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) {
            logError("Канонічний тег відсутній.");
        }
    }

    function checkAriaAttributes() {
        document.querySelectorAll("button, [role]").forEach(el => {
            if (!el.hasAttribute("aria-label") && !el.hasAttribute("aria-labelledby")) {
                logError("Інтерактивний елемент без aria-label або aria-labelledby:", el);
            }
        });
    }

    function checkFocusStyles() {
        const focusableElements = document.querySelectorAll("button, a, input, select, textarea");
        focusableElements.forEach(el => {
            const focusStyles = window.getComputedStyle(el, ":focus");
            if (!focusStyles || !focusStyles.outline) {
                logError("Елемент без видимого фокуса:", el);
            }
        });
    }

    function checkContrast() {
        const getColorContrast = (bgColor, fgColor) => {
            const parseColor = color => {
                const hexMatch = color.match(/[a-f\d]{2}/gi);
                return hexMatch ? hexMatch.map(val => parseInt(val, 16) / 255) : null;
            };
            const bgRGB = parseColor(bgColor);
            const fgRGB = parseColor(fgColor);
            if (!bgRGB || !fgRGB) return null;

            const luminance = ([r, g, b]) =>
                0.2126 * (r <= 0.03928 ? r / 12.92 : ((r + 0.055) / 1.055) ** 2.4) +
                0.7152 * (g <= 0.03928 ? g / 12.92 : ((g + 0.055) / 1.055) ** 2.4) +
                0.0722 * (b <= 0.03928 ? b / 12.92 : ((b + 0.055) / 1.055) ** 2.4);

            const contrastRatio = (l1, l2) => (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);

            return contrastRatio(luminance(bgRGB), luminance(fgRGB));
        };

        document.querySelectorAll("*").forEach(el => {
            const bgColor = window.getComputedStyle(el).backgroundColor;
            const fgColor = window.getComputedStyle(el).color;
            const contrastRatio = getColorContrast(bgColor, fgColor);

            if (contrastRatio && contrastRatio < 4.5) {
                logError(`Низький рівень контрастності (${contrastRatio.toFixed(2)}):`, el);
            }
        });
    }

    function checkOpenGraphTags() {
        const requiredTags = ['og:title', 'og:description', 'og:image'];
        requiredTags.forEach(tag => {
            const metaTag = document.querySelector(`meta[property="${tag}"]`);
            if (!metaTag) {
                logError(`Мета-тег Open Graph ${tag} відсутній.`);
            }
        });
    }

    function checkTwitterCardTags() {
        const requiredTags = ['twitter:card', 'twitter:title', 'twitter:description', 'twitter:image'];
        requiredTags.forEach(tag => {
            const metaTag = document.querySelector(`meta[name="${tag}"]`);
            if (!metaTag) {
                logError(`Мета-тег Twitter Card ${tag} відсутній.`);
            }
        });
    }

    function checkRobotsTxt() {
        // Цю перевірку можна реалізувати через запит до сервера для отримання robots.txt.
        logError("Перевірте наявність файлу robots.txt на сервері.");
    }

    function checkSitemapXml() {
        // Цю перевірку можна реалізувати через запит до сервера для отримання sitemap.xml.
        logError("Перевірте наявність файлу sitemap.xml на сервері.");
    }

    function checkURLStructure() {
        const url = window.location.href;
        const forbiddenChars = /[^a-zA-Z0-9\-_.~:\/?=&%]/;
        if (forbiddenChars.test(url)) {
            logError("URL містить недопустимі символи.");
        }
    }

    function checkFormAccessibility() {
        document.querySelectorAll("form").forEach(form => {
            const inputs = form.querySelectorAll("input, select, textarea");
            inputs.forEach(input => {
                if (!input.labels.length) {
                    logError("Поле вводу без пов'язаного ярлика (label):", input);
                }
            });
        });
    }

    function checkDuplicateContent() {
        const textElements = document.querySelectorAll("p, h1, h2, h3, h4, h5, h6, span, li, div"); // Вибираємо текстові елементи
        const textMap = new Map(); // Використовуємо Map для відстеження унікальних текстів
    
        textElements.forEach(el => {
            const textContent = el.textContent.trim();
            if (textContent && textMap.has(textContent)) {
                logError("Дубльований текстовий контент:", el);
            } else if (textContent) {
                textMap.set(textContent, true);
            }
        });
    }
    
    function checkBlockingScripts() {
        document.querySelectorAll("script").forEach(script => {
            const hasAsyncOrDefer = script.hasAttribute("async") || script.hasAttribute("defer");
            if (!hasAsyncOrDefer && !script.src.includes("://")) { // Перевіряємо тільки внутрішні скрипти
                logError("Скрипт без async або defer, який може блокувати рендеринг:", script);
            }
        });
    }

    function checkMediaAltAttributes() {
        document.querySelectorAll("video, audio").forEach(media => {
            if (!media.getAttribute("title")) {
                logError("Медіа елемент без атрибуту title:", media);
            }
        });
    }

    // Виклик усіх перевірок
    checkTitle();
    checkMetaDescription();
    checkHeadings();
    checkImageAltAttributes();
    checkCanonicalTag();
    checkAriaAttributes();
    checkFocusStyles();
    checkContrast();
    checkOpenGraphTags();
    checkTwitterCardTags();
    checkRobotsTxt();
    checkSitemapXml();
    checkURLStructure();
    checkFormAccessibility();
    checkDuplicateContent();
    checkBlockingScripts();
    checkMediaAltAttributes();

    console.log(`Перевірка SEO та доступності завершена. Виявлено помилок -- ${errorCount}.`);
});