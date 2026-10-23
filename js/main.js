const initHeroSwiper = () => {
    const heroElement = document.querySelector('.hero__swiper');
    const paginationButtons = [...document.querySelectorAll('.hero__pagination-button')];
    const navigationButtons = [
        document.querySelector('.hero__arrow--prev'),
        document.querySelector('.hero__arrow--next'),
    ].filter(Boolean);

    if (!heroElement || typeof Swiper === 'undefined') {
        return;
    }

    const heroSwiper = new Swiper(heroElement, {
        loop: true,
        speed: 700,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: '.hero__arrow--next',
            prevEl: '.hero__arrow--prev',
        },
        keyboard: {
            enabled: true,
        },
    });

    const updatePagination = () => {
        paginationButtons.forEach((button, index) => {
            const isActive = index === heroSwiper.realIndex;
            const indicator = button.querySelector('img');

            button.classList.toggle('hero__pagination-button--active', isActive);
            button.toggleAttribute('aria-current', isActive);

            if (indicator) {
                indicator.src = isActive
                    ? 'images/hero-indicator-active.svg'
                    : 'images/hero-indicator.svg';
            }
        });
    };

    const restartAutoplay = () => {
        heroSwiper.autoplay.stop();
        heroSwiper.autoplay.start();
    };

    paginationButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            heroSwiper.slideToLoop(index);
            restartAutoplay();
        });
    });

    navigationButtons.forEach((button) => {
        button.addEventListener('click', restartAutoplay);
    });

    heroSwiper.on('slideChange', updatePagination);
    updatePagination();
};

const initTopButton = () => {
    const topButton = document.querySelector('.button-top');
    const hero = document.querySelector('#hero');
    const footer = document.querySelector('#footer');

    if (!topButton || !hero || !footer) {
        return;
    }

    const updateTopButton = () => {
        const buttonRect = topButton.getBoundingClientRect();
        const buttonCenter = buttonRect.top + buttonRect.height / 2;
        const heroRect = hero.getBoundingClientRect();
        const footerRect = footer.getBoundingClientRect();
        const isHero = heroRect.bottom > 0 && heroRect.top < window.innerHeight;
        const isFooter = buttonCenter >= footerRect.top && buttonCenter <= footerRect.bottom;

        topButton.classList.toggle('is-visible', !isHero);
        topButton.classList.toggle('is-footer', isFooter);
    };

    const moveToTop = (event) => {
        event.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    topButton.addEventListener('click', moveToTop);
    window.addEventListener('scroll', updateTopButton, { passive: true });
    window.addEventListener('resize', updateTopButton);
    updateTopButton();
};

const initLanguagePicker = () => {
    const picker = document.querySelector('.nav__language-picker');

    if (!picker) {
        return;
    }

    const toggleButton = picker.querySelector('.nav__language');
    const options = [...picker.querySelectorAll('.nav__language-option')];

    if (!toggleButton) {
        return;
    }

    const setOpen = (isOpen) => {
        picker.classList.toggle('is-open', isOpen);
        toggleButton.setAttribute('aria-expanded', String(isOpen));
    };

    toggleButton.addEventListener('click', () => {
        setOpen(!picker.classList.contains('is-open'));
    });

    options.forEach((option) => {
        option.addEventListener('click', () => {
            options.forEach((item) => {
                const isActive = item === option;

                item.classList.toggle('is-active', isActive);
                item.toggleAttribute('aria-current', isActive);
            });
            setOpen(false);
        });
    });

    document.addEventListener('click', (event) => {
        if (!picker.contains(event.target)) {
            setOpen(false);
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            setOpen(false);
            toggleButton.focus();
        }
    });
};

const initTopMenu = () => {
    const items = [...document.querySelectorAll('.top-menu__item')];

    if (!items.length) {
        return;
    }

    const updateIcon = (item) => {
        const icon = item.querySelector('.top-menu__icon img');
        const highlighted = item.classList.contains('top-menu__item--active') ||
            item.classList.contains('is-preview');
        if (icon) {
            icon.src = highlighted ? icon.dataset.activeSrc : icon.dataset.inactiveSrc;
        }
    };

    const setActiveItem = (activeItem) => {
        items.forEach((item) => {
            const link = item.querySelector('.top-menu__link');
            const isActive = item === activeItem;

            item.classList.toggle('top-menu__item--active', isActive);

            if (link) {
                if (isActive) {
                    link.setAttribute('aria-current', 'page');
                } else {
                    link.removeAttribute('aria-current');
                }
            }

            updateIcon(item);
        });
    };

    items.forEach((item) => {
        const link = item.querySelector('.top-menu__link');
        let hovered = false;
        const updatePreview = () => {
            item.classList.toggle('is-preview', hovered || Boolean(link?.matches(':focus-visible')));
            updateIcon(item);
        };

        link?.addEventListener('mouseenter', () => {
            hovered = true;
            updatePreview();
        });
        link?.addEventListener('mouseleave', () => {
            hovered = false;
            updatePreview();
        });
        link?.addEventListener('focus', updatePreview);
        link?.addEventListener('blur', updatePreview);

        link?.addEventListener('click', (event) => {
            event.preventDefault();
            setActiveItem(item);
        });
    });
};

const initReviewLoops = () => {
    const lists = [...document.querySelectorAll('.con3__column .con3__list')];

    if (!lists.length) {
        return;
    }

    lists.forEach((list) => {
        const originalCards = [...list.children];

        originalCards.forEach((card) => {
            const clone = card.cloneNode(true);

            clone.setAttribute('aria-hidden', 'true');
            clone.querySelectorAll('a, button').forEach((element) => {
                element.setAttribute('tabindex', '-1');
            });
            list.append(clone);
        });
    });

    const updateLoopMetrics = () => {
        lists.forEach((list) => {
            const cards = [...list.children];
            const originalCount = cards.length / 2;
            const firstOriginal = cards[0];
            const firstClone = cards[originalCount];

            if (!firstOriginal || !firstClone) {
                return;
            }

            const distance = firstClone.offsetTop - firstOriginal.offsetTop;
            const duration = distance / 28;

            list.style.setProperty('--con3-loop-distance', `${distance}px`);
            list.style.setProperty('--con3-loop-duration', `${duration}s`);
            list.classList.add('is-loop-ready');
        });
    };

    window.addEventListener('resize', updateLoopMetrics);
    updateLoopMetrics();
};

const initBicycleMarquee = () => {
    const banner = document.querySelector('.text-container_top .inner');
    if (!banner || banner.querySelector('.con1__marquee-track')) return;

    const track = document.createElement('div');
    track.className = 'con1__marquee-track';
    const group = document.createElement('div');
    group.className = 'con1__marquee-group';
    group.append(...banner.childNodes);
    track.append(group);

    // Repeat the whole composition so the loop also stays filled on wide screens.
    [-1, 1, 2].forEach((position) => {
        const copy = group.cloneNode(true);
        copy.setAttribute('aria-hidden', 'true');
        copy.inert = true;
        copy.style.left = `${position * 2048}px`;
        track.append(copy);
    });
    banner.append(track);
};

(() => {
    initBicycleMarquee();
    initHeroSwiper();
    initTopButton();
    initLanguagePicker();
    initTopMenu();
    initReviewLoops();
})();
