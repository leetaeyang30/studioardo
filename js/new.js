const popups = document.querySelectorAll('.popup');

if (popups) {
  const Keys = {
    ESCAPE: 'Escape',
    ESC: 'Esc',
  };

  const isEscEvent = (evt) => {
    return evt.key === Keys.ESCAPE || evt.key === Keys.ESC;
  };

  let bodyWidth = document.body.clientWidth;
  let currentPopup;

  const openPopup = (popup) => {
    bodyWidth = document.body.clientWidth;

    popup.classList.add('popup--open');
    currentPopup = popup;
    document.body.classList.add('no-scroll');
    document.addEventListener('keydown', onPopupEscKeydown);

    if (document.body.clientWidth > bodyWidth) {
      document.body.style.paddingRight = document.body.clientWidth - bodyWidth + 'px';
    }
  };

  const closePopup = (popup) => {
    popup.classList.remove('popup--open');
    currentPopup = null;
    document.body.classList.remove('no-scroll');
    document.removeEventListener('keydown', onPopupEscKeydown);

    document.body.style.paddingRight = '0';
  };

  const onPopupEscKeydown = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      closePopup(currentPopup);
    }
  };

  const popupRequestOpenButton = document.querySelector('.button--popup--request');
  const popupRequest = document.querySelector('.popup--request');

  if (popupRequestOpenButton && popupRequest) {
    popupRequestOpenButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      openPopup(popupRequest);
    });
  }

  const popupReportCompetitorOpenButton = document.querySelector('.button--popup--report-competitor');
  const popupReportCompetitor = document.querySelector('.popup--report-competitor');

  if (popupReportCompetitorOpenButton && popupReportCompetitor) {
    popupReportCompetitorOpenButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      openPopup(popupReportCompetitor);
    });
  }

  const popupOrderSampleOpenButton = document.querySelector('.button--popup--order-sample');
  const popupOrderSample = document.querySelector('.popup--order-sample');

  if (popupOrderSampleOpenButton && popupOrderSample) {
    popupOrderSampleOpenButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      openPopup(popupOrderSample);
    });
  }

  const popupQuickOrderOpenButton = document.querySelector('.button--popup--quick-order');
  const pupuQuickpOrder = document.querySelector('.popup--quick-order');

  if (popupQuickOrderOpenButton && pupuQuickpOrder) {
    popupQuickOrderOpenButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      openPopup(pupuQuickpOrder);
    });
  }

  const materialsSection = document.querySelector('.materials');
  const popupCalculationMaterial = document.querySelector('.popup--calculation-material');

  if (materialsSection && popupCalculationMaterial) {
    materialsSection.addEventListener('click', (evt) => {
      evt.preventDefault();
      const materialLink = evt.target.closest('.material__link');

      if (!materialLink) {
        return;
      }
      openPopup(popupCalculationMaterial);

    });
  }

  const popupGood = document.querySelector('.popup--good');

  if (popupGood) {
    openPopup(popupGood);
  }

  popups.forEach((popup) => {
    const popupCloseButton = popup.querySelector('.popup__close')
    popupCloseButton.addEventListener('click', closePopup.bind(null, popup));
  });
}

const likeButtons = document.querySelectorAll('.like');

if (likeButtons) {
  likeButtons.forEach((likeButton) => {
    likeButton.addEventListener('click', () => {
      likeButton.classList.toggle('like--active');
    });
  });
}

const clipboxes = document.querySelectorAll('.clipbox');

if (clipboxes) {
  let windowWidth = window.innerWidth;

  const setClipboxMode = (clipbox) => {
    const content = clipbox.querySelector('.clipbox__content');

    if (clipbox.classList.contains('clipbox--expanded')) {
      if (content.offsetHeight <= parseInt(getComputedStyle(clipbox).getPropertyValue('--max-height'), 10)) {
        clipbox.classList.remove('clipbox--expanded');
      }
    } else if (clipbox.classList.contains('clipbox--reduced')) {
      clipbox.classList.remove('clipbox--reduced');
      if (content.offsetHeight > parseInt(getComputedStyle(clipbox).getPropertyValue('--max-height'), 10)) {
        clipbox.classList.add('clipbox--reduced');
      }
    } else {
      if (content.offsetHeight > parseInt(getComputedStyle(clipbox).getPropertyValue('--max-height'), 10)) {
        clipbox.classList.add('clipbox--reduced');
      }
    }
  };

  clipboxes.forEach((clipbox) => {
    clipbox.querySelector('.clipbox__toggler').addEventListener('click', () => {
      clipbox.classList.toggle('clipbox--reduced');
      clipbox.classList.toggle('clipbox--expanded');
    });

    setClipboxMode(clipbox);
  });

  window.addEventListener('resize', () => {
    if (windowWidth === window.innerWidth) {
      return;
    }

    windowWidth = window.innerWidth;

    clipboxes.forEach((clipbox) => {
      setClipboxMode(clipbox);
    });
  });
}

const worksGallerySlider = document.querySelector('.works-gallery__slider');

if (worksGallerySlider) {
  let swiper = new Swiper(".works-gallery__slider", {
    slidesPerView: 'auto',
    spaceBetween: 5,
    freeMode: true,
    navigation: {
      nextEl: ".works-gallery__slider .swiper-button-next",
      prevEl: ".works-gallery__slider .swiper-button-prev",
    },
    breakpoints: {
      768: {
        spaceBetween: 19,
      },
      1510: {
        spaceBetween: 10,
      },
    },
  });
}

const goodInfoTaber = document.querySelector('.good-info__taber');

if (goodInfoTaber) {
  const swiper = new Swiper(".good-info__tab-buttons-wrapper", {
    slidesPerView: 'auto',
    freeMode: true
  });

  const tabLinks = goodInfoTaber.querySelectorAll('.good-info__tab-buttons-link');
  const tabs = goodInfoTaber.querySelectorAll('.good-info__tabs-item');

  let currentTabLink = tabLinks[0];
  let currentTab = tabs[0];

  for (let i = 0; i < tabLinks.length; i++) {
    tabLinks[i].addEventListener('click', (evt) => {
      evt.preventDefault();

      currentTab.classList.remove('good-info__tabs-item--current');
      currentTab = tabs[i];
      currentTab.classList.add('good-info__tabs-item--current');

      currentTabLink.parentNode.classList.remove('good-info__tab-buttons-item--current');
      currentTabLink = tabLinks[i];
      currentTabLink.parentNode.classList.add('good-info__tab-buttons-item--current');
    });
  }
}

const goodReviews = document.querySelector('.good-reviews');

if (goodReviews) {
  const reviewForm = goodReviews.querySelector('.good-reviews__form');
  const reviewFormShowButtonWrapper = goodReviews.querySelector('.good-reviews__button-wrapper');
  const reviewFormShowButton = goodReviews.querySelector('.good-reviews__button');
  const reviewFormHideButton = goodReviews.querySelector('.good-reviews__cancel');

  if (reviewFormShowButtonWrapper && reviewFormShowButton) {
    reviewFormShowButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      reviewForm.classList.remove('good-reviews__form--hidden');
      reviewFormShowButtonWrapper.classList.add('good-reviews__button-wrapper--hidden');
    });
  }

  if (reviewForm && reviewFormHideButton) {
    reviewFormHideButton.addEventListener('click', () => {
      reviewForm.classList.add('good-reviews__form--hidden');
      reviewFormShowButtonWrapper.classList.remove('good-reviews__button-wrapper--hidden');
    });
  }
}

const radioselects = document.querySelectorAll('.select-2');

if (radioselects) {
  radioselects.forEach((radioselect) => {
    const radioselectButton = radioselect.querySelector('.select-2__button');
    const radiobutton = radioselect.querySelector('.select-2__radiobutton');

    const checkClickOut = (evt) => {
      if (!evt.target.closest('.select-2')) {
        closeRadioSelect();
      }
    };

    const openRadioSelect = () => {
      radioselect.classList.add('select-2--open');
      radiobutton.focus();
      window.addEventListener('click', checkClickOut);
    };

    const closeRadioSelect = () => {
      radioselect.classList.remove('select-2--open');
      window.removeEventListener('click', checkClickOut);
    };

    radioselectButton.addEventListener('click', () => {
      if (!radioselect.classList.contains('select-2--open')) {
        openRadioSelect();
      } else {
        closeRadioSelect();
      }
    });

    const radioselectOptionsWrapper = radioselect.querySelector('.select-2__options');

    const radioselectButtonValue = radioselectButton.querySelector('.select-2__button-value');

    radioselectOptionsWrapper.addEventListener('click', (evt) => {
      if (evt.target.className === 'select-2__radiobutton-label') {
        closeRadioSelect();
      }
    });

    const radiobuttons = radioselect.querySelectorAll('.select-2__radiobutton');

    radiobuttons.forEach((radiobutton) => {
      radiobutton.addEventListener('change', () => {
        radioselectButtonValue.textContent = radiobutton.parentNode.querySelector('.select-2__radiobutton-label').textContent;
      });
    });
  });
}

const goodQuantityAlterNodes = document.querySelectorAll('.goods-quantity--alter, .goods-quantity--alter-2');

if (goodQuantityAlterNodes) {
  goodQuantityAlterNodes.forEach((goodQuantity) => {
    const toggler = goodQuantity.querySelector('.goods-quantity__select-button');
    const radiobuttonsWrapper = goodQuantity.querySelector('.goods-quantity__radiobuttons');
    const radiobutton = radiobuttonsWrapper.querySelector('.radiobutton__control');

    const checkClickOut = (evt) => {
      if (!evt.target.closest('.goods-quantity__radiobuttons')) {
        hideButtons();
      }
    };

    const showButtons = () => {
      radiobuttonsWrapper.classList.add('goods-quantity__radiobuttons--open');
      radiobutton.focus();
      window.addEventListener('click', checkClickOut);
    };

    const hideButtons = () => {
      radiobuttonsWrapper.classList.remove('goods-quantity__radiobuttons--open');
      window.removeEventListener('click', checkClickOut);
    };

    toggler.addEventListener('click', () => {
      if (!radiobuttonsWrapper.classList.contains('goods-quantity__radiobuttons--open')) {
        showButtons();
      } else {
        hideButtons();
      }
    });

    radiobuttonsWrapper.addEventListener('click', (evt) => {
      if (evt.target.className === 'radiobutton__label') {
        hideButtons();
      }
    });

    const radiobuttons = radiobuttonsWrapper.querySelectorAll('.radiobutton__control');

    radiobuttons.forEach((radiobutton) => {
      radiobutton.addEventListener('change', () => {
        toggler.textContent = radiobutton.parentNode.querySelector('.radiobutton__label').textContent.slice(0, 2);
      });
    });
  });
}

const coverCardWrappers = document.querySelectorAll('.s-popular .container');

if (coverCardWrappers) {
  coverCardWrappers.forEach((cardWrapper) => {
    const cards = cardWrapper.querySelectorAll('.card');

    cards.forEach((card) => {
      card.addEventListener('mouseover', () => {
        cardWrapper.style.zIndex = 200;
      });

      card.addEventListener('mouseout', () => {
        cardWrapper.style.zIndex = 'auto';
      });
    });
  });
}

const goodsFilter = document.querySelector('.c-filter');

if (goodsFilter) {
  const WAITING_LIST_DELAY_TIME = 50;

  const checkFallingOut = (block) => {
    return (block.getBoundingClientRect().right - goodsFilter.getBoundingClientRect().right > 0);
  };

  const moveLeft = (block) => {
    block.style.left = 'auto';
  };

  const resetShift = (block) => {
    block.style.left = 0;
  }

  const selectElements = goodsFilter.querySelectorAll('.form-select');

  selectElements.forEach((select) => {
    const button = select.querySelector('.form-select__input');
    const list = select.querySelector('.form-select__list');

    button.addEventListener('click', () => {
      if (!button.classList.contains('open')) {
        setTimeout(() => {
          if (checkFallingOut(list)) {
            moveLeft(list);
          }
        }, WAITING_LIST_DELAY_TIME);
      } else {
        resetShift(list);
      }
    });
  });
}

const smallCustomForms = document.querySelectorAll('.custom-form--compact');

if (smallCustomForms) {
  smallCustomForms.forEach((form) => {
    const submitButton = form.querySelector('.form__button--submit');
    submitButton.style.display = 'none';

    const input = form.querySelector('.form__textfield-control');

    input.addEventListener('input', () => {
      if (input.value) {
        submitButton.style.display = 'grid';
      } else {
        submitButton.style.display = 'none';
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  if (window.location.hash === '#js-modal-message') {
    $('#js-modal-message').fadeIn(500), $("body").append('<div class="overlay" id="js-overlay"></div>');
    $("body").addClass("opened-modal");
  }
});

const fileUploadControl = document.querySelector('.form__file-field-control');

if (fileUploadControl) {
  fileUploadControl.addEventListener('change', () => {
    fileUploadControl.classList.toggle('form__file-field-control--shown', fileUploadControl.files[0]);
  });
}

const customForm2Elements = document.querySelectorAll('.custom-form-2');

if (customForm2Elements) {
  const toggleAccordionView = (evt) => {
    const accordionButton = evt.target.closest('.form__section-heading-button');

    if (!accordionButton) {
      return;
    }

    const accordion = accordionButton.closest('.form__section');
    accordion.classList.toggle('form__section--open');
  };

  customForm2Elements.forEach((form) => {
    form.addEventListener('click', toggleAccordionView);
  });
}

const promocodeElement = document.querySelector('.custom-form-2--order .form__promocode');
const promocodeCancelButton = document.querySelector('.promocode__cancel-button');
const promocodeInput = document.querySelector('.form__textfield-control');
const promocodeShowButton1 = document.querySelector('.custom-form-2--order .form__footer-promo-button');
const promocodeShowButton2 = document.querySelector('.custom-form-2--order .form__promocode-button');

if (promocodeElement && promocodeShowButton1 && promocodeShowButton2) {
  promocodeShowButton1.addEventListener('click', (evt) => {
    evt.preventDefault();
    promocodeShowButton1.classList.add('form__footer-promo-button--hidden');
    promocodeShowButton2.classList.add('form__promocode-button--hidden');
    promocodeElement.classList.add('form__promocode--show');
    promocodeInput.focus();
  });
}

if (promocodeElement && promocodeShowButton1 && promocodeShowButton2) {
  promocodeShowButton2.addEventListener('click', (evt) => {
    evt.preventDefault();
    promocodeShowButton1.classList.add('form__footer-promo-button--hidden');
    promocodeShowButton2.classList.add('form__promocode-button--hidden');
    promocodeElement.classList.add('form__promocode--show');
    promocodeInput.focus();
  });
}

if (promocodeElement && promocodeCancelButton && promocodeShowButton1 && promocodeShowButton2) {
  promocodeCancelButton.addEventListener('click', () => {
    promocodeShowButton1.classList.remove('form__footer-promo-button--hidden');
    promocodeShowButton2.classList.remove('form__promocode-button--hidden');
    promocodeElement.classList.remove('form__promocode--show');
  });
}

const inspirationGallery = document.querySelector('.inspiration');

if (inspirationGallery) {
  let swiper = new Swiper(".artgallery-swiper", {
    slidesPerView: 'auto',
    spaceBetween: 5,
    navigation: {
      nextEl: ".inspiration__arrow--next",
      prevEl: ".inspiration__arrow--back",
    },
  })
};

const productsSection = document.querySelector('.products');

if (productsSection) {
  (function () {
    const breakpoint = window.matchMedia('(min-width: 1280px)');
    const productsSwiper = document.querySelector('.products-swiper');
    const productsList = document.querySelector('.products__list');
    const productSlides = document.querySelectorAll('.products__item');

    let productSwiper;
    const breakpointChecker = () => {

      if (breakpoint.matches === true) {

        if (productSwiper !== undefined) {
          productSwiper.destroy(true, true);
          productSwiper = undefined;
          productsSwiper.classList.remove('swiper');
          productsList.classList.remove('swiper-wrapper');
          productSlides.forEach((slide) => {
            slide.classList.remove('swiper-slide');
          });
        }

        return;
      } else if (breakpoint.matches === false && productSwiper === undefined) {

        return enableSwiper();

      }

    };

    const enableSwiper = () => {
      productsSwiper.classList.add('swiper');
      productsList.classList.add('swiper-wrapper');
      productSlides.forEach((slide) => {
        slide.classList.add('swiper-slide');
      });

      productSwiper = new Swiper('.products-swiper', {
        slidesPerView: 1,
        grid: {
          rows: 2,
        },
        spaceBetween: 8,
        navigation: {
          nextEl: ".products__arrow--next",
          prevEl: ".products__arrow--back",
        },
        breakpoints: {
          768: {
            slidesPerView: 'auto',
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 5,
          },
          1510: {
            spaceBetween: 10,
          }
        }
      });
    };

    window.addEventListener('resize', breakpointChecker);
    breakpointChecker();
  })();
}

const projectsGallery = document.querySelector('.projects');
if (projectsGallery) {
  let swiper = new Swiper(".projects-swiper", {
    slidesPerView: 'auto',
    spaceBetween: 5,
    navigation: {
      nextEl: ".projects__arrow--next",
      prevEl: ".projects__arrow--back",
    },
  })
};

const serviceSwiper = document.querySelector('.n-service');
if (serviceSwiper) {
  let swiper = new Swiper(".n-service-swiper", {
    slidesPerView: 'auto',
    watchOverflow: true,
    spaceBetween: 5,
    breakpoints: {
      768: {
        slidesPerView: 3,
        spaceBetween: 7,
      },
      1510: {
        spaceBetween: 20,
      },
    }
  })
};

const tileSwiper = document.querySelector('.tile-range');
if (tileSwiper) {
  let swiper = new Swiper('.tile-range-swiper', {
    slidesPerView: 'auto',
    grid: {
      rows: 2,
    },
    spaceBetween: 8,
    navigation: {
      nextEl: ".tile-range__arrow--next",
      prevEl: ".tile-range__arrow--back",
    },
    breakpoints: {
      768: {
        spaceBetween: 10,
      },
      1280: {
        slidesPerView: 4,
        spaceBetween: 8,
      },
    },
  });
};

const linksElements = document.querySelectorAll('.links');

if (linksElements) {
  linksElements.forEach((links) => {
    links.addEventListener('click', (evt) => {
      const button = evt.target.closest('.links__toggle');

      if (!button) {
        return;
      }

      links.classList.toggle('links--open');
    })
  });
}

const orderForm = document.querySelector('.custom-form-2--order');

if (orderForm) {
  const formSectionBodyAddress = orderForm.querySelector('.form__section-body--address');

  if (formSectionBodyAddress) {
    orderForm.addEventListener('change', (evt) => {
      const deliverySelfCheckbox = evt.target.closest('.form__checkbox-control');
      if (!deliverySelfCheckbox) {
        return;
      }
      formSectionBodyAddress.classList.toggle('form__section-body--address--stock', deliverySelfCheckbox.checked);
    });
  }
}

const anchor = document.querySelector('.n-banner__video-link');

const elementClickHandler = (evt) => {
  const element = evt.target.closest('a');
  if (!element) {
    return;
  }
  evt.preventDefault();
  const blockId = element.getAttribute('href');

  if (blockId && blockId !== '#' && blockId !== '#!') {
    const block = document.querySelector(blockId);

    if (block) {
      block.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }
};

if (anchor) {
  anchor.addEventListener('click', elementClickHandler);
}

const nProductsItemSlider = document.querySelector('.n-products__item-slider');

if (nProductsItemSlider) {
  var swiper = new Swiper('.n-products__item-slider', {
    cssMode: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    mousewheel: true,
    keyboard: true,
  });
}

const materialsSwiper = document.querySelector('.materials__slider.swiper');

if (materialsSwiper) {
  var swiper = new Swiper('.materials__slider', {
    slidesPerView: 'auto',
    spaceBetween: 10,
    cssMode: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    mousewheel: true,
    keyboard: true,
    breakpoints: {
      768: {
        spaceBetween: 15,
      },
      1280: {
        slidesPerView: 4,
        spaceBetween: 25
      },
    },
  });
}


const materialSwiper = document.querySelector('.material__slider.swiper');

if (materialSwiper) {
  var swiper = new Swiper('.material__slider', {
    slidesPerView: 1,
    cssMode: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    mousewheel: true,
    keyboard: true,
  });
}

const materialsSwiperAlter = document.querySelector('.materials__slider--alter.swiper');

if (materialsSwiperAlter) {
  var swiper = new Swiper('.materials__slider--alter', {
    slidesPerView: 'auto',
    spaceBetween: 11,
    cssMode: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    mousewheel: true,
    keyboard: true,
    breakpoints: {
      1280: {
        slidesPerView: 6,
      },
      1510: {
        slidesPerView: 7,
      },
    },
  });
}

const initSelects = (parentNode) => {
  const selectElements = parentNode.querySelectorAll('.n-select select');
  if (!selectElements) {
    return;
  }
  selectElements.forEach((select) => {
    const choices = new Choices(select, {
      searchEnabled: false,
    });
  })
};

initSelects(document);


const brandsSection = document.querySelector('.n-brands');

if (brandsSection) {
  (function () {
    const breakpoint = window.matchMedia('(min-width: 768px)');
    const brandsSwiper = document.querySelector('.brands-swiper');
    const brandsList = document.querySelector('.n-brands__list');
    const brandsSlides = document.querySelectorAll('.n-brands__item');

    let brandSwiper;
    const breakpointChecker = () => {

      if (breakpoint.matches === false) {

        if (brandSwiper !== undefined) {
          brandSwiper.destroy(true, true);
          brandSwiper = undefined;
          brandsSwiper.classList.remove('swiper');
          brandsList.classList.remove('swiper-wrapper');
          brandsSlides.forEach((slide) => {
            slide.classList.remove('swiper-slide');
          });
        }
        return;

      } else if (breakpoint.matches === true && brandSwiper === undefined) {
        return enableSwiper();

      }
    };

    const enableSwiper = () => {
      brandsSwiper.classList.add('swiper');
      brandsList.classList.add('swiper-wrapper');
      brandsSlides.forEach((slide) => {
        slide.classList.add('swiper-slide');
      });

      brandSwiper = new Swiper('.brands-swiper', {
        slidesPerView: 'auto',
        spaceBetween: 5,
        navigation: {
          nextEl: ".n-brands__arrow--next",
          prevEl: ".n-brands__arrow--back",
        },
      });
    };

    window.addEventListener('resize', breakpointChecker);
    breakpointChecker();
  })();
}

const newsSection = document.querySelector('.n-news');
if (newsSection) {
  let swiper = new Swiper('.news-swiper', {
    slidesPerView: 'auto',
    spaceBetween: 5,
    navigation: {
      nextEl: ".n-news__arrow--next",
      prevEl: ".n-news__arrow--back",
    },
  });
};

const currentOffersSection = document.querySelector('.current-offers');
if (currentOffersSection) {
  const tabSwiper = new Swiper('.offers-tabs-swiper', {
    slidesPerView: 1,
    spaceBetween: 0,
    pagination: {
      el: '.current-offers__dots',
      bulletActiveClass: 'current-offers__dot--current',
      bulletClass: 'current-offers__dot',
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 3,
        slidesPerGroup: 3,
      },
      1280: {
        slidesPerView: 6,
        slidesPerGroup: 1,
      },
    },
  });

  const swiper = new Swiper('.current-offers__slider', {
    slidesPerView: 1,
    spaceBetween: 0,
    navigation: {
      nextEl: ".current-offers__arrow--next",
      prevEl: ".current-offers__arrow--back",
    },
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    thumbs: {
      swiper: tabSwiper,
    },
    autoplay: {
      delay: 12000,
    },
  });
};

const offersSection = document.querySelector('.offers');
if (offersSection) {
  const tabs = new Swiper('.offers .tabs__slider', {
    slidesPerView: 1,
    spaceBetween: 0,
    pagination: {
      el: '.offers__tabs-pagination',
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 3,
        slidesPerGroup: 3,
      },
      1280: {
        slidesPerView: 6,
        slidesPerGroup: 1,
      },
    },
  });

  const slides = new Swiper('.offers__slider', {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    navigation: {
      nextEl: ".offers__button-next",
      prevEl: ".offers__button-prev",
    },
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    thumbs: {
      swiper: tabs,
    },
  });
};

const goodsSlider1 = document.querySelector('.goods--swiper--1 .goods__slider');
if (goodsSlider1) {
  const swiper = new Swiper(".goods--swiper--1 .goods__slider", {
    slidesPerView: 1,
    spaceBetween: 9,
    navigation: {
      nextEl: ".goods--swiper--1 .goods__slider-button-next",
      prevEl: ".goods--swiper--1 .goods__slider-button-prev",
    },
    breakpoints: {
      420: {
        slidesPerView: 'auto',
      },
      1280: {
        slidesPerView: 4,
      },
    },
    watchSlidesProgress: true
  });
}

const goodsSlider2 = document.querySelector('.goods--swiper--2 .goods__slider');
if (goodsSlider1) {
  const swiper = new Swiper(".goods--swiper--2 .goods__slider", {
    slidesPerView: 1,
    spaceBetween: 9,
    navigation: {
      nextEl: ".goods--swiper--2 .goods__slider-button-next",
      prevEl: ".goods--swiper--2 .goods__slider-button-prev",
    },
    breakpoints: {
      420: {
        slidesPerView: 'auto',
      },
      1280: {
        slidesPerView: 4,
      },
    },
    watchSlidesProgress: true
  });
}

const popularGoodsSection = document.querySelector('.goods--popular');

if (popularGoodsSection) {

  (function () {

    const breakpoint = window.matchMedia('(min-width: 1280px)');
    const popGoodsSwiper = document.querySelector('.goods--popular .goods__slider');
    const popGoodsList = document.querySelector('.goods--popular .goods__list');
    const popGoodsSlides = document.querySelectorAll('.goods--popular .good-list__item');

    let popGoodSwiper;
    const breakpointChecker = () => {
      if (breakpoint.matches === true) {

        if (popGoodSwiper !== undefined) {
          popGoodSwiper.destroy(true, true);
          popGoodSwiper = undefined;
          popularGoodsSection.classList.remove('goods--swiper');
          popGoodsSwiper.classList.remove('swiper');
          popGoodsList.classList.remove('swiper-wrapper');
          popGoodsSlides.forEach((slide) => {
            slide.classList.remove('swiper-slide');
          });
        }

        return;

      } else if (breakpoint.matches === false && popGoodSwiper === undefined) {
        return enableSwiper();
      }
    };

    const enableSwiper = () => {
      popularGoodsSection.classList.add('goods--swiper');
      popGoodsSwiper.classList.add('swiper');
      popGoodsList.classList.add('swiper-wrapper');
      popGoodsSlides.forEach((slide) => {
        slide.classList.add('swiper-slide');
      });

      popGoodSwiper = new Swiper(".goods--popular .goods__slider", {
        slidesPerView: 1,
        spaceBetween: 9,
        allowTouchMove: true,
        navigation: {
          nextEl: ".goods--popular .goods__slider-button-next",
          prevEl: ".goods--popular .goods__slider-button-prev",
        },
        breakpoints: {
          420: {
            slidesPerView: 'auto',
          },
          1280: {
            allowTouchMove: false,
            slidesPerView: 4,
          },
        },
        watchSlidesProgress: true
      });
    };

    window.addEventListener('resize', breakpointChecker);
    breakpointChecker();
  })();
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJuZXcuanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgcG9wdXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBvcHVwJyk7XG5cbmlmIChwb3B1cHMpIHtcbiAgY29uc3QgS2V5cyA9IHtcbiAgICBFU0NBUEU6ICdFc2NhcGUnLFxuICAgIEVTQzogJ0VzYycsXG4gIH07XG5cbiAgY29uc3QgaXNFc2NFdmVudCA9IChldnQpID0+IHtcbiAgICByZXR1cm4gZXZ0LmtleSA9PT0gS2V5cy5FU0NBUEUgfHwgZXZ0LmtleSA9PT0gS2V5cy5FU0M7XG4gIH07XG5cbiAgbGV0IGJvZHlXaWR0aCA9IGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGg7XG4gIGxldCBjdXJyZW50UG9wdXA7XG5cbiAgY29uc3Qgb3BlblBvcHVwID0gKHBvcHVwKSA9PiB7XG4gICAgYm9keVdpZHRoID0gZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aDtcblxuICAgIHBvcHVwLmNsYXNzTGlzdC5hZGQoJ3BvcHVwLS1vcGVuJyk7XG4gICAgY3VycmVudFBvcHVwID0gcG9wdXA7XG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCduby1zY3JvbGwnKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgb25Qb3B1cEVzY0tleWRvd24pO1xuXG4gICAgaWYgKGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGggPiBib2R5V2lkdGgpIHtcbiAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUucGFkZGluZ1JpZ2h0ID0gZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aCAtIGJvZHlXaWR0aCArICdweCc7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGNsb3NlUG9wdXAgPSAocG9wdXApID0+IHtcbiAgICBwb3B1cC5jbGFzc0xpc3QucmVtb3ZlKCdwb3B1cC0tb3BlbicpO1xuICAgIGN1cnJlbnRQb3B1cCA9IG51bGw7XG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCduby1zY3JvbGwnKTtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgb25Qb3B1cEVzY0tleWRvd24pO1xuXG4gICAgZG9jdW1lbnQuYm9keS5zdHlsZS5wYWRkaW5nUmlnaHQgPSAnMCc7XG4gIH07XG5cbiAgY29uc3Qgb25Qb3B1cEVzY0tleWRvd24gPSAoZXZ0KSA9PiB7XG4gICAgaWYgKGlzRXNjRXZlbnQoZXZ0KSkge1xuICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBjbG9zZVBvcHVwKGN1cnJlbnRQb3B1cCk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHBvcHVwUmVxdWVzdE9wZW5CdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnV0dG9uLS1wb3B1cC0tcmVxdWVzdCcpO1xuICBjb25zdCBwb3B1cFJlcXVlc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXAtLXJlcXVlc3QnKTtcblxuICBpZiAocG9wdXBSZXF1ZXN0T3BlbkJ1dHRvbiAmJiBwb3B1cFJlcXVlc3QpIHtcbiAgICBwb3B1cFJlcXVlc3RPcGVuQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2dCkgPT4ge1xuICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBvcGVuUG9wdXAocG9wdXBSZXF1ZXN0KTtcbiAgICB9KTtcbiAgfVxuXG4gIGNvbnN0IHBvcHVwUmVwb3J0Q29tcGV0aXRvck9wZW5CdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnV0dG9uLS1wb3B1cC0tcmVwb3J0LWNvbXBldGl0b3InKTtcbiAgY29uc3QgcG9wdXBSZXBvcnRDb21wZXRpdG9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwLS1yZXBvcnQtY29tcGV0aXRvcicpO1xuXG4gIGlmIChwb3B1cFJlcG9ydENvbXBldGl0b3JPcGVuQnV0dG9uICYmIHBvcHVwUmVwb3J0Q29tcGV0aXRvcikge1xuICAgIHBvcHVwUmVwb3J0Q29tcGV0aXRvck9wZW5CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZ0KSA9PiB7XG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIG9wZW5Qb3B1cChwb3B1cFJlcG9ydENvbXBldGl0b3IpO1xuICAgIH0pO1xuICB9XG5cbiAgY29uc3QgcG9wdXBPcmRlclNhbXBsZU9wZW5CdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnV0dG9uLS1wb3B1cC0tb3JkZXItc2FtcGxlJyk7XG4gIGNvbnN0IHBvcHVwT3JkZXJTYW1wbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXAtLW9yZGVyLXNhbXBsZScpO1xuXG4gIGlmIChwb3B1cE9yZGVyU2FtcGxlT3BlbkJ1dHRvbiAmJiBwb3B1cE9yZGVyU2FtcGxlKSB7XG4gICAgcG9wdXBPcmRlclNhbXBsZU9wZW5CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZ0KSA9PiB7XG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIG9wZW5Qb3B1cChwb3B1cE9yZGVyU2FtcGxlKTtcbiAgICB9KTtcbiAgfVxuXG4gIGNvbnN0IHBvcHVwUXVpY2tPcmRlck9wZW5CdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnV0dG9uLS1wb3B1cC0tcXVpY2stb3JkZXInKTtcbiAgY29uc3QgcHVwdVF1aWNrcE9yZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwLS1xdWljay1vcmRlcicpO1xuXG4gIGlmIChwb3B1cFF1aWNrT3JkZXJPcGVuQnV0dG9uICYmIHB1cHVRdWlja3BPcmRlcikge1xuICAgIHBvcHVwUXVpY2tPcmRlck9wZW5CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZ0KSA9PiB7XG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIG9wZW5Qb3B1cChwdXB1UXVpY2twT3JkZXIpO1xuICAgIH0pO1xuICB9XG5cbiAgY29uc3QgbWF0ZXJpYWxzU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYXRlcmlhbHMnKTtcbiAgY29uc3QgcG9wdXBDYWxjdWxhdGlvbk1hdGVyaWFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwLS1jYWxjdWxhdGlvbi1tYXRlcmlhbCcpO1xuXG4gIGlmIChtYXRlcmlhbHNTZWN0aW9uICYmIHBvcHVwQ2FsY3VsYXRpb25NYXRlcmlhbCkge1xuICAgIG1hdGVyaWFsc1NlY3Rpb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZ0KSA9PiB7XG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGNvbnN0IG1hdGVyaWFsTGluayA9IGV2dC50YXJnZXQuY2xvc2VzdCgnLm1hdGVyaWFsX19saW5rJyk7XG5cbiAgICAgIGlmICghbWF0ZXJpYWxMaW5rKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIG9wZW5Qb3B1cChwb3B1cENhbGN1bGF0aW9uTWF0ZXJpYWwpO1xuXG4gICAgfSk7XG4gIH1cblxuICBjb25zdCBwb3B1cEdvb2QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXAtLWdvb2QnKTtcblxuICBpZiAocG9wdXBHb29kKSB7XG4gICAgb3BlblBvcHVwKHBvcHVwR29vZCk7XG4gIH1cblxuICBwb3B1cHMuZm9yRWFjaCgocG9wdXApID0+IHtcbiAgICBjb25zdCBwb3B1cENsb3NlQnV0dG9uID0gcG9wdXAucXVlcnlTZWxlY3RvcignLnBvcHVwX19jbG9zZScpXG4gICAgcG9wdXBDbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlUG9wdXAuYmluZChudWxsLCBwb3B1cCkpO1xuICB9KTtcbn1cblxuY29uc3QgbGlrZUJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubGlrZScpO1xuXG5pZiAobGlrZUJ1dHRvbnMpIHtcbiAgbGlrZUJ1dHRvbnMuZm9yRWFjaCgobGlrZUJ1dHRvbikgPT4ge1xuICAgIGxpa2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBsaWtlQnV0dG9uLmNsYXNzTGlzdC50b2dnbGUoJ2xpa2UtLWFjdGl2ZScpO1xuICAgIH0pO1xuICB9KTtcbn1cblxuY29uc3QgY2xpcGJveGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNsaXBib3gnKTtcblxuaWYgKGNsaXBib3hlcykge1xuICBsZXQgd2luZG93V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcblxuICBjb25zdCBzZXRDbGlwYm94TW9kZSA9IChjbGlwYm94KSA9PiB7XG4gICAgY29uc3QgY29udGVudCA9IGNsaXBib3gucXVlcnlTZWxlY3RvcignLmNsaXBib3hfX2NvbnRlbnQnKTtcblxuICAgIGlmIChjbGlwYm94LmNsYXNzTGlzdC5jb250YWlucygnY2xpcGJveC0tZXhwYW5kZWQnKSkge1xuICAgICAgaWYgKGNvbnRlbnQub2Zmc2V0SGVpZ2h0IDw9IHBhcnNlSW50KGdldENvbXB1dGVkU3R5bGUoY2xpcGJveCkuZ2V0UHJvcGVydHlWYWx1ZSgnLS1tYXgtaGVpZ2h0JyksIDEwKSkge1xuICAgICAgICBjbGlwYm94LmNsYXNzTGlzdC5yZW1vdmUoJ2NsaXBib3gtLWV4cGFuZGVkJyk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChjbGlwYm94LmNsYXNzTGlzdC5jb250YWlucygnY2xpcGJveC0tcmVkdWNlZCcpKSB7XG4gICAgICBjbGlwYm94LmNsYXNzTGlzdC5yZW1vdmUoJ2NsaXBib3gtLXJlZHVjZWQnKTtcbiAgICAgIGlmIChjb250ZW50Lm9mZnNldEhlaWdodCA+IHBhcnNlSW50KGdldENvbXB1dGVkU3R5bGUoY2xpcGJveCkuZ2V0UHJvcGVydHlWYWx1ZSgnLS1tYXgtaGVpZ2h0JyksIDEwKSkge1xuICAgICAgICBjbGlwYm94LmNsYXNzTGlzdC5hZGQoJ2NsaXBib3gtLXJlZHVjZWQnKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGNvbnRlbnQub2Zmc2V0SGVpZ2h0ID4gcGFyc2VJbnQoZ2V0Q29tcHV0ZWRTdHlsZShjbGlwYm94KS5nZXRQcm9wZXJ0eVZhbHVlKCctLW1heC1oZWlnaHQnKSwgMTApKSB7XG4gICAgICAgIGNsaXBib3guY2xhc3NMaXN0LmFkZCgnY2xpcGJveC0tcmVkdWNlZCcpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBjbGlwYm94ZXMuZm9yRWFjaCgoY2xpcGJveCkgPT4ge1xuICAgIGNsaXBib3gucXVlcnlTZWxlY3RvcignLmNsaXBib3hfX3RvZ2dsZXInKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGNsaXBib3guY2xhc3NMaXN0LnRvZ2dsZSgnY2xpcGJveC0tcmVkdWNlZCcpO1xuICAgICAgY2xpcGJveC5jbGFzc0xpc3QudG9nZ2xlKCdjbGlwYm94LS1leHBhbmRlZCcpO1xuICAgIH0pO1xuXG4gICAgc2V0Q2xpcGJveE1vZGUoY2xpcGJveCk7XG4gIH0pO1xuXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoKSA9PiB7XG4gICAgaWYgKHdpbmRvd1dpZHRoID09PSB3aW5kb3cuaW5uZXJXaWR0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHdpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG5cbiAgICBjbGlwYm94ZXMuZm9yRWFjaCgoY2xpcGJveCkgPT4ge1xuICAgICAgc2V0Q2xpcGJveE1vZGUoY2xpcGJveCk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG5jb25zdCB3b3Jrc0dhbGxlcnlTbGlkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud29ya3MtZ2FsbGVyeV9fc2xpZGVyJyk7XG5cbmlmICh3b3Jrc0dhbGxlcnlTbGlkZXIpIHtcbiAgbGV0IHN3aXBlciA9IG5ldyBTd2lwZXIoXCIud29ya3MtZ2FsbGVyeV9fc2xpZGVyXCIsIHtcbiAgICBzbGlkZXNQZXJWaWV3OiAnYXV0bycsXG4gICAgc3BhY2VCZXR3ZWVuOiA1LFxuICAgIGZyZWVNb2RlOiB0cnVlLFxuICAgIG5hdmlnYXRpb246IHtcbiAgICAgIG5leHRFbDogXCIud29ya3MtZ2FsbGVyeV9fc2xpZGVyIC5zd2lwZXItYnV0dG9uLW5leHRcIixcbiAgICAgIHByZXZFbDogXCIud29ya3MtZ2FsbGVyeV9fc2xpZGVyIC5zd2lwZXItYnV0dG9uLXByZXZcIixcbiAgICB9LFxuICAgIGJyZWFrcG9pbnRzOiB7XG4gICAgICA3Njg6IHtcbiAgICAgICAgc3BhY2VCZXR3ZWVuOiAxOSxcbiAgICAgIH0sXG4gICAgICAxNTEwOiB7XG4gICAgICAgIHNwYWNlQmV0d2VlbjogMTAsXG4gICAgICB9LFxuICAgIH0sXG4gIH0pO1xufVxuXG5jb25zdCBnb29kSW5mb1RhYmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdvb2QtaW5mb19fdGFiZXInKTtcblxuaWYgKGdvb2RJbmZvVGFiZXIpIHtcbiAgY29uc3Qgc3dpcGVyID0gbmV3IFN3aXBlcihcIi5nb29kLWluZm9fX3RhYi1idXR0b25zLXdyYXBwZXJcIiwge1xuICAgIHNsaWRlc1BlclZpZXc6ICdhdXRvJyxcbiAgICBmcmVlTW9kZTogdHJ1ZVxuICB9KTtcblxuICBjb25zdCB0YWJMaW5rcyA9IGdvb2RJbmZvVGFiZXIucXVlcnlTZWxlY3RvckFsbCgnLmdvb2QtaW5mb19fdGFiLWJ1dHRvbnMtbGluaycpO1xuICBjb25zdCB0YWJzID0gZ29vZEluZm9UYWJlci5xdWVyeVNlbGVjdG9yQWxsKCcuZ29vZC1pbmZvX190YWJzLWl0ZW0nKTtcblxuICBsZXQgY3VycmVudFRhYkxpbmsgPSB0YWJMaW5rc1swXTtcbiAgbGV0IGN1cnJlbnRUYWIgPSB0YWJzWzBdO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdGFiTGlua3MubGVuZ3RoOyBpKyspIHtcbiAgICB0YWJMaW5rc1tpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldnQpID0+IHtcbiAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICBjdXJyZW50VGFiLmNsYXNzTGlzdC5yZW1vdmUoJ2dvb2QtaW5mb19fdGFicy1pdGVtLS1jdXJyZW50Jyk7XG4gICAgICBjdXJyZW50VGFiID0gdGFic1tpXTtcbiAgICAgIGN1cnJlbnRUYWIuY2xhc3NMaXN0LmFkZCgnZ29vZC1pbmZvX190YWJzLWl0ZW0tLWN1cnJlbnQnKTtcblxuICAgICAgY3VycmVudFRhYkxpbmsucGFyZW50Tm9kZS5jbGFzc0xpc3QucmVtb3ZlKCdnb29kLWluZm9fX3RhYi1idXR0b25zLWl0ZW0tLWN1cnJlbnQnKTtcbiAgICAgIGN1cnJlbnRUYWJMaW5rID0gdGFiTGlua3NbaV07XG4gICAgICBjdXJyZW50VGFiTGluay5wYXJlbnROb2RlLmNsYXNzTGlzdC5hZGQoJ2dvb2QtaW5mb19fdGFiLWJ1dHRvbnMtaXRlbS0tY3VycmVudCcpO1xuICAgIH0pO1xuICB9XG59XG5cbmNvbnN0IGdvb2RSZXZpZXdzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdvb2QtcmV2aWV3cycpO1xuXG5pZiAoZ29vZFJldmlld3MpIHtcbiAgY29uc3QgcmV2aWV3Rm9ybSA9IGdvb2RSZXZpZXdzLnF1ZXJ5U2VsZWN0b3IoJy5nb29kLXJldmlld3NfX2Zvcm0nKTtcbiAgY29uc3QgcmV2aWV3Rm9ybVNob3dCdXR0b25XcmFwcGVyID0gZ29vZFJldmlld3MucXVlcnlTZWxlY3RvcignLmdvb2QtcmV2aWV3c19fYnV0dG9uLXdyYXBwZXInKTtcbiAgY29uc3QgcmV2aWV3Rm9ybVNob3dCdXR0b24gPSBnb29kUmV2aWV3cy5xdWVyeVNlbGVjdG9yKCcuZ29vZC1yZXZpZXdzX19idXR0b24nKTtcbiAgY29uc3QgcmV2aWV3Rm9ybUhpZGVCdXR0b24gPSBnb29kUmV2aWV3cy5xdWVyeVNlbGVjdG9yKCcuZ29vZC1yZXZpZXdzX19jYW5jZWwnKTtcblxuICBpZiAocmV2aWV3Rm9ybVNob3dCdXR0b25XcmFwcGVyICYmIHJldmlld0Zvcm1TaG93QnV0dG9uKSB7XG4gICAgcmV2aWV3Rm9ybVNob3dCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZ0KSA9PiB7XG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHJldmlld0Zvcm0uY2xhc3NMaXN0LnJlbW92ZSgnZ29vZC1yZXZpZXdzX19mb3JtLS1oaWRkZW4nKTtcbiAgICAgIHJldmlld0Zvcm1TaG93QnV0dG9uV3JhcHBlci5jbGFzc0xpc3QuYWRkKCdnb29kLXJldmlld3NfX2J1dHRvbi13cmFwcGVyLS1oaWRkZW4nKTtcbiAgICB9KTtcbiAgfVxuXG4gIGlmIChyZXZpZXdGb3JtICYmIHJldmlld0Zvcm1IaWRlQnV0dG9uKSB7XG4gICAgcmV2aWV3Rm9ybUhpZGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICByZXZpZXdGb3JtLmNsYXNzTGlzdC5hZGQoJ2dvb2QtcmV2aWV3c19fZm9ybS0taGlkZGVuJyk7XG4gICAgICByZXZpZXdGb3JtU2hvd0J1dHRvbldyYXBwZXIuY2xhc3NMaXN0LnJlbW92ZSgnZ29vZC1yZXZpZXdzX19idXR0b24td3JhcHBlci0taGlkZGVuJyk7XG4gICAgfSk7XG4gIH1cbn1cblxuY29uc3QgcmFkaW9zZWxlY3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNlbGVjdC0yJyk7XG5cbmlmIChyYWRpb3NlbGVjdHMpIHtcbiAgcmFkaW9zZWxlY3RzLmZvckVhY2goKHJhZGlvc2VsZWN0KSA9PiB7XG4gICAgY29uc3QgcmFkaW9zZWxlY3RCdXR0b24gPSByYWRpb3NlbGVjdC5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0LTJfX2J1dHRvbicpO1xuICAgIGNvbnN0IHJhZGlvYnV0dG9uID0gcmFkaW9zZWxlY3QucXVlcnlTZWxlY3RvcignLnNlbGVjdC0yX19yYWRpb2J1dHRvbicpO1xuXG4gICAgY29uc3QgY2hlY2tDbGlja091dCA9IChldnQpID0+IHtcbiAgICAgIGlmICghZXZ0LnRhcmdldC5jbG9zZXN0KCcuc2VsZWN0LTInKSkge1xuICAgICAgICBjbG9zZVJhZGlvU2VsZWN0KCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IG9wZW5SYWRpb1NlbGVjdCA9ICgpID0+IHtcbiAgICAgIHJhZGlvc2VsZWN0LmNsYXNzTGlzdC5hZGQoJ3NlbGVjdC0yLS1vcGVuJyk7XG4gICAgICByYWRpb2J1dHRvbi5mb2N1cygpO1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2hlY2tDbGlja091dCk7XG4gICAgfTtcblxuICAgIGNvbnN0IGNsb3NlUmFkaW9TZWxlY3QgPSAoKSA9PiB7XG4gICAgICByYWRpb3NlbGVjdC5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3QtMi0tb3BlbicpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2hlY2tDbGlja091dCk7XG4gICAgfTtcblxuICAgIHJhZGlvc2VsZWN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgaWYgKCFyYWRpb3NlbGVjdC5jbGFzc0xpc3QuY29udGFpbnMoJ3NlbGVjdC0yLS1vcGVuJykpIHtcbiAgICAgICAgb3BlblJhZGlvU2VsZWN0KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjbG9zZVJhZGlvU2VsZWN0KCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCByYWRpb3NlbGVjdE9wdGlvbnNXcmFwcGVyID0gcmFkaW9zZWxlY3QucXVlcnlTZWxlY3RvcignLnNlbGVjdC0yX19vcHRpb25zJyk7XG5cbiAgICBjb25zdCByYWRpb3NlbGVjdEJ1dHRvblZhbHVlID0gcmFkaW9zZWxlY3RCdXR0b24ucXVlcnlTZWxlY3RvcignLnNlbGVjdC0yX19idXR0b24tdmFsdWUnKTtcblxuICAgIHJhZGlvc2VsZWN0T3B0aW9uc1dyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZ0KSA9PiB7XG4gICAgICBpZiAoZXZ0LnRhcmdldC5jbGFzc05hbWUgPT09ICdzZWxlY3QtMl9fcmFkaW9idXR0b24tbGFiZWwnKSB7XG4gICAgICAgIGNsb3NlUmFkaW9TZWxlY3QoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IHJhZGlvYnV0dG9ucyA9IHJhZGlvc2VsZWN0LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zZWxlY3QtMl9fcmFkaW9idXR0b24nKTtcblxuICAgIHJhZGlvYnV0dG9ucy5mb3JFYWNoKChyYWRpb2J1dHRvbikgPT4ge1xuICAgICAgcmFkaW9idXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgICAgICByYWRpb3NlbGVjdEJ1dHRvblZhbHVlLnRleHRDb250ZW50ID0gcmFkaW9idXR0b24ucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0LTJfX3JhZGlvYnV0dG9uLWxhYmVsJykudGV4dENvbnRlbnQ7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmNvbnN0IGdvb2RRdWFudGl0eUFsdGVyTm9kZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ29vZHMtcXVhbnRpdHktLWFsdGVyLCAuZ29vZHMtcXVhbnRpdHktLWFsdGVyLTInKTtcblxuaWYgKGdvb2RRdWFudGl0eUFsdGVyTm9kZXMpIHtcbiAgZ29vZFF1YW50aXR5QWx0ZXJOb2Rlcy5mb3JFYWNoKChnb29kUXVhbnRpdHkpID0+IHtcbiAgICBjb25zdCB0b2dnbGVyID0gZ29vZFF1YW50aXR5LnF1ZXJ5U2VsZWN0b3IoJy5nb29kcy1xdWFudGl0eV9fc2VsZWN0LWJ1dHRvbicpO1xuICAgIGNvbnN0IHJhZGlvYnV0dG9uc1dyYXBwZXIgPSBnb29kUXVhbnRpdHkucXVlcnlTZWxlY3RvcignLmdvb2RzLXF1YW50aXR5X19yYWRpb2J1dHRvbnMnKTtcbiAgICBjb25zdCByYWRpb2J1dHRvbiA9IHJhZGlvYnV0dG9uc1dyYXBwZXIucXVlcnlTZWxlY3RvcignLnJhZGlvYnV0dG9uX19jb250cm9sJyk7XG5cbiAgICBjb25zdCBjaGVja0NsaWNrT3V0ID0gKGV2dCkgPT4ge1xuICAgICAgaWYgKCFldnQudGFyZ2V0LmNsb3Nlc3QoJy5nb29kcy1xdWFudGl0eV9fcmFkaW9idXR0b25zJykpIHtcbiAgICAgICAgaGlkZUJ1dHRvbnMoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3Qgc2hvd0J1dHRvbnMgPSAoKSA9PiB7XG4gICAgICByYWRpb2J1dHRvbnNXcmFwcGVyLmNsYXNzTGlzdC5hZGQoJ2dvb2RzLXF1YW50aXR5X19yYWRpb2J1dHRvbnMtLW9wZW4nKTtcbiAgICAgIHJhZGlvYnV0dG9uLmZvY3VzKCk7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjaGVja0NsaWNrT3V0KTtcbiAgICB9O1xuXG4gICAgY29uc3QgaGlkZUJ1dHRvbnMgPSAoKSA9PiB7XG4gICAgICByYWRpb2J1dHRvbnNXcmFwcGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2dvb2RzLXF1YW50aXR5X19yYWRpb2J1dHRvbnMtLW9wZW4nKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGNoZWNrQ2xpY2tPdXQpO1xuICAgIH07XG5cbiAgICB0b2dnbGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgaWYgKCFyYWRpb2J1dHRvbnNXcmFwcGVyLmNsYXNzTGlzdC5jb250YWlucygnZ29vZHMtcXVhbnRpdHlfX3JhZGlvYnV0dG9ucy0tb3BlbicpKSB7XG4gICAgICAgIHNob3dCdXR0b25zKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBoaWRlQnV0dG9ucygpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmFkaW9idXR0b25zV3JhcHBlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldnQpID0+IHtcbiAgICAgIGlmIChldnQudGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ3JhZGlvYnV0dG9uX19sYWJlbCcpIHtcbiAgICAgICAgaGlkZUJ1dHRvbnMoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IHJhZGlvYnV0dG9ucyA9IHJhZGlvYnV0dG9uc1dyYXBwZXIucXVlcnlTZWxlY3RvckFsbCgnLnJhZGlvYnV0dG9uX19jb250cm9sJyk7XG5cbiAgICByYWRpb2J1dHRvbnMuZm9yRWFjaCgocmFkaW9idXR0b24pID0+IHtcbiAgICAgIHJhZGlvYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICAgICAgdG9nZ2xlci50ZXh0Q29udGVudCA9IHJhZGlvYnV0dG9uLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcignLnJhZGlvYnV0dG9uX19sYWJlbCcpLnRleHRDb250ZW50LnNsaWNlKDAsIDIpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG5jb25zdCBjb3ZlckNhcmRXcmFwcGVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zLXBvcHVsYXIgLmNvbnRhaW5lcicpO1xuXG5pZiAoY292ZXJDYXJkV3JhcHBlcnMpIHtcbiAgY292ZXJDYXJkV3JhcHBlcnMuZm9yRWFjaCgoY2FyZFdyYXBwZXIpID0+IHtcbiAgICBjb25zdCBjYXJkcyA9IGNhcmRXcmFwcGVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5jYXJkJyk7XG5cbiAgICBjYXJkcy5mb3JFYWNoKChjYXJkKSA9PiB7XG4gICAgICBjYXJkLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsICgpID0+IHtcbiAgICAgICAgY2FyZFdyYXBwZXIuc3R5bGUuekluZGV4ID0gMjAwO1xuICAgICAgfSk7XG5cbiAgICAgIGNhcmQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCAoKSA9PiB7XG4gICAgICAgIGNhcmRXcmFwcGVyLnN0eWxlLnpJbmRleCA9ICdhdXRvJztcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn1cblxuY29uc3QgZ29vZHNGaWx0ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYy1maWx0ZXInKTtcblxuaWYgKGdvb2RzRmlsdGVyKSB7XG4gIGNvbnN0IFdBSVRJTkdfTElTVF9ERUxBWV9USU1FID0gNTA7XG5cbiAgY29uc3QgY2hlY2tGYWxsaW5nT3V0ID0gKGJsb2NrKSA9PiB7XG4gICAgcmV0dXJuIChibG9jay5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5yaWdodCAtIGdvb2RzRmlsdGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnJpZ2h0ID4gMCk7XG4gIH07XG5cbiAgY29uc3QgbW92ZUxlZnQgPSAoYmxvY2spID0+IHtcbiAgICBibG9jay5zdHlsZS5sZWZ0ID0gJ2F1dG8nO1xuICB9O1xuXG4gIGNvbnN0IHJlc2V0U2hpZnQgPSAoYmxvY2spID0+IHtcbiAgICBibG9jay5zdHlsZS5sZWZ0ID0gMDtcbiAgfVxuXG4gIGNvbnN0IHNlbGVjdEVsZW1lbnRzID0gZ29vZHNGaWx0ZXIucXVlcnlTZWxlY3RvckFsbCgnLmZvcm0tc2VsZWN0Jyk7XG5cbiAgc2VsZWN0RWxlbWVudHMuZm9yRWFjaCgoc2VsZWN0KSA9PiB7XG4gICAgY29uc3QgYnV0dG9uID0gc2VsZWN0LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtLXNlbGVjdF9faW5wdXQnKTtcbiAgICBjb25zdCBsaXN0ID0gc2VsZWN0LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtLXNlbGVjdF9fbGlzdCcpO1xuXG4gICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgaWYgKCFidXR0b24uY2xhc3NMaXN0LmNvbnRhaW5zKCdvcGVuJykpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgaWYgKGNoZWNrRmFsbGluZ091dChsaXN0KSkge1xuICAgICAgICAgICAgbW92ZUxlZnQobGlzdCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LCBXQUlUSU5HX0xJU1RfREVMQVlfVElNRSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXNldFNoaWZ0KGxpc3QpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn1cblxuY29uc3Qgc21hbGxDdXN0b21Gb3JtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jdXN0b20tZm9ybS0tY29tcGFjdCcpO1xuXG5pZiAoc21hbGxDdXN0b21Gb3Jtcykge1xuICBzbWFsbEN1c3RvbUZvcm1zLmZvckVhY2goKGZvcm0pID0+IHtcbiAgICBjb25zdCBzdWJtaXRCdXR0b24gPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoJy5mb3JtX19idXR0b24tLXN1Ym1pdCcpO1xuICAgIHN1Ym1pdEJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXG4gICAgY29uc3QgaW5wdXQgPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoJy5mb3JtX190ZXh0ZmllbGQtY29udHJvbCcpO1xuXG4gICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoKSA9PiB7XG4gICAgICBpZiAoaW5wdXQudmFsdWUpIHtcbiAgICAgICAgc3VibWl0QnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnZ3JpZCc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdWJtaXRCdXR0b24uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcbiAgaWYgKHdpbmRvdy5sb2NhdGlvbi5oYXNoID09PSAnI2pzLW1vZGFsLW1lc3NhZ2UnKSB7XG4gICAgJCgnI2pzLW1vZGFsLW1lc3NhZ2UnKS5mYWRlSW4oNTAwKSwgJChcImJvZHlcIikuYXBwZW5kKCc8ZGl2IGNsYXNzPVwib3ZlcmxheVwiIGlkPVwianMtb3ZlcmxheVwiPjwvZGl2PicpO1xuICAgICQoXCJib2R5XCIpLmFkZENsYXNzKFwib3BlbmVkLW1vZGFsXCIpO1xuICB9XG59KTtcblxuY29uc3QgZmlsZVVwbG9hZENvbnRyb2wgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9ybV9fZmlsZS1maWVsZC1jb250cm9sJyk7XG5cbmlmIChmaWxlVXBsb2FkQ29udHJvbCkge1xuICBmaWxlVXBsb2FkQ29udHJvbC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgZmlsZVVwbG9hZENvbnRyb2wuY2xhc3NMaXN0LnRvZ2dsZSgnZm9ybV9fZmlsZS1maWVsZC1jb250cm9sLS1zaG93bicsIGZpbGVVcGxvYWRDb250cm9sLmZpbGVzWzBdKTtcbiAgfSk7XG59XG5cbmNvbnN0IGN1c3RvbUZvcm0yRWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY3VzdG9tLWZvcm0tMicpO1xuXG5pZiAoY3VzdG9tRm9ybTJFbGVtZW50cykge1xuICBjb25zdCB0b2dnbGVBY2NvcmRpb25WaWV3ID0gKGV2dCkgPT4ge1xuICAgIGNvbnN0IGFjY29yZGlvbkJ1dHRvbiA9IGV2dC50YXJnZXQuY2xvc2VzdCgnLmZvcm1fX3NlY3Rpb24taGVhZGluZy1idXR0b24nKTtcblxuICAgIGlmICghYWNjb3JkaW9uQnV0dG9uKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgYWNjb3JkaW9uID0gYWNjb3JkaW9uQnV0dG9uLmNsb3Nlc3QoJy5mb3JtX19zZWN0aW9uJyk7XG4gICAgYWNjb3JkaW9uLmNsYXNzTGlzdC50b2dnbGUoJ2Zvcm1fX3NlY3Rpb24tLW9wZW4nKTtcbiAgfTtcblxuICBjdXN0b21Gb3JtMkVsZW1lbnRzLmZvckVhY2goKGZvcm0pID0+IHtcbiAgICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdG9nZ2xlQWNjb3JkaW9uVmlldyk7XG4gIH0pO1xufVxuXG5jb25zdCBwcm9tb2NvZGVFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmN1c3RvbS1mb3JtLTItLW9yZGVyIC5mb3JtX19wcm9tb2NvZGUnKTtcbmNvbnN0IHByb21vY29kZUNhbmNlbEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9tb2NvZGVfX2NhbmNlbC1idXR0b24nKTtcbmNvbnN0IHByb21vY29kZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvcm1fX3RleHRmaWVsZC1jb250cm9sJyk7XG5jb25zdCBwcm9tb2NvZGVTaG93QnV0dG9uMSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jdXN0b20tZm9ybS0yLS1vcmRlciAuZm9ybV9fZm9vdGVyLXByb21vLWJ1dHRvbicpO1xuY29uc3QgcHJvbW9jb2RlU2hvd0J1dHRvbjIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY3VzdG9tLWZvcm0tMi0tb3JkZXIgLmZvcm1fX3Byb21vY29kZS1idXR0b24nKTtcblxuaWYgKHByb21vY29kZUVsZW1lbnQgJiYgcHJvbW9jb2RlU2hvd0J1dHRvbjEgJiYgcHJvbW9jb2RlU2hvd0J1dHRvbjIpIHtcbiAgcHJvbW9jb2RlU2hvd0J1dHRvbjEuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZ0KSA9PiB7XG4gICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgcHJvbW9jb2RlU2hvd0J1dHRvbjEuY2xhc3NMaXN0LmFkZCgnZm9ybV9fZm9vdGVyLXByb21vLWJ1dHRvbi0taGlkZGVuJyk7XG4gICAgcHJvbW9jb2RlU2hvd0J1dHRvbjIuY2xhc3NMaXN0LmFkZCgnZm9ybV9fcHJvbW9jb2RlLWJ1dHRvbi0taGlkZGVuJyk7XG4gICAgcHJvbW9jb2RlRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdmb3JtX19wcm9tb2NvZGUtLXNob3cnKTtcbiAgICBwcm9tb2NvZGVJbnB1dC5mb2N1cygpO1xuICB9KTtcbn1cblxuaWYgKHByb21vY29kZUVsZW1lbnQgJiYgcHJvbW9jb2RlU2hvd0J1dHRvbjEgJiYgcHJvbW9jb2RlU2hvd0J1dHRvbjIpIHtcbiAgcHJvbW9jb2RlU2hvd0J1dHRvbjIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZ0KSA9PiB7XG4gICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgcHJvbW9jb2RlU2hvd0J1dHRvbjEuY2xhc3NMaXN0LmFkZCgnZm9ybV9fZm9vdGVyLXByb21vLWJ1dHRvbi0taGlkZGVuJyk7XG4gICAgcHJvbW9jb2RlU2hvd0J1dHRvbjIuY2xhc3NMaXN0LmFkZCgnZm9ybV9fcHJvbW9jb2RlLWJ1dHRvbi0taGlkZGVuJyk7XG4gICAgcHJvbW9jb2RlRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdmb3JtX19wcm9tb2NvZGUtLXNob3cnKTtcbiAgICBwcm9tb2NvZGVJbnB1dC5mb2N1cygpO1xuICB9KTtcbn1cblxuaWYgKHByb21vY29kZUVsZW1lbnQgJiYgcHJvbW9jb2RlQ2FuY2VsQnV0dG9uICYmIHByb21vY29kZVNob3dCdXR0b24xICYmIHByb21vY29kZVNob3dCdXR0b24yKSB7XG4gIHByb21vY29kZUNhbmNlbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBwcm9tb2NvZGVTaG93QnV0dG9uMS5jbGFzc0xpc3QucmVtb3ZlKCdmb3JtX19mb290ZXItcHJvbW8tYnV0dG9uLS1oaWRkZW4nKTtcbiAgICBwcm9tb2NvZGVTaG93QnV0dG9uMi5jbGFzc0xpc3QucmVtb3ZlKCdmb3JtX19wcm9tb2NvZGUtYnV0dG9uLS1oaWRkZW4nKTtcbiAgICBwcm9tb2NvZGVFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2Zvcm1fX3Byb21vY29kZS0tc2hvdycpO1xuICB9KTtcbn1cblxuY29uc3QgaW5zcGlyYXRpb25HYWxsZXJ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmluc3BpcmF0aW9uJyk7XG5cbmlmIChpbnNwaXJhdGlvbkdhbGxlcnkpIHtcbiAgbGV0IHN3aXBlciA9IG5ldyBTd2lwZXIoXCIuYXJ0Z2FsbGVyeS1zd2lwZXJcIiwge1xuICAgIHNsaWRlc1BlclZpZXc6ICdhdXRvJyxcbiAgICBzcGFjZUJldHdlZW46IDUsXG4gICAgbmF2aWdhdGlvbjoge1xuICAgICAgbmV4dEVsOiBcIi5pbnNwaXJhdGlvbl9fYXJyb3ctLW5leHRcIixcbiAgICAgIHByZXZFbDogXCIuaW5zcGlyYXRpb25fX2Fycm93LS1iYWNrXCIsXG4gICAgfSxcbiAgfSlcbn07XG5cbmNvbnN0IHByb2R1Y3RzU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9kdWN0cycpO1xuXG5pZiAocHJvZHVjdHNTZWN0aW9uKSB7XG4gIChmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgYnJlYWtwb2ludCA9IHdpbmRvdy5tYXRjaE1lZGlhKCcobWluLXdpZHRoOiAxMjgwcHgpJyk7XG4gICAgY29uc3QgcHJvZHVjdHNTd2lwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvZHVjdHMtc3dpcGVyJyk7XG4gICAgY29uc3QgcHJvZHVjdHNMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2R1Y3RzX19saXN0Jyk7XG4gICAgY29uc3QgcHJvZHVjdFNsaWRlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcm9kdWN0c19faXRlbScpO1xuXG4gICAgbGV0IHByb2R1Y3RTd2lwZXI7XG4gICAgY29uc3QgYnJlYWtwb2ludENoZWNrZXIgPSAoKSA9PiB7XG5cbiAgICAgIGlmIChicmVha3BvaW50Lm1hdGNoZXMgPT09IHRydWUpIHtcblxuICAgICAgICBpZiAocHJvZHVjdFN3aXBlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcHJvZHVjdFN3aXBlci5kZXN0cm95KHRydWUsIHRydWUpO1xuICAgICAgICAgIHByb2R1Y3RTd2lwZXIgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgcHJvZHVjdHNTd2lwZXIuY2xhc3NMaXN0LnJlbW92ZSgnc3dpcGVyJyk7XG4gICAgICAgICAgcHJvZHVjdHNMaXN0LmNsYXNzTGlzdC5yZW1vdmUoJ3N3aXBlci13cmFwcGVyJyk7XG4gICAgICAgICAgcHJvZHVjdFNsaWRlcy5mb3JFYWNoKChzbGlkZSkgPT4ge1xuICAgICAgICAgICAgc2xpZGUuY2xhc3NMaXN0LnJlbW92ZSgnc3dpcGVyLXNsaWRlJyk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm47XG4gICAgICB9IGVsc2UgaWYgKGJyZWFrcG9pbnQubWF0Y2hlcyA9PT0gZmFsc2UgJiYgcHJvZHVjdFN3aXBlciA9PT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgcmV0dXJuIGVuYWJsZVN3aXBlcigpO1xuXG4gICAgICB9XG5cbiAgICB9O1xuXG4gICAgY29uc3QgZW5hYmxlU3dpcGVyID0gKCkgPT4ge1xuICAgICAgcHJvZHVjdHNTd2lwZXIuY2xhc3NMaXN0LmFkZCgnc3dpcGVyJyk7XG4gICAgICBwcm9kdWN0c0xpc3QuY2xhc3NMaXN0LmFkZCgnc3dpcGVyLXdyYXBwZXInKTtcbiAgICAgIHByb2R1Y3RTbGlkZXMuZm9yRWFjaCgoc2xpZGUpID0+IHtcbiAgICAgICAgc2xpZGUuY2xhc3NMaXN0LmFkZCgnc3dpcGVyLXNsaWRlJyk7XG4gICAgICB9KTtcblxuICAgICAgcHJvZHVjdFN3aXBlciA9IG5ldyBTd2lwZXIoJy5wcm9kdWN0cy1zd2lwZXInLCB7XG4gICAgICAgIHNsaWRlc1BlclZpZXc6IDEsXG4gICAgICAgIGdyaWQ6IHtcbiAgICAgICAgICByb3dzOiAyLFxuICAgICAgICB9LFxuICAgICAgICBzcGFjZUJldHdlZW46IDgsXG4gICAgICAgIG5hdmlnYXRpb246IHtcbiAgICAgICAgICBuZXh0RWw6IFwiLnByb2R1Y3RzX19hcnJvdy0tbmV4dFwiLFxuICAgICAgICAgIHByZXZFbDogXCIucHJvZHVjdHNfX2Fycm93LS1iYWNrXCIsXG4gICAgICAgIH0sXG4gICAgICAgIGJyZWFrcG9pbnRzOiB7XG4gICAgICAgICAgNzY4OiB7XG4gICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAnYXV0bycsXG4gICAgICAgICAgfSxcbiAgICAgICAgICAxMjgwOiB7XG4gICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiA0LFxuICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiA1LFxuICAgICAgICAgIH0sXG4gICAgICAgICAgMTUxMDoge1xuICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAxMCxcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgYnJlYWtwb2ludENoZWNrZXIpO1xuICAgIGJyZWFrcG9pbnRDaGVja2VyKCk7XG4gIH0pKCk7XG59XG5cbmNvbnN0IHByb2plY3RzR2FsbGVyeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0cycpO1xuaWYgKHByb2plY3RzR2FsbGVyeSkge1xuICBsZXQgc3dpcGVyID0gbmV3IFN3aXBlcihcIi5wcm9qZWN0cy1zd2lwZXJcIiwge1xuICAgIHNsaWRlc1BlclZpZXc6ICdhdXRvJyxcbiAgICBzcGFjZUJldHdlZW46IDUsXG4gICAgbmF2aWdhdGlvbjoge1xuICAgICAgbmV4dEVsOiBcIi5wcm9qZWN0c19fYXJyb3ctLW5leHRcIixcbiAgICAgIHByZXZFbDogXCIucHJvamVjdHNfX2Fycm93LS1iYWNrXCIsXG4gICAgfSxcbiAgfSlcbn07XG5cbmNvbnN0IHNlcnZpY2VTd2lwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubi1zZXJ2aWNlJyk7XG5pZiAoc2VydmljZVN3aXBlcikge1xuICBsZXQgc3dpcGVyID0gbmV3IFN3aXBlcihcIi5uLXNlcnZpY2Utc3dpcGVyXCIsIHtcbiAgICBzbGlkZXNQZXJWaWV3OiAnYXV0bycsXG4gICAgd2F0Y2hPdmVyZmxvdzogdHJ1ZSxcbiAgICBzcGFjZUJldHdlZW46IDUsXG4gICAgYnJlYWtwb2ludHM6IHtcbiAgICAgIDc2ODoge1xuICAgICAgICBzbGlkZXNQZXJWaWV3OiAzLFxuICAgICAgICBzcGFjZUJldHdlZW46IDcsXG4gICAgICB9LFxuICAgICAgMTUxMDoge1xuICAgICAgICBzcGFjZUJldHdlZW46IDIwLFxuICAgICAgfSxcbiAgICB9XG4gIH0pXG59O1xuXG5jb25zdCB0aWxlU3dpcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRpbGUtcmFuZ2UnKTtcbmlmICh0aWxlU3dpcGVyKSB7XG4gIGxldCBzd2lwZXIgPSBuZXcgU3dpcGVyKCcudGlsZS1yYW5nZS1zd2lwZXInLCB7XG4gICAgc2xpZGVzUGVyVmlldzogJ2F1dG8nLFxuICAgIGdyaWQ6IHtcbiAgICAgIHJvd3M6IDIsXG4gICAgfSxcbiAgICBzcGFjZUJldHdlZW46IDgsXG4gICAgbmF2aWdhdGlvbjoge1xuICAgICAgbmV4dEVsOiBcIi50aWxlLXJhbmdlX19hcnJvdy0tbmV4dFwiLFxuICAgICAgcHJldkVsOiBcIi50aWxlLXJhbmdlX19hcnJvdy0tYmFja1wiLFxuICAgIH0sXG4gICAgYnJlYWtwb2ludHM6IHtcbiAgICAgIDc2ODoge1xuICAgICAgICBzcGFjZUJldHdlZW46IDEwLFxuICAgICAgfSxcbiAgICAgIDEyODA6IHtcbiAgICAgICAgc2xpZGVzUGVyVmlldzogNCxcbiAgICAgICAgc3BhY2VCZXR3ZWVuOiA4LFxuICAgICAgfSxcbiAgICB9LFxuICB9KTtcbn07XG5cbmNvbnN0IGxpbmtzRWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubGlua3MnKTtcblxuaWYgKGxpbmtzRWxlbWVudHMpIHtcbiAgbGlua3NFbGVtZW50cy5mb3JFYWNoKChsaW5rcykgPT4ge1xuICAgIGxpbmtzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2dCkgPT4ge1xuICAgICAgY29uc3QgYnV0dG9uID0gZXZ0LnRhcmdldC5jbG9zZXN0KCcubGlua3NfX3RvZ2dsZScpO1xuXG4gICAgICBpZiAoIWJ1dHRvbikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGxpbmtzLmNsYXNzTGlzdC50b2dnbGUoJ2xpbmtzLS1vcGVuJyk7XG4gICAgfSlcbiAgfSk7XG59XG5cbmNvbnN0IG9yZGVyRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jdXN0b20tZm9ybS0yLS1vcmRlcicpO1xuXG5pZiAob3JkZXJGb3JtKSB7XG4gIGNvbnN0IGZvcm1TZWN0aW9uQm9keUFkZHJlc3MgPSBvcmRlckZvcm0ucXVlcnlTZWxlY3RvcignLmZvcm1fX3NlY3Rpb24tYm9keS0tYWRkcmVzcycpO1xuXG4gIGlmIChmb3JtU2VjdGlvbkJvZHlBZGRyZXNzKSB7XG4gICAgb3JkZXJGb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIChldnQpID0+IHtcbiAgICAgIGNvbnN0IGRlbGl2ZXJ5U2VsZkNoZWNrYm94ID0gZXZ0LnRhcmdldC5jbG9zZXN0KCcuZm9ybV9fY2hlY2tib3gtY29udHJvbCcpO1xuICAgICAgaWYgKCFkZWxpdmVyeVNlbGZDaGVja2JveCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBmb3JtU2VjdGlvbkJvZHlBZGRyZXNzLmNsYXNzTGlzdC50b2dnbGUoJ2Zvcm1fX3NlY3Rpb24tYm9keS0tYWRkcmVzcy0tc3RvY2snLCBkZWxpdmVyeVNlbGZDaGVja2JveC5jaGVja2VkKTtcbiAgICB9KTtcbiAgfVxufVxuXG5jb25zdCBhbmNob3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubi1iYW5uZXJfX3ZpZGVvLWxpbmsnKTtcblxuY29uc3QgZWxlbWVudENsaWNrSGFuZGxlciA9IChldnQpID0+IHtcbiAgY29uc3QgZWxlbWVudCA9IGV2dC50YXJnZXQuY2xvc2VzdCgnYScpO1xuICBpZiAoIWVsZW1lbnQpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gIGNvbnN0IGJsb2NrSWQgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuXG4gIGlmIChibG9ja0lkICYmIGJsb2NrSWQgIT09ICcjJyAmJiBibG9ja0lkICE9PSAnIyEnKSB7XG4gICAgY29uc3QgYmxvY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGJsb2NrSWQpO1xuXG4gICAgaWYgKGJsb2NrKSB7XG4gICAgICBibG9jay5zY3JvbGxJbnRvVmlldyh7XG4gICAgICAgIGJlaGF2aW9yOiAnc21vb3RoJyxcbiAgICAgICAgYmxvY2s6ICdzdGFydCcsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn07XG5cbmlmIChhbmNob3IpIHtcbiAgYW5jaG9yLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZWxlbWVudENsaWNrSGFuZGxlcik7XG59XG5cbmNvbnN0IG5Qcm9kdWN0c0l0ZW1TbGlkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubi1wcm9kdWN0c19faXRlbS1zbGlkZXInKTtcblxuaWYgKG5Qcm9kdWN0c0l0ZW1TbGlkZXIpIHtcbiAgdmFyIHN3aXBlciA9IG5ldyBTd2lwZXIoJy5uLXByb2R1Y3RzX19pdGVtLXNsaWRlcicsIHtcbiAgICBjc3NNb2RlOiB0cnVlLFxuICAgIG5hdmlnYXRpb246IHtcbiAgICAgIG5leHRFbDogJy5zd2lwZXItYnV0dG9uLW5leHQnLFxuICAgICAgcHJldkVsOiAnLnN3aXBlci1idXR0b24tcHJldicsXG4gICAgfSxcbiAgICBwYWdpbmF0aW9uOiB7XG4gICAgICBlbDogJy5zd2lwZXItcGFnaW5hdGlvbicsXG4gICAgICBjbGlja2FibGU6IHRydWUsXG4gICAgfSxcbiAgICBtb3VzZXdoZWVsOiB0cnVlLFxuICAgIGtleWJvYXJkOiB0cnVlLFxuICB9KTtcbn1cblxuY29uc3QgbWF0ZXJpYWxzU3dpcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1hdGVyaWFsc19fc2xpZGVyLnN3aXBlcicpO1xuXG5pZiAobWF0ZXJpYWxzU3dpcGVyKSB7XG4gIHZhciBzd2lwZXIgPSBuZXcgU3dpcGVyKCcubWF0ZXJpYWxzX19zbGlkZXInLCB7XG4gICAgc2xpZGVzUGVyVmlldzogJ2F1dG8nLFxuICAgIHNwYWNlQmV0d2VlbjogMTAsXG4gICAgY3NzTW9kZTogdHJ1ZSxcbiAgICBuYXZpZ2F0aW9uOiB7XG4gICAgICBuZXh0RWw6ICcuc3dpcGVyLWJ1dHRvbi1uZXh0JyxcbiAgICAgIHByZXZFbDogJy5zd2lwZXItYnV0dG9uLXByZXYnLFxuICAgIH0sXG4gICAgbW91c2V3aGVlbDogdHJ1ZSxcbiAgICBrZXlib2FyZDogdHJ1ZSxcbiAgICBicmVha3BvaW50czoge1xuICAgICAgNzY4OiB7XG4gICAgICAgIHNwYWNlQmV0d2VlbjogMTUsXG4gICAgICB9LFxuICAgICAgMTI4MDoge1xuICAgICAgICBzbGlkZXNQZXJWaWV3OiA0LFxuICAgICAgICBzcGFjZUJldHdlZW46IDI1XG4gICAgICB9LFxuICAgIH0sXG4gIH0pO1xufVxuXG5cbmNvbnN0IG1hdGVyaWFsU3dpcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1hdGVyaWFsX19zbGlkZXIuc3dpcGVyJyk7XG5cbmlmIChtYXRlcmlhbFN3aXBlcikge1xuICB2YXIgc3dpcGVyID0gbmV3IFN3aXBlcignLm1hdGVyaWFsX19zbGlkZXInLCB7XG4gICAgc2xpZGVzUGVyVmlldzogMSxcbiAgICBjc3NNb2RlOiB0cnVlLFxuICAgIG5hdmlnYXRpb246IHtcbiAgICAgIG5leHRFbDogJy5zd2lwZXItYnV0dG9uLW5leHQnLFxuICAgICAgcHJldkVsOiAnLnN3aXBlci1idXR0b24tcHJldicsXG4gICAgfSxcbiAgICBtb3VzZXdoZWVsOiB0cnVlLFxuICAgIGtleWJvYXJkOiB0cnVlLFxuICB9KTtcbn1cblxuY29uc3QgbWF0ZXJpYWxzU3dpcGVyQWx0ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWF0ZXJpYWxzX19zbGlkZXItLWFsdGVyLnN3aXBlcicpO1xuXG5pZiAobWF0ZXJpYWxzU3dpcGVyQWx0ZXIpIHtcbiAgdmFyIHN3aXBlciA9IG5ldyBTd2lwZXIoJy5tYXRlcmlhbHNfX3NsaWRlci0tYWx0ZXInLCB7XG4gICAgc2xpZGVzUGVyVmlldzogJ2F1dG8nLFxuICAgIHNwYWNlQmV0d2VlbjogMTEsXG4gICAgY3NzTW9kZTogdHJ1ZSxcbiAgICBuYXZpZ2F0aW9uOiB7XG4gICAgICBuZXh0RWw6ICcuc3dpcGVyLWJ1dHRvbi1uZXh0JyxcbiAgICAgIHByZXZFbDogJy5zd2lwZXItYnV0dG9uLXByZXYnLFxuICAgIH0sXG4gICAgbW91c2V3aGVlbDogdHJ1ZSxcbiAgICBrZXlib2FyZDogdHJ1ZSxcbiAgICBicmVha3BvaW50czoge1xuICAgICAgMTI4MDoge1xuICAgICAgICBzbGlkZXNQZXJWaWV3OiA2LFxuICAgICAgfSxcbiAgICAgIDE1MTA6IHtcbiAgICAgICAgc2xpZGVzUGVyVmlldzogNyxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSk7XG59XG5cbmNvbnN0IGluaXRTZWxlY3RzID0gKHBhcmVudE5vZGUpID0+IHtcbiAgY29uc3Qgc2VsZWN0RWxlbWVudHMgPSBwYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3JBbGwoJy5uLXNlbGVjdCBzZWxlY3QnKTtcbiAgaWYgKCFzZWxlY3RFbGVtZW50cykge1xuICAgIHJldHVybjtcbiAgfVxuICBzZWxlY3RFbGVtZW50cy5mb3JFYWNoKChzZWxlY3QpID0+IHtcbiAgICBjb25zdCBjaG9pY2VzID0gbmV3IENob2ljZXMoc2VsZWN0LCB7XG4gICAgICBzZWFyY2hFbmFibGVkOiBmYWxzZSxcbiAgICB9KTtcbiAgfSlcbn07XG5cbmluaXRTZWxlY3RzKGRvY3VtZW50KTtcblxuXG5jb25zdCBicmFuZHNTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm4tYnJhbmRzJyk7XG5cbmlmIChicmFuZHNTZWN0aW9uKSB7XG4gIChmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgYnJlYWtwb2ludCA9IHdpbmRvdy5tYXRjaE1lZGlhKCcobWluLXdpZHRoOiA3NjhweCknKTtcbiAgICBjb25zdCBicmFuZHNTd2lwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnJhbmRzLXN3aXBlcicpO1xuICAgIGNvbnN0IGJyYW5kc0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubi1icmFuZHNfX2xpc3QnKTtcbiAgICBjb25zdCBicmFuZHNTbGlkZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubi1icmFuZHNfX2l0ZW0nKTtcblxuICAgIGxldCBicmFuZFN3aXBlcjtcbiAgICBjb25zdCBicmVha3BvaW50Q2hlY2tlciA9ICgpID0+IHtcblxuICAgICAgaWYgKGJyZWFrcG9pbnQubWF0Y2hlcyA9PT0gZmFsc2UpIHtcblxuICAgICAgICBpZiAoYnJhbmRTd2lwZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGJyYW5kU3dpcGVyLmRlc3Ryb3kodHJ1ZSwgdHJ1ZSk7XG4gICAgICAgICAgYnJhbmRTd2lwZXIgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgYnJhbmRzU3dpcGVyLmNsYXNzTGlzdC5yZW1vdmUoJ3N3aXBlcicpO1xuICAgICAgICAgIGJyYW5kc0xpc3QuY2xhc3NMaXN0LnJlbW92ZSgnc3dpcGVyLXdyYXBwZXInKTtcbiAgICAgICAgICBicmFuZHNTbGlkZXMuZm9yRWFjaCgoc2xpZGUpID0+IHtcbiAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoJ3N3aXBlci1zbGlkZScpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcblxuICAgICAgfSBlbHNlIGlmIChicmVha3BvaW50Lm1hdGNoZXMgPT09IHRydWUgJiYgYnJhbmRTd2lwZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gZW5hYmxlU3dpcGVyKCk7XG5cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3QgZW5hYmxlU3dpcGVyID0gKCkgPT4ge1xuICAgICAgYnJhbmRzU3dpcGVyLmNsYXNzTGlzdC5hZGQoJ3N3aXBlcicpO1xuICAgICAgYnJhbmRzTGlzdC5jbGFzc0xpc3QuYWRkKCdzd2lwZXItd3JhcHBlcicpO1xuICAgICAgYnJhbmRzU2xpZGVzLmZvckVhY2goKHNsaWRlKSA9PiB7XG4gICAgICAgIHNsaWRlLmNsYXNzTGlzdC5hZGQoJ3N3aXBlci1zbGlkZScpO1xuICAgICAgfSk7XG5cbiAgICAgIGJyYW5kU3dpcGVyID0gbmV3IFN3aXBlcignLmJyYW5kcy1zd2lwZXInLCB7XG4gICAgICAgIHNsaWRlc1BlclZpZXc6ICdhdXRvJyxcbiAgICAgICAgc3BhY2VCZXR3ZWVuOiA1LFxuICAgICAgICBuYXZpZ2F0aW9uOiB7XG4gICAgICAgICAgbmV4dEVsOiBcIi5uLWJyYW5kc19fYXJyb3ctLW5leHRcIixcbiAgICAgICAgICBwcmV2RWw6IFwiLm4tYnJhbmRzX19hcnJvdy0tYmFja1wiLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBicmVha3BvaW50Q2hlY2tlcik7XG4gICAgYnJlYWtwb2ludENoZWNrZXIoKTtcbiAgfSkoKTtcbn1cblxuY29uc3QgbmV3c1NlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubi1uZXdzJyk7XG5pZiAobmV3c1NlY3Rpb24pIHtcbiAgbGV0IHN3aXBlciA9IG5ldyBTd2lwZXIoJy5uZXdzLXN3aXBlcicsIHtcbiAgICBzbGlkZXNQZXJWaWV3OiAnYXV0bycsXG4gICAgc3BhY2VCZXR3ZWVuOiA1LFxuICAgIG5hdmlnYXRpb246IHtcbiAgICAgIG5leHRFbDogXCIubi1uZXdzX19hcnJvdy0tbmV4dFwiLFxuICAgICAgcHJldkVsOiBcIi5uLW5ld3NfX2Fycm93LS1iYWNrXCIsXG4gICAgfSxcbiAgfSk7XG59O1xuXG5jb25zdCBjdXJyZW50T2ZmZXJzU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jdXJyZW50LW9mZmVycycpO1xuaWYgKGN1cnJlbnRPZmZlcnNTZWN0aW9uKSB7XG4gIGNvbnN0IHRhYlN3aXBlciA9IG5ldyBTd2lwZXIoJy5vZmZlcnMtdGFicy1zd2lwZXInLCB7XG4gICAgc2xpZGVzUGVyVmlldzogMSxcbiAgICBzcGFjZUJldHdlZW46IDAsXG4gICAgcGFnaW5hdGlvbjoge1xuICAgICAgZWw6ICcuY3VycmVudC1vZmZlcnNfX2RvdHMnLFxuICAgICAgYnVsbGV0QWN0aXZlQ2xhc3M6ICdjdXJyZW50LW9mZmVyc19fZG90LS1jdXJyZW50JyxcbiAgICAgIGJ1bGxldENsYXNzOiAnY3VycmVudC1vZmZlcnNfX2RvdCcsXG4gICAgICBjbGlja2FibGU6IHRydWUsXG4gICAgfSxcbiAgICBicmVha3BvaW50czoge1xuICAgICAgNzY4OiB7XG4gICAgICAgIHNsaWRlc1BlclZpZXc6IDMsXG4gICAgICAgIHNsaWRlc1Blckdyb3VwOiAzLFxuICAgICAgfSxcbiAgICAgIDEyODA6IHtcbiAgICAgICAgc2xpZGVzUGVyVmlldzogNixcbiAgICAgICAgc2xpZGVzUGVyR3JvdXA6IDEsXG4gICAgICB9LFxuICAgIH0sXG4gIH0pO1xuXG4gIGNvbnN0IHN3aXBlciA9IG5ldyBTd2lwZXIoJy5jdXJyZW50LW9mZmVyc19fc2xpZGVyJywge1xuICAgIHNsaWRlc1BlclZpZXc6IDEsXG4gICAgc3BhY2VCZXR3ZWVuOiAwLFxuICAgIG5hdmlnYXRpb246IHtcbiAgICAgIG5leHRFbDogXCIuY3VycmVudC1vZmZlcnNfX2Fycm93LS1uZXh0XCIsXG4gICAgICBwcmV2RWw6IFwiLmN1cnJlbnQtb2ZmZXJzX19hcnJvdy0tYmFja1wiLFxuICAgIH0sXG4gICAgZWZmZWN0OiAnZmFkZScsXG4gICAgZmFkZUVmZmVjdDoge1xuICAgICAgY3Jvc3NGYWRlOiB0cnVlXG4gICAgfSxcbiAgICB0aHVtYnM6IHtcbiAgICAgIHN3aXBlcjogdGFiU3dpcGVyLFxuICAgIH0sXG4gICAgYXV0b3BsYXk6IHtcbiAgICAgIGRlbGF5OiAxMjAwMCxcbiAgICB9LFxuICB9KTtcbn07XG5cbmNvbnN0IG9mZmVyc1NlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcub2ZmZXJzJyk7XG5pZiAob2ZmZXJzU2VjdGlvbikge1xuICBjb25zdCB0YWJzID0gbmV3IFN3aXBlcignLm9mZmVycyAudGFic19fc2xpZGVyJywge1xuICAgIHNsaWRlc1BlclZpZXc6IDEsXG4gICAgc3BhY2VCZXR3ZWVuOiAwLFxuICAgIHBhZ2luYXRpb246IHtcbiAgICAgIGVsOiAnLm9mZmVyc19fdGFicy1wYWdpbmF0aW9uJyxcbiAgICAgIGNsaWNrYWJsZTogdHJ1ZSxcbiAgICB9LFxuICAgIGJyZWFrcG9pbnRzOiB7XG4gICAgICA3Njg6IHtcbiAgICAgICAgc2xpZGVzUGVyVmlldzogMyxcbiAgICAgICAgc2xpZGVzUGVyR3JvdXA6IDMsXG4gICAgICB9LFxuICAgICAgMTI4MDoge1xuICAgICAgICBzbGlkZXNQZXJWaWV3OiA2LFxuICAgICAgICBzbGlkZXNQZXJHcm91cDogMSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSk7XG5cbiAgY29uc3Qgc2xpZGVzID0gbmV3IFN3aXBlcignLm9mZmVyc19fc2xpZGVyJywge1xuICAgIHNsaWRlc1BlclZpZXc6IDEsXG4gICAgc3BhY2VCZXR3ZWVuOiAwLFxuICAgIGxvb3A6IHRydWUsXG4gICAgbmF2aWdhdGlvbjoge1xuICAgICAgbmV4dEVsOiBcIi5vZmZlcnNfX2J1dHRvbi1uZXh0XCIsXG4gICAgICBwcmV2RWw6IFwiLm9mZmVyc19fYnV0dG9uLXByZXZcIixcbiAgICB9LFxuICAgIGVmZmVjdDogJ2ZhZGUnLFxuICAgIGZhZGVFZmZlY3Q6IHtcbiAgICAgIGNyb3NzRmFkZTogdHJ1ZVxuICAgIH0sXG4gICAgdGh1bWJzOiB7XG4gICAgICBzd2lwZXI6IHRhYnMsXG4gICAgfSxcbiAgfSk7XG59O1xuXG5jb25zdCBnb29kc1NsaWRlcjEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ29vZHMtLXN3aXBlci0tMSAuZ29vZHNfX3NsaWRlcicpO1xuaWYgKGdvb2RzU2xpZGVyMSkge1xuICBjb25zdCBzd2lwZXIgPSBuZXcgU3dpcGVyKFwiLmdvb2RzLS1zd2lwZXItLTEgLmdvb2RzX19zbGlkZXJcIiwge1xuICAgIHNsaWRlc1BlclZpZXc6IDEsXG4gICAgc3BhY2VCZXR3ZWVuOiA5LFxuICAgIG5hdmlnYXRpb246IHtcbiAgICAgIG5leHRFbDogXCIuZ29vZHMtLXN3aXBlci0tMSAuZ29vZHNfX3NsaWRlci1idXR0b24tbmV4dFwiLFxuICAgICAgcHJldkVsOiBcIi5nb29kcy0tc3dpcGVyLS0xIC5nb29kc19fc2xpZGVyLWJ1dHRvbi1wcmV2XCIsXG4gICAgfSxcbiAgICBicmVha3BvaW50czoge1xuICAgICAgNDIwOiB7XG4gICAgICAgIHNsaWRlc1BlclZpZXc6ICdhdXRvJyxcbiAgICAgIH0sXG4gICAgICAxMjgwOiB7XG4gICAgICAgIHNsaWRlc1BlclZpZXc6IDQsXG4gICAgICB9LFxuICAgIH0sXG4gICAgd2F0Y2hTbGlkZXNQcm9ncmVzczogdHJ1ZVxuICB9KTtcbn1cblxuY29uc3QgZ29vZHNTbGlkZXIyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdvb2RzLS1zd2lwZXItLTIgLmdvb2RzX19zbGlkZXInKTtcbmlmIChnb29kc1NsaWRlcjEpIHtcbiAgY29uc3Qgc3dpcGVyID0gbmV3IFN3aXBlcihcIi5nb29kcy0tc3dpcGVyLS0yIC5nb29kc19fc2xpZGVyXCIsIHtcbiAgICBzbGlkZXNQZXJWaWV3OiAxLFxuICAgIHNwYWNlQmV0d2VlbjogOSxcbiAgICBuYXZpZ2F0aW9uOiB7XG4gICAgICBuZXh0RWw6IFwiLmdvb2RzLS1zd2lwZXItLTIgLmdvb2RzX19zbGlkZXItYnV0dG9uLW5leHRcIixcbiAgICAgIHByZXZFbDogXCIuZ29vZHMtLXN3aXBlci0tMiAuZ29vZHNfX3NsaWRlci1idXR0b24tcHJldlwiLFxuICAgIH0sXG4gICAgYnJlYWtwb2ludHM6IHtcbiAgICAgIDQyMDoge1xuICAgICAgICBzbGlkZXNQZXJWaWV3OiAnYXV0bycsXG4gICAgICB9LFxuICAgICAgMTI4MDoge1xuICAgICAgICBzbGlkZXNQZXJWaWV3OiA0LFxuICAgICAgfSxcbiAgICB9LFxuICAgIHdhdGNoU2xpZGVzUHJvZ3Jlc3M6IHRydWVcbiAgfSk7XG59XG5cbmNvbnN0IHBvcHVsYXJHb29kc1NlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ29vZHMtLXBvcHVsYXInKTtcblxuaWYgKHBvcHVsYXJHb29kc1NlY3Rpb24pIHtcblxuICAoZnVuY3Rpb24gKCkge1xuXG4gICAgY29uc3QgYnJlYWtwb2ludCA9IHdpbmRvdy5tYXRjaE1lZGlhKCcobWluLXdpZHRoOiAxMjgwcHgpJyk7XG4gICAgY29uc3QgcG9wR29vZHNTd2lwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ29vZHMtLXBvcHVsYXIgLmdvb2RzX19zbGlkZXInKTtcbiAgICBjb25zdCBwb3BHb29kc0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ29vZHMtLXBvcHVsYXIgLmdvb2RzX19saXN0Jyk7XG4gICAgY29uc3QgcG9wR29vZHNTbGlkZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ29vZHMtLXBvcHVsYXIgLmdvb2QtbGlzdF9faXRlbScpO1xuXG4gICAgbGV0IHBvcEdvb2RTd2lwZXI7XG4gICAgY29uc3QgYnJlYWtwb2ludENoZWNrZXIgPSAoKSA9PiB7XG4gICAgICBpZiAoYnJlYWtwb2ludC5tYXRjaGVzID09PSB0cnVlKSB7XG5cbiAgICAgICAgaWYgKHBvcEdvb2RTd2lwZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHBvcEdvb2RTd2lwZXIuZGVzdHJveSh0cnVlLCB0cnVlKTtcbiAgICAgICAgICBwb3BHb29kU3dpcGVyID0gdW5kZWZpbmVkO1xuICAgICAgICAgIHBvcHVsYXJHb29kc1NlY3Rpb24uY2xhc3NMaXN0LnJlbW92ZSgnZ29vZHMtLXN3aXBlcicpO1xuICAgICAgICAgIHBvcEdvb2RzU3dpcGVyLmNsYXNzTGlzdC5yZW1vdmUoJ3N3aXBlcicpO1xuICAgICAgICAgIHBvcEdvb2RzTGlzdC5jbGFzc0xpc3QucmVtb3ZlKCdzd2lwZXItd3JhcHBlcicpO1xuICAgICAgICAgIHBvcEdvb2RzU2xpZGVzLmZvckVhY2goKHNsaWRlKSA9PiB7XG4gICAgICAgICAgICBzbGlkZS5jbGFzc0xpc3QucmVtb3ZlKCdzd2lwZXItc2xpZGUnKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybjtcblxuICAgICAgfSBlbHNlIGlmIChicmVha3BvaW50Lm1hdGNoZXMgPT09IGZhbHNlICYmIHBvcEdvb2RTd2lwZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gZW5hYmxlU3dpcGVyKCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IGVuYWJsZVN3aXBlciA9ICgpID0+IHtcbiAgICAgIHBvcHVsYXJHb29kc1NlY3Rpb24uY2xhc3NMaXN0LmFkZCgnZ29vZHMtLXN3aXBlcicpO1xuICAgICAgcG9wR29vZHNTd2lwZXIuY2xhc3NMaXN0LmFkZCgnc3dpcGVyJyk7XG4gICAgICBwb3BHb29kc0xpc3QuY2xhc3NMaXN0LmFkZCgnc3dpcGVyLXdyYXBwZXInKTtcbiAgICAgIHBvcEdvb2RzU2xpZGVzLmZvckVhY2goKHNsaWRlKSA9PiB7XG4gICAgICAgIHNsaWRlLmNsYXNzTGlzdC5hZGQoJ3N3aXBlci1zbGlkZScpO1xuICAgICAgfSk7XG5cbiAgICAgIHBvcEdvb2RTd2lwZXIgPSBuZXcgU3dpcGVyKFwiLmdvb2RzLS1wb3B1bGFyIC5nb29kc19fc2xpZGVyXCIsIHtcbiAgICAgICAgc2xpZGVzUGVyVmlldzogMSxcbiAgICAgICAgc3BhY2VCZXR3ZWVuOiA5LFxuICAgICAgICBhbGxvd1RvdWNoTW92ZTogdHJ1ZSxcbiAgICAgICAgbmF2aWdhdGlvbjoge1xuICAgICAgICAgIG5leHRFbDogXCIuZ29vZHMtLXBvcHVsYXIgLmdvb2RzX19zbGlkZXItYnV0dG9uLW5leHRcIixcbiAgICAgICAgICBwcmV2RWw6IFwiLmdvb2RzLS1wb3B1bGFyIC5nb29kc19fc2xpZGVyLWJ1dHRvbi1wcmV2XCIsXG4gICAgICAgIH0sXG4gICAgICAgIGJyZWFrcG9pbnRzOiB7XG4gICAgICAgICAgNDIwOiB7XG4gICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAnYXV0bycsXG4gICAgICAgICAgfSxcbiAgICAgICAgICAxMjgwOiB7XG4gICAgICAgICAgICBhbGxvd1RvdWNoTW92ZTogZmFsc2UsXG4gICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiA0LFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHdhdGNoU2xpZGVzUHJvZ3Jlc3M6IHRydWVcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgYnJlYWtwb2ludENoZWNrZXIpO1xuICAgIGJyZWFrcG9pbnRDaGVja2VyKCk7XG4gIH0pKCk7XG59XG4iXSwiZmlsZSI6Im5ldy5qcyJ9
