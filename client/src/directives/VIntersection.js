export default {
    mounted(el, binding) {
        const options = {
            rootMargin: "0px",
            threshold: [0, 1], // Добавьте здесь два значения для определения входа и выхода из пересечения
        };
        const callback = (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && entry.intersectionRatio > 0) {
                    // Функция срабатывает при входе в пересечение
                    binding.value();
                }
                // Если элемент полностью вышел из пересечения, настройки IntersectionObserver будут сброшены
                // и сработает повторное срабатывание при следующем входе
            });
        };
        const observer = new IntersectionObserver(callback, options);
        observer.observe(el);
    },
    name: "intersection",
};
