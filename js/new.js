const popups = document.querySelectorAll('.popup');

const changeEvent = new Event('change', { bubbles: true });

const Key = Object.freeze({
  ESCAPE: 'Escape',
  ESC: 'Esc',
  UP: 'ArrowUp',
  RIGHT: 'ArrowRight',
  DOWN: 'ArrowDown',
  LEFT: 'ArrowLeft',
  SPACE: 'Space',
  ENTER: 'Enter'
});

let isPopupCalculationMaterialWasOpened = false;

if (popups) {

  const isEscEvent = (evt) => {
    return evt.key === Key.ESCAPE || evt.key === Key.ESC;
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

  const openCalculationMaterialPopup = (type, material) => {
    bodyWidth = document.body.clientWidth;

    const popup = document.querySelector('.popup--calculation-material');
    popup.querySelector('form').reset();

    const formResult = popup.querySelector('.calculation-form .form__result');
    const typeSelect = popup.querySelector('.calculation-form select[name="type"]');
    const materialSelect = popup.querySelector('.calculation-form select[name="material"]');

    formResult.classList.add('form__result--hidden');

    typeSelect.value = type ? type : '';
    typeSelect.dispatchEvent(changeEvent);

    materialSelect.value = material ? material : '';

    popup.classList.add('popup--open');
    currentPopup = popup;
    document.body.classList.add('no-scroll');
    document.addEventListener('keydown', onPopupEscKeydown);

    if (document.body.clientWidth > bodyWidth) {
      document.body.style.paddingRight = document.body.clientWidth - bodyWidth + 'px';
    }


    materialSelect.dispatchEvent(changeEvent);

    if(!isPopupCalculationMaterialWasOpened) {
      setTimeout(() => {
        materialSelect.dispatchEvent(changeEvent);
      }, 50)
    }

    isPopupCalculationMaterialWasOpened = true;
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
  const popupCalculationMaterialLinks = document.querySelectorAll('[data-modal-opener="calculation-material"]');

  if (materialsSection && popupCalculationMaterial) {
    materialsSection.addEventListener('click', (evt) => {
      evt.preventDefault();
      const materialLink = evt.target.closest('.material__link');

      if (!materialLink) {
        return;
      }

      openCalculationMaterialPopup(materialLink.dataset.type, materialLink.dataset.material);
    });
  }

  if (popupCalculationMaterial) {
    popupCalculationMaterialLinks.forEach((link) => {
      link.addEventListener('click', (evt) => {
        evt.preventDefault();
        openCalculationMaterialPopup(link.dataset.type, link.dataset.material);
      })
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
    loop: true,
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
        loop: true,
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
    loop: true,
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
    loop: true,
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
    }
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
    watchSlidesProgress: true,
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
    loop: true,
    navigation: {
      nextEl: ".n-news__arrow--next",
      prevEl: ".n-news__arrow--back",
    },
  });
};

const offersSection = document.querySelector('.offers');
if (offersSection) {
  const tabs = new Swiper('.offers .tabs__slider', {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    watchSlidesProgress: true,
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
        loop: false,
      },
    },
  });

  const slides = new Swiper('.offers__slider', {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    watchSlidesProgress: true,
    navigation: {
      nextEl: ".offers__button-next",
      prevEl: ".offers__button-prev",
    },
    autoplay: {
      delay: 6500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
      waitForTransition: true
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

const showroomGallery = document.querySelector('.showroom');
if(showroomGallery) {
  const showroomContainer = document.querySelector('.showroom__swiper');
  let swiper = new Swiper(".showroom__swiper", {
    slidesPerView: 'auto',
    loop: true,
    freeMode: true,
    speed: 3000,
    autoplay : {
      delay: 0,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
      waitForTransition: true
    },
    navigation: {
      nextEl: ".showroom__arrow--next",
      prevEl: ".showroom__arrow--back",
    },
  });
  swiper.on('mouseEnter', function () {
    swiper.params.speed = 300;

  });

  swiper.on('autoplayResume', function () {
    swiper.params.speed = 3000;

  });
}

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

/* ------------ n-select ------------ */
const initSelect = (wrapper) => {
  const control = wrapper.querySelector('.n-select__control');
  const select = wrapper.querySelector('.n-select__select');
  const header = select.querySelector('.n-select__header');
  const list = select.querySelector('.n-select__list');
  const options = list.querySelectorAll('.n-select__option');

  control.value = '';

  // let changeEvent = new Event('change', { bubbles: true });

  let listMaxHeight = false;

  const setListMaxHeight = () => {
    if (listMaxHeight) {
      return;
    }

    list.style.maxHeight = `${list.children[0].offsetHeight * list.dataset.maxHeight}px`;
    listMaxHeight = true;
  };

  select.addEventListener('keydown',  setListMaxHeight, {once: true});
  select.addEventListener('click', setListMaxHeight, {once: true});

  let currentOptionIndex = 0;

  const getNextOptionIndex = () => {
    return (currentOptionIndex + 1) % control.children.length;
  };

  const getPrevOptionIndex = () => {
    return (currentOptionIndex - 1 < 0) ? control.children.length - 1 : currentOptionIndex - 1;
  };

  const changeValue = (index) => {
    if (control.value === control.children[index].value) {
      return;
    }

    control.children[index].selected = true;
    control.dispatchEvent(changeEvent);
  };

  const highlightSelectedOption = () => {
    options.forEach((option) => {
      option.classList.remove('n-select__option--selected');
    });

    if (control.value === '') {
      header.textContent = header.dataset.text;
      header.classList.remove('n-select__header--selected');
      list.scrollTop = 0;
      return;
    }

    header.classList.add('n-select__header--selected');

    list.children[currentOptionIndex].classList.add('n-select__option--selected');
    header.textContent = control.children[currentOptionIndex].textContent;

    if (list.children[currentOptionIndex].offsetTop + list.children[currentOptionIndex].offsetHeight > list.offsetHeight + list.scrollTop) {
      list.scrollTop = list.children[currentOptionIndex].offsetTop + list.children[currentOptionIndex].offsetHeight - list.offsetHeight;
    } else if (list.scrollTop > list.children[currentOptionIndex].offsetTop) {
      list.scrollTop = list.children[currentOptionIndex].offsetTop;
    }
  };

  select.addEventListener('keydown', (evt) => {
    switch (evt.code) {
      case Key.RIGHT:
      case Key.DOWN:
        evt.preventDefault();
        changeValue(getNextOptionIndex());
        break;
      case Key.UP:
      case Key.LEFT:
        evt.preventDefault();
        changeValue(getPrevOptionIndex());
        break;
      case Key.SPACE:
      case Key.ENTER:
        evt.preventDefault();
        select.classList.toggle('n-select__select--open');
        break;
    }
  });

  select.addEventListener('click', ({target}) => {
    const option = target.closest('.n-select__option');

    if (option) {
      changeValue(option.dataset.index);
    }

    select.classList.toggle('n-select__select--open');
  });

  select.addEventListener('blur', () => {
    select.classList.remove('n-select__select--open');
  });

  control.addEventListener('change', () => {
    if (control.value) {
      currentOptionIndex = +control.querySelector(`option[value="${control.value}"]`).dataset.index;
    } else {
      currentOptionIndex = 0;
    }
    highlightSelectedOption();
  });
};

document.querySelectorAll('.n-select').forEach(initSelect);

/* ------------ */
// const UPLOAD_URL = 'https://echo.htmlacademy.ru/courses';
let UPLOAD_URL = 'https://echo.htmlacademy.ru/courses';

const sendData = (onSuccess, onFail, body) => {
  fetch(UPLOAD_URL, {
    method: 'POST',
    body,
  })
    .then((response) => {
      if(response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

/* ------------ custom-form-2--calculation ------------ */

const initCalculationForms = (form) => {
  const CENTIMETERS_IN_1_SQUARE_METER = 10000;

  const lengthField = form.querySelector('[name="length"]');
  const widthField = form.querySelector('[name="width"]');
  const areaField = form.querySelector('[name="area"]');
  const materialField = form.querySelector('[name="material"]')
  const formResult = form.querySelector('.form__result');

  const isAreaFieldFiled = () => {
    return !!+areaField.value;
  };

  const calcArea = () => {
    return +lengthField.value * +widthField.value / CENTIMETERS_IN_1_SQUARE_METER;
  }

  const setArea = () => {
    areaField.value = calcArea();
    formResult.classList.toggle('form__result--hidden', (!(isAreaFieldFiled() && materialField.value)));
  }

  const resetField = (field) => {
    field.value = '';
  }

  lengthField.addEventListener('input', setArea);
  widthField.addEventListener('input', setArea);
  areaField.addEventListener('input', () => {
    resetField(lengthField);
    resetField(widthField);
    formResult.classList.toggle('form__result--hidden', (!(isAreaFieldFiled() && materialField.value)));
  });

  materialField.addEventListener('change', () => {
    formResult.classList.toggle('form__result--hidden', (!(isAreaFieldFiled() && materialField.value)));
  });

  const formWrapper = form.closest('.custom-form-2--calculation');
  const formSubmit = form.querySelector('.form__submit');

  const onSuccess = () => {
    formWrapper.classList.remove('custom-form-2--notice--error');
    formWrapper.classList.add('custom-form-2--notice--success');
    formSubmit.classList.remove('loader');
  };

  const onFail = () => {
    formWrapper.classList.remove('custom-form-2--notice--success');
    formWrapper.classList.add('custom-form-2--notice--error');
    formSubmit.classList.remove('loader');
  };

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    formSubmit.classList.add('loader');

    // Имитация успешной (или нет) отправки формы
    UPLOAD_URL = Math.random() > 0.5 ? 'https://echo.htmlacademy.ru/courses' : 'error';

    setTimeout(() => {
      sendData(
        () => onSuccess(),
        () => onFail(),
        new FormData(evt.target)
      );
    }, 1000)
  });
};

document.querySelectorAll('.custom-form-2--calculation .form__body').forEach(initCalculationForms);

/* ------------ */



const materialsSlider = new Swiper('.materials-slider', {
  slidesPerView: 1,
  cssMode: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  speed: 0,
  watchSlidesProgress: true
});

/* ------------ Связь селекта и слайдера ------------ */

const initCalculationMaterialSection = (section) => {
  const materialSelect = section.querySelector('select[name="material"]');

  materialSelect.addEventListener('change', () => {
    let currentOptionIndex;

    if (materialSelect.value) {
      currentOptionIndex = materialSelect.querySelector(`[value="${materialSelect.value}"]`).dataset.index;
    }

    materialsSlider.slideTo(currentOptionIndex, 0);
  });

  materialsSlider.on('realIndexChange', () => {
    const value = materialSelect.querySelector(`option[data-index="${materialsSlider.realIndex}"]`).value;

    if (materialSelect.value === value) {
      return;
    }

    materialSelect.value = value;
    materialSelect.dispatchEvent(changeEvent);
  });
};

document.querySelectorAll('.calculation-material').forEach(initCalculationMaterialSection);

/* ------------ */

/* ------------ n-banner img parallax ------------ */

const initBannerParallaxImg = (img) => {
  const imgWrapper = img.parentNode;

  const shiftImg = () => {
    const imgScrollRange = img.offsetHeight - imgWrapper.offsetHeight;

    if (imgScrollRange <= 0) {
      return;
    }

    const distanceFromTheTopOfThePage = imgWrapper.getBoundingClientRect().bottom + window.pageYOffset;
    const imgScrollСoefficient = imgScrollRange / distanceFromTheTopOfThePage;
    let transformY = window.pageYOffset * imgScrollСoefficient;

    if (transformY <= 0) {
      transformY = 0;
    } else if (transformY >= imgScrollRange) {
      transformY = imgScrollRange;
    }

    img.style.transform = `translate(-50%, -${transformY}px)`;
  };

  document.addEventListener('scroll', shiftImg);
};

document.querySelectorAll('.n-banner--parallax-bg .n-banner__img').forEach(initBannerParallaxImg);

/* ------------ */

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJuZXcuanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgcG9wdXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBvcHVwJyk7XG5cbmNvbnN0IGNoYW5nZUV2ZW50ID0gbmV3IEV2ZW50KCdjaGFuZ2UnLCB7IGJ1YmJsZXM6IHRydWUgfSk7XG5cbmNvbnN0IEtleSA9IE9iamVjdC5mcmVlemUoe1xuICBFU0NBUEU6ICdFc2NhcGUnLFxuICBFU0M6ICdFc2MnLFxuICBVUDogJ0Fycm93VXAnLFxuICBSSUdIVDogJ0Fycm93UmlnaHQnLFxuICBET1dOOiAnQXJyb3dEb3duJyxcbiAgTEVGVDogJ0Fycm93TGVmdCcsXG4gIFNQQUNFOiAnU3BhY2UnLFxuICBFTlRFUjogJ0VudGVyJ1xufSk7XG5cbmxldCBpc1BvcHVwQ2FsY3VsYXRpb25NYXRlcmlhbFdhc09wZW5lZCA9IGZhbHNlO1xuXG5pZiAocG9wdXBzKSB7XG5cbiAgY29uc3QgaXNFc2NFdmVudCA9IChldnQpID0+IHtcbiAgICByZXR1cm4gZXZ0LmtleSA9PT0gS2V5LkVTQ0FQRSB8fCBldnQua2V5ID09PSBLZXkuRVNDO1xuICB9O1xuXG4gIGxldCBib2R5V2lkdGggPSBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoO1xuICBsZXQgY3VycmVudFBvcHVwO1xuXG4gIGNvbnN0IG9wZW5Qb3B1cCA9IChwb3B1cCkgPT4ge1xuICAgIGJvZHlXaWR0aCA9IGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGg7XG5cbiAgICBwb3B1cC5jbGFzc0xpc3QuYWRkKCdwb3B1cC0tb3BlbicpO1xuICAgIGN1cnJlbnRQb3B1cCA9IHBvcHVwO1xuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnbm8tc2Nyb2xsJyk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIG9uUG9wdXBFc2NLZXlkb3duKTtcblxuICAgIGlmIChkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoID4gYm9keVdpZHRoKSB7XG4gICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLnBhZGRpbmdSaWdodCA9IGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGggLSBib2R5V2lkdGggKyAncHgnO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBvcGVuQ2FsY3VsYXRpb25NYXRlcmlhbFBvcHVwID0gKHR5cGUsIG1hdGVyaWFsKSA9PiB7XG4gICAgYm9keVdpZHRoID0gZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aDtcblxuICAgIGNvbnN0IHBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwLS1jYWxjdWxhdGlvbi1tYXRlcmlhbCcpO1xuICAgIHBvcHVwLnF1ZXJ5U2VsZWN0b3IoJ2Zvcm0nKS5yZXNldCgpO1xuXG4gICAgY29uc3QgZm9ybVJlc3VsdCA9IHBvcHVwLnF1ZXJ5U2VsZWN0b3IoJy5jYWxjdWxhdGlvbi1mb3JtIC5mb3JtX19yZXN1bHQnKTtcbiAgICBjb25zdCB0eXBlU2VsZWN0ID0gcG9wdXAucXVlcnlTZWxlY3RvcignLmNhbGN1bGF0aW9uLWZvcm0gc2VsZWN0W25hbWU9XCJ0eXBlXCJdJyk7XG4gICAgY29uc3QgbWF0ZXJpYWxTZWxlY3QgPSBwb3B1cC5xdWVyeVNlbGVjdG9yKCcuY2FsY3VsYXRpb24tZm9ybSBzZWxlY3RbbmFtZT1cIm1hdGVyaWFsXCJdJyk7XG5cbiAgICBmb3JtUmVzdWx0LmNsYXNzTGlzdC5hZGQoJ2Zvcm1fX3Jlc3VsdC0taGlkZGVuJyk7XG5cbiAgICB0eXBlU2VsZWN0LnZhbHVlID0gdHlwZSA/IHR5cGUgOiAnJztcbiAgICB0eXBlU2VsZWN0LmRpc3BhdGNoRXZlbnQoY2hhbmdlRXZlbnQpO1xuXG4gICAgbWF0ZXJpYWxTZWxlY3QudmFsdWUgPSBtYXRlcmlhbCA/IG1hdGVyaWFsIDogJyc7XG5cbiAgICBwb3B1cC5jbGFzc0xpc3QuYWRkKCdwb3B1cC0tb3BlbicpO1xuICAgIGN1cnJlbnRQb3B1cCA9IHBvcHVwO1xuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnbm8tc2Nyb2xsJyk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIG9uUG9wdXBFc2NLZXlkb3duKTtcblxuICAgIGlmIChkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoID4gYm9keVdpZHRoKSB7XG4gICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLnBhZGRpbmdSaWdodCA9IGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGggLSBib2R5V2lkdGggKyAncHgnO1xuICAgIH1cblxuXG4gICAgbWF0ZXJpYWxTZWxlY3QuZGlzcGF0Y2hFdmVudChjaGFuZ2VFdmVudCk7XG5cbiAgICBpZighaXNQb3B1cENhbGN1bGF0aW9uTWF0ZXJpYWxXYXNPcGVuZWQpIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBtYXRlcmlhbFNlbGVjdC5kaXNwYXRjaEV2ZW50KGNoYW5nZUV2ZW50KTtcbiAgICAgIH0sIDUwKVxuICAgIH1cblxuICAgIGlzUG9wdXBDYWxjdWxhdGlvbk1hdGVyaWFsV2FzT3BlbmVkID0gdHJ1ZTtcbiAgfTtcblxuICBjb25zdCBjbG9zZVBvcHVwID0gKHBvcHVwKSA9PiB7XG4gICAgcG9wdXAuY2xhc3NMaXN0LnJlbW92ZSgncG9wdXAtLW9wZW4nKTtcbiAgICBjdXJyZW50UG9wdXAgPSBudWxsO1xuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnbm8tc2Nyb2xsJyk7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIG9uUG9wdXBFc2NLZXlkb3duKTtcblxuICAgIGRvY3VtZW50LmJvZHkuc3R5bGUucGFkZGluZ1JpZ2h0ID0gJzAnO1xuICB9O1xuXG4gIGNvbnN0IG9uUG9wdXBFc2NLZXlkb3duID0gKGV2dCkgPT4ge1xuICAgIGlmIChpc0VzY0V2ZW50KGV2dCkpIHtcbiAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgY2xvc2VQb3B1cChjdXJyZW50UG9wdXApO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBwb3B1cFJlcXVlc3RPcGVuQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ1dHRvbi0tcG9wdXAtLXJlcXVlc3QnKTtcbiAgY29uc3QgcG9wdXBSZXF1ZXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwLS1yZXF1ZXN0Jyk7XG5cbiAgaWYgKHBvcHVwUmVxdWVzdE9wZW5CdXR0b24gJiYgcG9wdXBSZXF1ZXN0KSB7XG4gICAgcG9wdXBSZXF1ZXN0T3BlbkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldnQpID0+IHtcbiAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgb3BlblBvcHVwKHBvcHVwUmVxdWVzdCk7XG4gICAgfSk7XG4gIH1cblxuICBjb25zdCBwb3B1cFJlcG9ydENvbXBldGl0b3JPcGVuQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ1dHRvbi0tcG9wdXAtLXJlcG9ydC1jb21wZXRpdG9yJyk7XG4gIGNvbnN0IHBvcHVwUmVwb3J0Q29tcGV0aXRvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cC0tcmVwb3J0LWNvbXBldGl0b3InKTtcblxuICBpZiAocG9wdXBSZXBvcnRDb21wZXRpdG9yT3BlbkJ1dHRvbiAmJiBwb3B1cFJlcG9ydENvbXBldGl0b3IpIHtcbiAgICBwb3B1cFJlcG9ydENvbXBldGl0b3JPcGVuQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2dCkgPT4ge1xuICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBvcGVuUG9wdXAocG9wdXBSZXBvcnRDb21wZXRpdG9yKTtcbiAgICB9KTtcbiAgfVxuXG4gIGNvbnN0IHBvcHVwT3JkZXJTYW1wbGVPcGVuQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ1dHRvbi0tcG9wdXAtLW9yZGVyLXNhbXBsZScpO1xuICBjb25zdCBwb3B1cE9yZGVyU2FtcGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwLS1vcmRlci1zYW1wbGUnKTtcblxuICBpZiAocG9wdXBPcmRlclNhbXBsZU9wZW5CdXR0b24gJiYgcG9wdXBPcmRlclNhbXBsZSkge1xuICAgIHBvcHVwT3JkZXJTYW1wbGVPcGVuQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2dCkgPT4ge1xuICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBvcGVuUG9wdXAocG9wdXBPcmRlclNhbXBsZSk7XG4gICAgfSk7XG4gIH1cblxuICBjb25zdCBwb3B1cFF1aWNrT3JkZXJPcGVuQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ1dHRvbi0tcG9wdXAtLXF1aWNrLW9yZGVyJyk7XG4gIGNvbnN0IHB1cHVRdWlja3BPcmRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cC0tcXVpY2stb3JkZXInKTtcblxuICBpZiAocG9wdXBRdWlja09yZGVyT3BlbkJ1dHRvbiAmJiBwdXB1UXVpY2twT3JkZXIpIHtcbiAgICBwb3B1cFF1aWNrT3JkZXJPcGVuQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2dCkgPT4ge1xuICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBvcGVuUG9wdXAocHVwdVF1aWNrcE9yZGVyKTtcbiAgICB9KTtcbiAgfVxuXG4gIGNvbnN0IG1hdGVyaWFsc1NlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWF0ZXJpYWxzJyk7XG4gIGNvbnN0IHBvcHVwQ2FsY3VsYXRpb25NYXRlcmlhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cC0tY2FsY3VsYXRpb24tbWF0ZXJpYWwnKTtcbiAgY29uc3QgcG9wdXBDYWxjdWxhdGlvbk1hdGVyaWFsTGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1tb2RhbC1vcGVuZXI9XCJjYWxjdWxhdGlvbi1tYXRlcmlhbFwiXScpO1xuXG4gIGlmIChtYXRlcmlhbHNTZWN0aW9uICYmIHBvcHVwQ2FsY3VsYXRpb25NYXRlcmlhbCkge1xuICAgIG1hdGVyaWFsc1NlY3Rpb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZ0KSA9PiB7XG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGNvbnN0IG1hdGVyaWFsTGluayA9IGV2dC50YXJnZXQuY2xvc2VzdCgnLm1hdGVyaWFsX19saW5rJyk7XG5cbiAgICAgIGlmICghbWF0ZXJpYWxMaW5rKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgb3BlbkNhbGN1bGF0aW9uTWF0ZXJpYWxQb3B1cChtYXRlcmlhbExpbmsuZGF0YXNldC50eXBlLCBtYXRlcmlhbExpbmsuZGF0YXNldC5tYXRlcmlhbCk7XG4gICAgfSk7XG4gIH1cblxuICBpZiAocG9wdXBDYWxjdWxhdGlvbk1hdGVyaWFsKSB7XG4gICAgcG9wdXBDYWxjdWxhdGlvbk1hdGVyaWFsTGlua3MuZm9yRWFjaCgobGluaykgPT4ge1xuICAgICAgbGluay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldnQpID0+IHtcbiAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIG9wZW5DYWxjdWxhdGlvbk1hdGVyaWFsUG9wdXAobGluay5kYXRhc2V0LnR5cGUsIGxpbmsuZGF0YXNldC5tYXRlcmlhbCk7XG4gICAgICB9KVxuICAgIH0pO1xuICB9XG5cbiAgY29uc3QgcG9wdXBHb29kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwLS1nb29kJyk7XG5cbiAgaWYgKHBvcHVwR29vZCkge1xuICAgIG9wZW5Qb3B1cChwb3B1cEdvb2QpO1xuICB9XG5cbiAgcG9wdXBzLmZvckVhY2goKHBvcHVwKSA9PiB7XG4gICAgY29uc3QgcG9wdXBDbG9zZUJ1dHRvbiA9IHBvcHVwLnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cF9fY2xvc2UnKVxuICAgIHBvcHVwQ2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZVBvcHVwLmJpbmQobnVsbCwgcG9wdXApKTtcbiAgfSk7XG59XG5cbmNvbnN0IGxpa2VCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmxpa2UnKTtcblxuaWYgKGxpa2VCdXR0b25zKSB7XG4gIGxpa2VCdXR0b25zLmZvckVhY2goKGxpa2VCdXR0b24pID0+IHtcbiAgICBsaWtlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgbGlrZUJ1dHRvbi5jbGFzc0xpc3QudG9nZ2xlKCdsaWtlLS1hY3RpdmUnKTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmNvbnN0IGNsaXBib3hlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jbGlwYm94Jyk7XG5cbmlmIChjbGlwYm94ZXMpIHtcbiAgbGV0IHdpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG5cbiAgY29uc3Qgc2V0Q2xpcGJveE1vZGUgPSAoY2xpcGJveCkgPT4ge1xuICAgIGNvbnN0IGNvbnRlbnQgPSBjbGlwYm94LnF1ZXJ5U2VsZWN0b3IoJy5jbGlwYm94X19jb250ZW50Jyk7XG5cbiAgICBpZiAoY2xpcGJveC5jbGFzc0xpc3QuY29udGFpbnMoJ2NsaXBib3gtLWV4cGFuZGVkJykpIHtcbiAgICAgIGlmIChjb250ZW50Lm9mZnNldEhlaWdodCA8PSBwYXJzZUludChnZXRDb21wdXRlZFN0eWxlKGNsaXBib3gpLmdldFByb3BlcnR5VmFsdWUoJy0tbWF4LWhlaWdodCcpLCAxMCkpIHtcbiAgICAgICAgY2xpcGJveC5jbGFzc0xpc3QucmVtb3ZlKCdjbGlwYm94LS1leHBhbmRlZCcpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoY2xpcGJveC5jbGFzc0xpc3QuY29udGFpbnMoJ2NsaXBib3gtLXJlZHVjZWQnKSkge1xuICAgICAgY2xpcGJveC5jbGFzc0xpc3QucmVtb3ZlKCdjbGlwYm94LS1yZWR1Y2VkJyk7XG4gICAgICBpZiAoY29udGVudC5vZmZzZXRIZWlnaHQgPiBwYXJzZUludChnZXRDb21wdXRlZFN0eWxlKGNsaXBib3gpLmdldFByb3BlcnR5VmFsdWUoJy0tbWF4LWhlaWdodCcpLCAxMCkpIHtcbiAgICAgICAgY2xpcGJveC5jbGFzc0xpc3QuYWRkKCdjbGlwYm94LS1yZWR1Y2VkJyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChjb250ZW50Lm9mZnNldEhlaWdodCA+IHBhcnNlSW50KGdldENvbXB1dGVkU3R5bGUoY2xpcGJveCkuZ2V0UHJvcGVydHlWYWx1ZSgnLS1tYXgtaGVpZ2h0JyksIDEwKSkge1xuICAgICAgICBjbGlwYm94LmNsYXNzTGlzdC5hZGQoJ2NsaXBib3gtLXJlZHVjZWQnKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY2xpcGJveGVzLmZvckVhY2goKGNsaXBib3gpID0+IHtcbiAgICBjbGlwYm94LnF1ZXJ5U2VsZWN0b3IoJy5jbGlwYm94X190b2dnbGVyJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBjbGlwYm94LmNsYXNzTGlzdC50b2dnbGUoJ2NsaXBib3gtLXJlZHVjZWQnKTtcbiAgICAgIGNsaXBib3guY2xhc3NMaXN0LnRvZ2dsZSgnY2xpcGJveC0tZXhwYW5kZWQnKTtcbiAgICB9KTtcblxuICAgIHNldENsaXBib3hNb2RlKGNsaXBib3gpO1xuICB9KTtcblxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCkgPT4ge1xuICAgIGlmICh3aW5kb3dXaWR0aCA9PT0gd2luZG93LmlubmVyV2lkdGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB3aW5kb3dXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuXG4gICAgY2xpcGJveGVzLmZvckVhY2goKGNsaXBib3gpID0+IHtcbiAgICAgIHNldENsaXBib3hNb2RlKGNsaXBib3gpO1xuICAgIH0pO1xuICB9KTtcbn1cblxuY29uc3Qgd29ya3NHYWxsZXJ5U2xpZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndvcmtzLWdhbGxlcnlfX3NsaWRlcicpO1xuXG5pZiAod29ya3NHYWxsZXJ5U2xpZGVyKSB7XG4gIGxldCBzd2lwZXIgPSBuZXcgU3dpcGVyKFwiLndvcmtzLWdhbGxlcnlfX3NsaWRlclwiLCB7XG4gICAgc2xpZGVzUGVyVmlldzogJ2F1dG8nLFxuICAgIHNwYWNlQmV0d2VlbjogNSxcbiAgICBmcmVlTW9kZTogdHJ1ZSxcbiAgICBuYXZpZ2F0aW9uOiB7XG4gICAgICBuZXh0RWw6IFwiLndvcmtzLWdhbGxlcnlfX3NsaWRlciAuc3dpcGVyLWJ1dHRvbi1uZXh0XCIsXG4gICAgICBwcmV2RWw6IFwiLndvcmtzLWdhbGxlcnlfX3NsaWRlciAuc3dpcGVyLWJ1dHRvbi1wcmV2XCIsXG4gICAgfSxcbiAgICBicmVha3BvaW50czoge1xuICAgICAgNzY4OiB7XG4gICAgICAgIHNwYWNlQmV0d2VlbjogMTksXG4gICAgICB9LFxuICAgICAgMTUxMDoge1xuICAgICAgICBzcGFjZUJldHdlZW46IDEwLFxuICAgICAgfSxcbiAgICB9LFxuICB9KTtcbn1cblxuY29uc3QgZ29vZEluZm9UYWJlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nb29kLWluZm9fX3RhYmVyJyk7XG5cbmlmIChnb29kSW5mb1RhYmVyKSB7XG4gIGNvbnN0IHN3aXBlciA9IG5ldyBTd2lwZXIoXCIuZ29vZC1pbmZvX190YWItYnV0dG9ucy13cmFwcGVyXCIsIHtcbiAgICBzbGlkZXNQZXJWaWV3OiAnYXV0bycsXG4gICAgZnJlZU1vZGU6IHRydWVcbiAgfSk7XG5cbiAgY29uc3QgdGFiTGlua3MgPSBnb29kSW5mb1RhYmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5nb29kLWluZm9fX3RhYi1idXR0b25zLWxpbmsnKTtcbiAgY29uc3QgdGFicyA9IGdvb2RJbmZvVGFiZXIucXVlcnlTZWxlY3RvckFsbCgnLmdvb2QtaW5mb19fdGFicy1pdGVtJyk7XG5cbiAgbGV0IGN1cnJlbnRUYWJMaW5rID0gdGFiTGlua3NbMF07XG4gIGxldCBjdXJyZW50VGFiID0gdGFic1swXTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHRhYkxpbmtzLmxlbmd0aDsgaSsrKSB7XG4gICAgdGFiTGlua3NbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZ0KSA9PiB7XG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgY3VycmVudFRhYi5jbGFzc0xpc3QucmVtb3ZlKCdnb29kLWluZm9fX3RhYnMtaXRlbS0tY3VycmVudCcpO1xuICAgICAgY3VycmVudFRhYiA9IHRhYnNbaV07XG4gICAgICBjdXJyZW50VGFiLmNsYXNzTGlzdC5hZGQoJ2dvb2QtaW5mb19fdGFicy1pdGVtLS1jdXJyZW50Jyk7XG5cbiAgICAgIGN1cnJlbnRUYWJMaW5rLnBhcmVudE5vZGUuY2xhc3NMaXN0LnJlbW92ZSgnZ29vZC1pbmZvX190YWItYnV0dG9ucy1pdGVtLS1jdXJyZW50Jyk7XG4gICAgICBjdXJyZW50VGFiTGluayA9IHRhYkxpbmtzW2ldO1xuICAgICAgY3VycmVudFRhYkxpbmsucGFyZW50Tm9kZS5jbGFzc0xpc3QuYWRkKCdnb29kLWluZm9fX3RhYi1idXR0b25zLWl0ZW0tLWN1cnJlbnQnKTtcbiAgICB9KTtcbiAgfVxufVxuXG5jb25zdCBnb29kUmV2aWV3cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nb29kLXJldmlld3MnKTtcblxuaWYgKGdvb2RSZXZpZXdzKSB7XG4gIGNvbnN0IHJldmlld0Zvcm0gPSBnb29kUmV2aWV3cy5xdWVyeVNlbGVjdG9yKCcuZ29vZC1yZXZpZXdzX19mb3JtJyk7XG4gIGNvbnN0IHJldmlld0Zvcm1TaG93QnV0dG9uV3JhcHBlciA9IGdvb2RSZXZpZXdzLnF1ZXJ5U2VsZWN0b3IoJy5nb29kLXJldmlld3NfX2J1dHRvbi13cmFwcGVyJyk7XG4gIGNvbnN0IHJldmlld0Zvcm1TaG93QnV0dG9uID0gZ29vZFJldmlld3MucXVlcnlTZWxlY3RvcignLmdvb2QtcmV2aWV3c19fYnV0dG9uJyk7XG4gIGNvbnN0IHJldmlld0Zvcm1IaWRlQnV0dG9uID0gZ29vZFJldmlld3MucXVlcnlTZWxlY3RvcignLmdvb2QtcmV2aWV3c19fY2FuY2VsJyk7XG5cbiAgaWYgKHJldmlld0Zvcm1TaG93QnV0dG9uV3JhcHBlciAmJiByZXZpZXdGb3JtU2hvd0J1dHRvbikge1xuICAgIHJldmlld0Zvcm1TaG93QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2dCkgPT4ge1xuICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICByZXZpZXdGb3JtLmNsYXNzTGlzdC5yZW1vdmUoJ2dvb2QtcmV2aWV3c19fZm9ybS0taGlkZGVuJyk7XG4gICAgICByZXZpZXdGb3JtU2hvd0J1dHRvbldyYXBwZXIuY2xhc3NMaXN0LmFkZCgnZ29vZC1yZXZpZXdzX19idXR0b24td3JhcHBlci0taGlkZGVuJyk7XG4gICAgfSk7XG4gIH1cblxuICBpZiAocmV2aWV3Rm9ybSAmJiByZXZpZXdGb3JtSGlkZUJ1dHRvbikge1xuICAgIHJldmlld0Zvcm1IaWRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgcmV2aWV3Rm9ybS5jbGFzc0xpc3QuYWRkKCdnb29kLXJldmlld3NfX2Zvcm0tLWhpZGRlbicpO1xuICAgICAgcmV2aWV3Rm9ybVNob3dCdXR0b25XcmFwcGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2dvb2QtcmV2aWV3c19fYnV0dG9uLXdyYXBwZXItLWhpZGRlbicpO1xuICAgIH0pO1xuICB9XG59XG5cbmNvbnN0IHJhZGlvc2VsZWN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zZWxlY3QtMicpO1xuXG5pZiAocmFkaW9zZWxlY3RzKSB7XG4gIHJhZGlvc2VsZWN0cy5mb3JFYWNoKChyYWRpb3NlbGVjdCkgPT4ge1xuICAgIGNvbnN0IHJhZGlvc2VsZWN0QnV0dG9uID0gcmFkaW9zZWxlY3QucXVlcnlTZWxlY3RvcignLnNlbGVjdC0yX19idXR0b24nKTtcbiAgICBjb25zdCByYWRpb2J1dHRvbiA9IHJhZGlvc2VsZWN0LnF1ZXJ5U2VsZWN0b3IoJy5zZWxlY3QtMl9fcmFkaW9idXR0b24nKTtcblxuICAgIGNvbnN0IGNoZWNrQ2xpY2tPdXQgPSAoZXZ0KSA9PiB7XG4gICAgICBpZiAoIWV2dC50YXJnZXQuY2xvc2VzdCgnLnNlbGVjdC0yJykpIHtcbiAgICAgICAgY2xvc2VSYWRpb1NlbGVjdCgpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBvcGVuUmFkaW9TZWxlY3QgPSAoKSA9PiB7XG4gICAgICByYWRpb3NlbGVjdC5jbGFzc0xpc3QuYWRkKCdzZWxlY3QtMi0tb3BlbicpO1xuICAgICAgcmFkaW9idXR0b24uZm9jdXMoKTtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNoZWNrQ2xpY2tPdXQpO1xuICAgIH07XG5cbiAgICBjb25zdCBjbG9zZVJhZGlvU2VsZWN0ID0gKCkgPT4ge1xuICAgICAgcmFkaW9zZWxlY3QuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0LTItLW9wZW4nKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGNoZWNrQ2xpY2tPdXQpO1xuICAgIH07XG5cbiAgICByYWRpb3NlbGVjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGlmICghcmFkaW9zZWxlY3QuY2xhc3NMaXN0LmNvbnRhaW5zKCdzZWxlY3QtMi0tb3BlbicpKSB7XG4gICAgICAgIG9wZW5SYWRpb1NlbGVjdCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2xvc2VSYWRpb1NlbGVjdCgpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgcmFkaW9zZWxlY3RPcHRpb25zV3JhcHBlciA9IHJhZGlvc2VsZWN0LnF1ZXJ5U2VsZWN0b3IoJy5zZWxlY3QtMl9fb3B0aW9ucycpO1xuXG4gICAgY29uc3QgcmFkaW9zZWxlY3RCdXR0b25WYWx1ZSA9IHJhZGlvc2VsZWN0QnV0dG9uLnF1ZXJ5U2VsZWN0b3IoJy5zZWxlY3QtMl9fYnV0dG9uLXZhbHVlJyk7XG5cbiAgICByYWRpb3NlbGVjdE9wdGlvbnNXcmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2dCkgPT4ge1xuICAgICAgaWYgKGV2dC50YXJnZXQuY2xhc3NOYW1lID09PSAnc2VsZWN0LTJfX3JhZGlvYnV0dG9uLWxhYmVsJykge1xuICAgICAgICBjbG9zZVJhZGlvU2VsZWN0KCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCByYWRpb2J1dHRvbnMgPSByYWRpb3NlbGVjdC5xdWVyeVNlbGVjdG9yQWxsKCcuc2VsZWN0LTJfX3JhZGlvYnV0dG9uJyk7XG5cbiAgICByYWRpb2J1dHRvbnMuZm9yRWFjaCgocmFkaW9idXR0b24pID0+IHtcbiAgICAgIHJhZGlvYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICAgICAgcmFkaW9zZWxlY3RCdXR0b25WYWx1ZS50ZXh0Q29udGVudCA9IHJhZGlvYnV0dG9uLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcignLnNlbGVjdC0yX19yYWRpb2J1dHRvbi1sYWJlbCcpLnRleHRDb250ZW50O1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG5jb25zdCBnb29kUXVhbnRpdHlBbHRlck5vZGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdvb2RzLXF1YW50aXR5LS1hbHRlciwgLmdvb2RzLXF1YW50aXR5LS1hbHRlci0yJyk7XG5cbmlmIChnb29kUXVhbnRpdHlBbHRlck5vZGVzKSB7XG4gIGdvb2RRdWFudGl0eUFsdGVyTm9kZXMuZm9yRWFjaCgoZ29vZFF1YW50aXR5KSA9PiB7XG4gICAgY29uc3QgdG9nZ2xlciA9IGdvb2RRdWFudGl0eS5xdWVyeVNlbGVjdG9yKCcuZ29vZHMtcXVhbnRpdHlfX3NlbGVjdC1idXR0b24nKTtcbiAgICBjb25zdCByYWRpb2J1dHRvbnNXcmFwcGVyID0gZ29vZFF1YW50aXR5LnF1ZXJ5U2VsZWN0b3IoJy5nb29kcy1xdWFudGl0eV9fcmFkaW9idXR0b25zJyk7XG4gICAgY29uc3QgcmFkaW9idXR0b24gPSByYWRpb2J1dHRvbnNXcmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJy5yYWRpb2J1dHRvbl9fY29udHJvbCcpO1xuXG4gICAgY29uc3QgY2hlY2tDbGlja091dCA9IChldnQpID0+IHtcbiAgICAgIGlmICghZXZ0LnRhcmdldC5jbG9zZXN0KCcuZ29vZHMtcXVhbnRpdHlfX3JhZGlvYnV0dG9ucycpKSB7XG4gICAgICAgIGhpZGVCdXR0b25zKCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IHNob3dCdXR0b25zID0gKCkgPT4ge1xuICAgICAgcmFkaW9idXR0b25zV3JhcHBlci5jbGFzc0xpc3QuYWRkKCdnb29kcy1xdWFudGl0eV9fcmFkaW9idXR0b25zLS1vcGVuJyk7XG4gICAgICByYWRpb2J1dHRvbi5mb2N1cygpO1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2hlY2tDbGlja091dCk7XG4gICAgfTtcblxuICAgIGNvbnN0IGhpZGVCdXR0b25zID0gKCkgPT4ge1xuICAgICAgcmFkaW9idXR0b25zV3JhcHBlci5jbGFzc0xpc3QucmVtb3ZlKCdnb29kcy1xdWFudGl0eV9fcmFkaW9idXR0b25zLS1vcGVuJyk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjaGVja0NsaWNrT3V0KTtcbiAgICB9O1xuXG4gICAgdG9nZ2xlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGlmICghcmFkaW9idXR0b25zV3JhcHBlci5jbGFzc0xpc3QuY29udGFpbnMoJ2dvb2RzLXF1YW50aXR5X19yYWRpb2J1dHRvbnMtLW9wZW4nKSkge1xuICAgICAgICBzaG93QnV0dG9ucygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaGlkZUJ1dHRvbnMoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJhZGlvYnV0dG9uc1dyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZ0KSA9PiB7XG4gICAgICBpZiAoZXZ0LnRhcmdldC5jbGFzc05hbWUgPT09ICdyYWRpb2J1dHRvbl9fbGFiZWwnKSB7XG4gICAgICAgIGhpZGVCdXR0b25zKCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCByYWRpb2J1dHRvbnMgPSByYWRpb2J1dHRvbnNXcmFwcGVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5yYWRpb2J1dHRvbl9fY29udHJvbCcpO1xuXG4gICAgcmFkaW9idXR0b25zLmZvckVhY2goKHJhZGlvYnV0dG9uKSA9PiB7XG4gICAgICByYWRpb2J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICAgIHRvZ2dsZXIudGV4dENvbnRlbnQgPSByYWRpb2J1dHRvbi5wYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3IoJy5yYWRpb2J1dHRvbl9fbGFiZWwnKS50ZXh0Q29udGVudC5zbGljZSgwLCAyKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn1cblxuY29uc3QgY292ZXJDYXJkV3JhcHBlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucy1wb3B1bGFyIC5jb250YWluZXInKTtcblxuaWYgKGNvdmVyQ2FyZFdyYXBwZXJzKSB7XG4gIGNvdmVyQ2FyZFdyYXBwZXJzLmZvckVhY2goKGNhcmRXcmFwcGVyKSA9PiB7XG4gICAgY29uc3QgY2FyZHMgPSBjYXJkV3JhcHBlci5xdWVyeVNlbGVjdG9yQWxsKCcuY2FyZCcpO1xuXG4gICAgY2FyZHMuZm9yRWFjaCgoY2FyZCkgPT4ge1xuICAgICAgY2FyZC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCAoKSA9PiB7XG4gICAgICAgIGNhcmRXcmFwcGVyLnN0eWxlLnpJbmRleCA9IDIwMDtcbiAgICAgIH0pO1xuXG4gICAgICBjYXJkLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgKCkgPT4ge1xuICAgICAgICBjYXJkV3JhcHBlci5zdHlsZS56SW5kZXggPSAnYXV0byc7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmNvbnN0IGdvb2RzRmlsdGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmMtZmlsdGVyJyk7XG5cbmlmIChnb29kc0ZpbHRlcikge1xuICBjb25zdCBXQUlUSU5HX0xJU1RfREVMQVlfVElNRSA9IDUwO1xuXG4gIGNvbnN0IGNoZWNrRmFsbGluZ091dCA9IChibG9jaykgPT4ge1xuICAgIHJldHVybiAoYmxvY2suZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkucmlnaHQgLSBnb29kc0ZpbHRlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5yaWdodCA+IDApO1xuICB9O1xuXG4gIGNvbnN0IG1vdmVMZWZ0ID0gKGJsb2NrKSA9PiB7XG4gICAgYmxvY2suc3R5bGUubGVmdCA9ICdhdXRvJztcbiAgfTtcblxuICBjb25zdCByZXNldFNoaWZ0ID0gKGJsb2NrKSA9PiB7XG4gICAgYmxvY2suc3R5bGUubGVmdCA9IDA7XG4gIH1cblxuICBjb25zdCBzZWxlY3RFbGVtZW50cyA9IGdvb2RzRmlsdGVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5mb3JtLXNlbGVjdCcpO1xuXG4gIHNlbGVjdEVsZW1lbnRzLmZvckVhY2goKHNlbGVjdCkgPT4ge1xuICAgIGNvbnN0IGJ1dHRvbiA9IHNlbGVjdC5xdWVyeVNlbGVjdG9yKCcuZm9ybS1zZWxlY3RfX2lucHV0Jyk7XG4gICAgY29uc3QgbGlzdCA9IHNlbGVjdC5xdWVyeVNlbGVjdG9yKCcuZm9ybS1zZWxlY3RfX2xpc3QnKTtcblxuICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGlmICghYnV0dG9uLmNsYXNzTGlzdC5jb250YWlucygnb3BlbicpKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGlmIChjaGVja0ZhbGxpbmdPdXQobGlzdCkpIHtcbiAgICAgICAgICAgIG1vdmVMZWZ0KGxpc3QpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgV0FJVElOR19MSVNUX0RFTEFZX1RJTUUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzZXRTaGlmdChsaXN0KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG5cbmNvbnN0IHNtYWxsQ3VzdG9tRm9ybXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY3VzdG9tLWZvcm0tLWNvbXBhY3QnKTtcblxuaWYgKHNtYWxsQ3VzdG9tRm9ybXMpIHtcbiAgc21hbGxDdXN0b21Gb3Jtcy5mb3JFYWNoKChmb3JtKSA9PiB7XG4gICAgY29uc3Qgc3VibWl0QnV0dG9uID0gZm9ybS5xdWVyeVNlbGVjdG9yKCcuZm9ybV9fYnV0dG9uLS1zdWJtaXQnKTtcbiAgICBzdWJtaXRCdXR0b24uc3R5bGUuZGlzcGxheSA9ICdub25lJztcblxuICAgIGNvbnN0IGlucHV0ID0gZm9ybS5xdWVyeVNlbGVjdG9yKCcuZm9ybV9fdGV4dGZpZWxkLWNvbnRyb2wnKTtcblxuICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKCkgPT4ge1xuICAgICAgaWYgKGlucHV0LnZhbHVlKSB7XG4gICAgICAgIHN1Ym1pdEJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ2dyaWQnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3VibWl0QnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG4gIGlmICh3aW5kb3cubG9jYXRpb24uaGFzaCA9PT0gJyNqcy1tb2RhbC1tZXNzYWdlJykge1xuICAgICQoJyNqcy1tb2RhbC1tZXNzYWdlJykuZmFkZUluKDUwMCksICQoXCJib2R5XCIpLmFwcGVuZCgnPGRpdiBjbGFzcz1cIm92ZXJsYXlcIiBpZD1cImpzLW92ZXJsYXlcIj48L2Rpdj4nKTtcbiAgICAkKFwiYm9keVwiKS5hZGRDbGFzcyhcIm9wZW5lZC1tb2RhbFwiKTtcbiAgfVxufSk7XG5cbmNvbnN0IGZpbGVVcGxvYWRDb250cm9sID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvcm1fX2ZpbGUtZmllbGQtY29udHJvbCcpO1xuXG5pZiAoZmlsZVVwbG9hZENvbnRyb2wpIHtcbiAgZmlsZVVwbG9hZENvbnRyb2wuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgIGZpbGVVcGxvYWRDb250cm9sLmNsYXNzTGlzdC50b2dnbGUoJ2Zvcm1fX2ZpbGUtZmllbGQtY29udHJvbC0tc2hvd24nLCBmaWxlVXBsb2FkQ29udHJvbC5maWxlc1swXSk7XG4gIH0pO1xufVxuXG5jb25zdCBjdXN0b21Gb3JtMkVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmN1c3RvbS1mb3JtLTInKTtcblxuaWYgKGN1c3RvbUZvcm0yRWxlbWVudHMpIHtcbiAgY29uc3QgdG9nZ2xlQWNjb3JkaW9uVmlldyA9IChldnQpID0+IHtcbiAgICBjb25zdCBhY2NvcmRpb25CdXR0b24gPSBldnQudGFyZ2V0LmNsb3Nlc3QoJy5mb3JtX19zZWN0aW9uLWhlYWRpbmctYnV0dG9uJyk7XG5cbiAgICBpZiAoIWFjY29yZGlvbkJ1dHRvbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGFjY29yZGlvbiA9IGFjY29yZGlvbkJ1dHRvbi5jbG9zZXN0KCcuZm9ybV9fc2VjdGlvbicpO1xuICAgIGFjY29yZGlvbi5jbGFzc0xpc3QudG9nZ2xlKCdmb3JtX19zZWN0aW9uLS1vcGVuJyk7XG4gIH07XG5cbiAgY3VzdG9tRm9ybTJFbGVtZW50cy5mb3JFYWNoKChmb3JtKSA9PiB7XG4gICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRvZ2dsZUFjY29yZGlvblZpZXcpO1xuICB9KTtcbn1cblxuY29uc3QgcHJvbW9jb2RlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jdXN0b20tZm9ybS0yLS1vcmRlciAuZm9ybV9fcHJvbW9jb2RlJyk7XG5jb25zdCBwcm9tb2NvZGVDYW5jZWxCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvbW9jb2RlX19jYW5jZWwtYnV0dG9uJyk7XG5jb25zdCBwcm9tb2NvZGVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtX190ZXh0ZmllbGQtY29udHJvbCcpO1xuY29uc3QgcHJvbW9jb2RlU2hvd0J1dHRvbjEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY3VzdG9tLWZvcm0tMi0tb3JkZXIgLmZvcm1fX2Zvb3Rlci1wcm9tby1idXR0b24nKTtcbmNvbnN0IHByb21vY29kZVNob3dCdXR0b24yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmN1c3RvbS1mb3JtLTItLW9yZGVyIC5mb3JtX19wcm9tb2NvZGUtYnV0dG9uJyk7XG5cbmlmIChwcm9tb2NvZGVFbGVtZW50ICYmIHByb21vY29kZVNob3dCdXR0b24xICYmIHByb21vY29kZVNob3dCdXR0b24yKSB7XG4gIHByb21vY29kZVNob3dCdXR0b24xLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2dCkgPT4ge1xuICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHByb21vY29kZVNob3dCdXR0b24xLmNsYXNzTGlzdC5hZGQoJ2Zvcm1fX2Zvb3Rlci1wcm9tby1idXR0b24tLWhpZGRlbicpO1xuICAgIHByb21vY29kZVNob3dCdXR0b24yLmNsYXNzTGlzdC5hZGQoJ2Zvcm1fX3Byb21vY29kZS1idXR0b24tLWhpZGRlbicpO1xuICAgIHByb21vY29kZUVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZm9ybV9fcHJvbW9jb2RlLS1zaG93Jyk7XG4gICAgcHJvbW9jb2RlSW5wdXQuZm9jdXMoKTtcbiAgfSk7XG59XG5cbmlmIChwcm9tb2NvZGVFbGVtZW50ICYmIHByb21vY29kZVNob3dCdXR0b24xICYmIHByb21vY29kZVNob3dCdXR0b24yKSB7XG4gIHByb21vY29kZVNob3dCdXR0b24yLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2dCkgPT4ge1xuICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHByb21vY29kZVNob3dCdXR0b24xLmNsYXNzTGlzdC5hZGQoJ2Zvcm1fX2Zvb3Rlci1wcm9tby1idXR0b24tLWhpZGRlbicpO1xuICAgIHByb21vY29kZVNob3dCdXR0b24yLmNsYXNzTGlzdC5hZGQoJ2Zvcm1fX3Byb21vY29kZS1idXR0b24tLWhpZGRlbicpO1xuICAgIHByb21vY29kZUVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZm9ybV9fcHJvbW9jb2RlLS1zaG93Jyk7XG4gICAgcHJvbW9jb2RlSW5wdXQuZm9jdXMoKTtcbiAgfSk7XG59XG5cbmlmIChwcm9tb2NvZGVFbGVtZW50ICYmIHByb21vY29kZUNhbmNlbEJ1dHRvbiAmJiBwcm9tb2NvZGVTaG93QnV0dG9uMSAmJiBwcm9tb2NvZGVTaG93QnV0dG9uMikge1xuICBwcm9tb2NvZGVDYW5jZWxCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgcHJvbW9jb2RlU2hvd0J1dHRvbjEuY2xhc3NMaXN0LnJlbW92ZSgnZm9ybV9fZm9vdGVyLXByb21vLWJ1dHRvbi0taGlkZGVuJyk7XG4gICAgcHJvbW9jb2RlU2hvd0J1dHRvbjIuY2xhc3NMaXN0LnJlbW92ZSgnZm9ybV9fcHJvbW9jb2RlLWJ1dHRvbi0taGlkZGVuJyk7XG4gICAgcHJvbW9jb2RlRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdmb3JtX19wcm9tb2NvZGUtLXNob3cnKTtcbiAgfSk7XG59XG5cbmNvbnN0IGluc3BpcmF0aW9uR2FsbGVyeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbnNwaXJhdGlvbicpO1xuXG5pZiAoaW5zcGlyYXRpb25HYWxsZXJ5KSB7XG4gIGxldCBzd2lwZXIgPSBuZXcgU3dpcGVyKFwiLmFydGdhbGxlcnktc3dpcGVyXCIsIHtcbiAgICBzbGlkZXNQZXJWaWV3OiAnYXV0bycsXG4gICAgc3BhY2VCZXR3ZWVuOiA1LFxuICAgIGxvb3A6IHRydWUsXG4gICAgbmF2aWdhdGlvbjoge1xuICAgICAgbmV4dEVsOiBcIi5pbnNwaXJhdGlvbl9fYXJyb3ctLW5leHRcIixcbiAgICAgIHByZXZFbDogXCIuaW5zcGlyYXRpb25fX2Fycm93LS1iYWNrXCIsXG4gICAgfSxcbiAgfSlcbn07XG5cbmNvbnN0IHByb2R1Y3RzU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9kdWN0cycpO1xuXG5pZiAocHJvZHVjdHNTZWN0aW9uKSB7XG4gIChmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgYnJlYWtwb2ludCA9IHdpbmRvdy5tYXRjaE1lZGlhKCcobWluLXdpZHRoOiAxMjgwcHgpJyk7XG4gICAgY29uc3QgcHJvZHVjdHNTd2lwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvZHVjdHMtc3dpcGVyJyk7XG4gICAgY29uc3QgcHJvZHVjdHNMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2R1Y3RzX19saXN0Jyk7XG4gICAgY29uc3QgcHJvZHVjdFNsaWRlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcm9kdWN0c19faXRlbScpO1xuXG4gICAgbGV0IHByb2R1Y3RTd2lwZXI7XG4gICAgY29uc3QgYnJlYWtwb2ludENoZWNrZXIgPSAoKSA9PiB7XG5cbiAgICAgIGlmIChicmVha3BvaW50Lm1hdGNoZXMgPT09IHRydWUpIHtcblxuICAgICAgICBpZiAocHJvZHVjdFN3aXBlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcHJvZHVjdFN3aXBlci5kZXN0cm95KHRydWUsIHRydWUpO1xuICAgICAgICAgIHByb2R1Y3RTd2lwZXIgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgcHJvZHVjdHNTd2lwZXIuY2xhc3NMaXN0LnJlbW92ZSgnc3dpcGVyJyk7XG4gICAgICAgICAgcHJvZHVjdHNMaXN0LmNsYXNzTGlzdC5yZW1vdmUoJ3N3aXBlci13cmFwcGVyJyk7XG4gICAgICAgICAgcHJvZHVjdFNsaWRlcy5mb3JFYWNoKChzbGlkZSkgPT4ge1xuICAgICAgICAgICAgc2xpZGUuY2xhc3NMaXN0LnJlbW92ZSgnc3dpcGVyLXNsaWRlJyk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm47XG4gICAgICB9IGVsc2UgaWYgKGJyZWFrcG9pbnQubWF0Y2hlcyA9PT0gZmFsc2UgJiYgcHJvZHVjdFN3aXBlciA9PT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgcmV0dXJuIGVuYWJsZVN3aXBlcigpO1xuXG4gICAgICB9XG5cbiAgICB9O1xuXG4gICAgY29uc3QgZW5hYmxlU3dpcGVyID0gKCkgPT4ge1xuICAgICAgcHJvZHVjdHNTd2lwZXIuY2xhc3NMaXN0LmFkZCgnc3dpcGVyJyk7XG4gICAgICBwcm9kdWN0c0xpc3QuY2xhc3NMaXN0LmFkZCgnc3dpcGVyLXdyYXBwZXInKTtcbiAgICAgIHByb2R1Y3RTbGlkZXMuZm9yRWFjaCgoc2xpZGUpID0+IHtcbiAgICAgICAgc2xpZGUuY2xhc3NMaXN0LmFkZCgnc3dpcGVyLXNsaWRlJyk7XG4gICAgICB9KTtcblxuICAgICAgcHJvZHVjdFN3aXBlciA9IG5ldyBTd2lwZXIoJy5wcm9kdWN0cy1zd2lwZXInLCB7XG4gICAgICAgIHNsaWRlc1BlclZpZXc6IDEsXG4gICAgICAgIGdyaWQ6IHtcbiAgICAgICAgICByb3dzOiAyLFxuICAgICAgICB9LFxuICAgICAgICBzcGFjZUJldHdlZW46IDgsXG4gICAgICAgIGxvb3A6IHRydWUsXG4gICAgICAgIG5hdmlnYXRpb246IHtcbiAgICAgICAgICBuZXh0RWw6IFwiLnByb2R1Y3RzX19hcnJvdy0tbmV4dFwiLFxuICAgICAgICAgIHByZXZFbDogXCIucHJvZHVjdHNfX2Fycm93LS1iYWNrXCIsXG4gICAgICAgIH0sXG4gICAgICAgIGJyZWFrcG9pbnRzOiB7XG4gICAgICAgICAgNzY4OiB7XG4gICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAnYXV0bycsXG4gICAgICAgICAgfSxcbiAgICAgICAgICAxMjgwOiB7XG4gICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiA0LFxuICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiA1LFxuICAgICAgICAgIH0sXG4gICAgICAgICAgMTUxMDoge1xuICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAxMCxcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgYnJlYWtwb2ludENoZWNrZXIpO1xuICAgIGJyZWFrcG9pbnRDaGVja2VyKCk7XG4gIH0pKCk7XG59XG5cbmNvbnN0IHByb2plY3RzR2FsbGVyeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0cycpO1xuaWYgKHByb2plY3RzR2FsbGVyeSkge1xuICBsZXQgc3dpcGVyID0gbmV3IFN3aXBlcihcIi5wcm9qZWN0cy1zd2lwZXJcIiwge1xuICAgIHNsaWRlc1BlclZpZXc6ICdhdXRvJyxcbiAgICBzcGFjZUJldHdlZW46IDUsXG4gICAgbG9vcDogdHJ1ZSxcbiAgICBuYXZpZ2F0aW9uOiB7XG4gICAgICBuZXh0RWw6IFwiLnByb2plY3RzX19hcnJvdy0tbmV4dFwiLFxuICAgICAgcHJldkVsOiBcIi5wcm9qZWN0c19fYXJyb3ctLWJhY2tcIixcbiAgICB9LFxuICB9KVxufTtcblxuY29uc3Qgc2VydmljZVN3aXBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uLXNlcnZpY2UnKTtcbmlmIChzZXJ2aWNlU3dpcGVyKSB7XG4gIGxldCBzd2lwZXIgPSBuZXcgU3dpcGVyKFwiLm4tc2VydmljZS1zd2lwZXJcIiwge1xuICAgIHNsaWRlc1BlclZpZXc6ICdhdXRvJyxcbiAgICB3YXRjaE92ZXJmbG93OiB0cnVlLFxuICAgIHNwYWNlQmV0d2VlbjogNSxcbiAgICBicmVha3BvaW50czoge1xuICAgICAgNzY4OiB7XG4gICAgICAgIHNsaWRlc1BlclZpZXc6IDMsXG4gICAgICAgIHNwYWNlQmV0d2VlbjogNyxcbiAgICAgIH0sXG4gICAgICAxNTEwOiB7XG4gICAgICAgIHNwYWNlQmV0d2VlbjogMjAsXG4gICAgICB9LFxuICAgIH1cbiAgfSlcbn07XG5cbmNvbnN0IHRpbGVTd2lwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGlsZS1yYW5nZScpO1xuaWYgKHRpbGVTd2lwZXIpIHtcbiAgbGV0IHN3aXBlciA9IG5ldyBTd2lwZXIoJy50aWxlLXJhbmdlLXN3aXBlcicsIHtcbiAgICBzbGlkZXNQZXJWaWV3OiAnYXV0bycsXG4gICAgZ3JpZDoge1xuICAgICAgcm93czogMixcbiAgICB9LFxuICAgIHNwYWNlQmV0d2VlbjogOCxcbiAgICBsb29wOiB0cnVlLFxuICAgIG5hdmlnYXRpb246IHtcbiAgICAgIG5leHRFbDogXCIudGlsZS1yYW5nZV9fYXJyb3ctLW5leHRcIixcbiAgICAgIHByZXZFbDogXCIudGlsZS1yYW5nZV9fYXJyb3ctLWJhY2tcIixcbiAgICB9LFxuICAgIGJyZWFrcG9pbnRzOiB7XG4gICAgICA3Njg6IHtcbiAgICAgICAgc3BhY2VCZXR3ZWVuOiAxMCxcbiAgICAgIH0sXG4gICAgICAxMjgwOiB7XG4gICAgICAgIHNsaWRlc1BlclZpZXc6IDQsXG4gICAgICAgIHNwYWNlQmV0d2VlbjogOCxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSk7XG59O1xuXG5jb25zdCBsaW5rc0VsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmxpbmtzJyk7XG5cbmlmIChsaW5rc0VsZW1lbnRzKSB7XG4gIGxpbmtzRWxlbWVudHMuZm9yRWFjaCgobGlua3MpID0+IHtcbiAgICBsaW5rcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldnQpID0+IHtcbiAgICAgIGNvbnN0IGJ1dHRvbiA9IGV2dC50YXJnZXQuY2xvc2VzdCgnLmxpbmtzX190b2dnbGUnKTtcblxuICAgICAgaWYgKCFidXR0b24pIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBsaW5rcy5jbGFzc0xpc3QudG9nZ2xlKCdsaW5rcy0tb3BlbicpO1xuICAgIH0pXG4gIH0pO1xufVxuXG5jb25zdCBvcmRlckZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY3VzdG9tLWZvcm0tMi0tb3JkZXInKTtcblxuaWYgKG9yZGVyRm9ybSkge1xuICBjb25zdCBmb3JtU2VjdGlvbkJvZHlBZGRyZXNzID0gb3JkZXJGb3JtLnF1ZXJ5U2VsZWN0b3IoJy5mb3JtX19zZWN0aW9uLWJvZHktLWFkZHJlc3MnKTtcblxuICBpZiAoZm9ybVNlY3Rpb25Cb2R5QWRkcmVzcykge1xuICAgIG9yZGVyRm9ybS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoZXZ0KSA9PiB7XG4gICAgICBjb25zdCBkZWxpdmVyeVNlbGZDaGVja2JveCA9IGV2dC50YXJnZXQuY2xvc2VzdCgnLmZvcm1fX2NoZWNrYm94LWNvbnRyb2wnKTtcbiAgICAgIGlmICghZGVsaXZlcnlTZWxmQ2hlY2tib3gpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgZm9ybVNlY3Rpb25Cb2R5QWRkcmVzcy5jbGFzc0xpc3QudG9nZ2xlKCdmb3JtX19zZWN0aW9uLWJvZHktLWFkZHJlc3MtLXN0b2NrJywgZGVsaXZlcnlTZWxmQ2hlY2tib3guY2hlY2tlZCk7XG4gICAgfSk7XG4gIH1cbn1cblxuY29uc3QgYW5jaG9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm4tYmFubmVyX192aWRlby1saW5rJyk7XG5cbmNvbnN0IGVsZW1lbnRDbGlja0hhbmRsZXIgPSAoZXZ0KSA9PiB7XG4gIGNvbnN0IGVsZW1lbnQgPSBldnQudGFyZ2V0LmNsb3Nlc3QoJ2EnKTtcbiAgaWYgKCFlbGVtZW50KSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICBjb25zdCBibG9ja0lkID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcblxuICBpZiAoYmxvY2tJZCAmJiBibG9ja0lkICE9PSAnIycgJiYgYmxvY2tJZCAhPT0gJyMhJykge1xuICAgIGNvbnN0IGJsb2NrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihibG9ja0lkKTtcblxuICAgIGlmIChibG9jaykge1xuICAgICAgYmxvY2suc2Nyb2xsSW50b1ZpZXcoe1xuICAgICAgICBiZWhhdmlvcjogJ3Ntb290aCcsXG4gICAgICAgIGJsb2NrOiAnc3RhcnQnLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG59O1xuXG5pZiAoYW5jaG9yKSB7XG4gIGFuY2hvci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGVsZW1lbnRDbGlja0hhbmRsZXIpO1xufVxuXG5jb25zdCBuUHJvZHVjdHNJdGVtU2xpZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm4tcHJvZHVjdHNfX2l0ZW0tc2xpZGVyJyk7XG5cbmlmIChuUHJvZHVjdHNJdGVtU2xpZGVyKSB7XG4gIHZhciBzd2lwZXIgPSBuZXcgU3dpcGVyKCcubi1wcm9kdWN0c19faXRlbS1zbGlkZXInLCB7XG4gICAgY3NzTW9kZTogdHJ1ZSxcbiAgICBuYXZpZ2F0aW9uOiB7XG4gICAgICBuZXh0RWw6ICcuc3dpcGVyLWJ1dHRvbi1uZXh0JyxcbiAgICAgIHByZXZFbDogJy5zd2lwZXItYnV0dG9uLXByZXYnLFxuICAgIH0sXG4gICAgcGFnaW5hdGlvbjoge1xuICAgICAgZWw6ICcuc3dpcGVyLXBhZ2luYXRpb24nLFxuICAgICAgY2xpY2thYmxlOiB0cnVlLFxuICAgIH1cbiAgfSk7XG59XG5cbmNvbnN0IG1hdGVyaWFsc1N3aXBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYXRlcmlhbHNfX3NsaWRlci5zd2lwZXInKTtcblxuaWYgKG1hdGVyaWFsc1N3aXBlcikge1xuICB2YXIgc3dpcGVyID0gbmV3IFN3aXBlcignLm1hdGVyaWFsc19fc2xpZGVyJywge1xuICAgIHNsaWRlc1BlclZpZXc6ICdhdXRvJyxcbiAgICBzcGFjZUJldHdlZW46IDEwLFxuICAgIGNzc01vZGU6IHRydWUsXG4gICAgbmF2aWdhdGlvbjoge1xuICAgICAgbmV4dEVsOiAnLnN3aXBlci1idXR0b24tbmV4dCcsXG4gICAgICBwcmV2RWw6ICcuc3dpcGVyLWJ1dHRvbi1wcmV2JyxcbiAgICB9LFxuICAgIHdhdGNoU2xpZGVzUHJvZ3Jlc3M6IHRydWUsXG4gICAgYnJlYWtwb2ludHM6IHtcbiAgICAgIDc2ODoge1xuICAgICAgICBzcGFjZUJldHdlZW46IDE1LFxuICAgICAgfSxcbiAgICAgIDEyODA6IHtcbiAgICAgICAgc2xpZGVzUGVyVmlldzogNCxcbiAgICAgICAgc3BhY2VCZXR3ZWVuOiAyNVxuICAgICAgfSxcbiAgICB9LFxuICB9KTtcbn1cblxuY29uc3QgbWF0ZXJpYWxzU3dpcGVyQWx0ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWF0ZXJpYWxzX19zbGlkZXItLWFsdGVyLnN3aXBlcicpO1xuXG5pZiAobWF0ZXJpYWxzU3dpcGVyQWx0ZXIpIHtcbiAgdmFyIHN3aXBlciA9IG5ldyBTd2lwZXIoJy5tYXRlcmlhbHNfX3NsaWRlci0tYWx0ZXInLCB7XG4gICAgc2xpZGVzUGVyVmlldzogJ2F1dG8nLFxuICAgIHNwYWNlQmV0d2VlbjogMTEsXG4gICAgY3NzTW9kZTogdHJ1ZSxcbiAgICBuYXZpZ2F0aW9uOiB7XG4gICAgICBuZXh0RWw6ICcuc3dpcGVyLWJ1dHRvbi1uZXh0JyxcbiAgICAgIHByZXZFbDogJy5zd2lwZXItYnV0dG9uLXByZXYnLFxuICAgIH0sXG4gICAgYnJlYWtwb2ludHM6IHtcbiAgICAgIDEyODA6IHtcbiAgICAgICAgc2xpZGVzUGVyVmlldzogNixcbiAgICAgIH0sXG4gICAgICAxNTEwOiB7XG4gICAgICAgIHNsaWRlc1BlclZpZXc6IDcsXG4gICAgICB9LFxuICAgIH0sXG4gIH0pO1xufVxuXG5jb25zdCBicmFuZHNTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm4tYnJhbmRzJyk7XG5cbmlmIChicmFuZHNTZWN0aW9uKSB7XG4gIChmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgYnJlYWtwb2ludCA9IHdpbmRvdy5tYXRjaE1lZGlhKCcobWluLXdpZHRoOiA3NjhweCknKTtcbiAgICBjb25zdCBicmFuZHNTd2lwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnJhbmRzLXN3aXBlcicpO1xuICAgIGNvbnN0IGJyYW5kc0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubi1icmFuZHNfX2xpc3QnKTtcbiAgICBjb25zdCBicmFuZHNTbGlkZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubi1icmFuZHNfX2l0ZW0nKTtcblxuICAgIGxldCBicmFuZFN3aXBlcjtcbiAgICBjb25zdCBicmVha3BvaW50Q2hlY2tlciA9ICgpID0+IHtcblxuICAgICAgaWYgKGJyZWFrcG9pbnQubWF0Y2hlcyA9PT0gZmFsc2UpIHtcblxuICAgICAgICBpZiAoYnJhbmRTd2lwZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGJyYW5kU3dpcGVyLmRlc3Ryb3kodHJ1ZSwgdHJ1ZSk7XG4gICAgICAgICAgYnJhbmRTd2lwZXIgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgYnJhbmRzU3dpcGVyLmNsYXNzTGlzdC5yZW1vdmUoJ3N3aXBlcicpO1xuICAgICAgICAgIGJyYW5kc0xpc3QuY2xhc3NMaXN0LnJlbW92ZSgnc3dpcGVyLXdyYXBwZXInKTtcbiAgICAgICAgICBicmFuZHNTbGlkZXMuZm9yRWFjaCgoc2xpZGUpID0+IHtcbiAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoJ3N3aXBlci1zbGlkZScpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcblxuICAgICAgfSBlbHNlIGlmIChicmVha3BvaW50Lm1hdGNoZXMgPT09IHRydWUgJiYgYnJhbmRTd2lwZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gZW5hYmxlU3dpcGVyKCk7XG5cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3QgZW5hYmxlU3dpcGVyID0gKCkgPT4ge1xuICAgICAgYnJhbmRzU3dpcGVyLmNsYXNzTGlzdC5hZGQoJ3N3aXBlcicpO1xuICAgICAgYnJhbmRzTGlzdC5jbGFzc0xpc3QuYWRkKCdzd2lwZXItd3JhcHBlcicpO1xuICAgICAgYnJhbmRzU2xpZGVzLmZvckVhY2goKHNsaWRlKSA9PiB7XG4gICAgICAgIHNsaWRlLmNsYXNzTGlzdC5hZGQoJ3N3aXBlci1zbGlkZScpO1xuICAgICAgfSk7XG5cbiAgICAgIGJyYW5kU3dpcGVyID0gbmV3IFN3aXBlcignLmJyYW5kcy1zd2lwZXInLCB7XG4gICAgICAgIHNsaWRlc1BlclZpZXc6ICdhdXRvJyxcbiAgICAgICAgc3BhY2VCZXR3ZWVuOiA1LFxuICAgICAgICBuYXZpZ2F0aW9uOiB7XG4gICAgICAgICAgbmV4dEVsOiBcIi5uLWJyYW5kc19fYXJyb3ctLW5leHRcIixcbiAgICAgICAgICBwcmV2RWw6IFwiLm4tYnJhbmRzX19hcnJvdy0tYmFja1wiLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBicmVha3BvaW50Q2hlY2tlcik7XG4gICAgYnJlYWtwb2ludENoZWNrZXIoKTtcbiAgfSkoKTtcbn1cblxuY29uc3QgbmV3c1NlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubi1uZXdzJyk7XG5pZiAobmV3c1NlY3Rpb24pIHtcbiAgbGV0IHN3aXBlciA9IG5ldyBTd2lwZXIoJy5uZXdzLXN3aXBlcicsIHtcbiAgICBzbGlkZXNQZXJWaWV3OiAnYXV0bycsXG4gICAgc3BhY2VCZXR3ZWVuOiA1LFxuICAgIGxvb3A6IHRydWUsXG4gICAgbmF2aWdhdGlvbjoge1xuICAgICAgbmV4dEVsOiBcIi5uLW5ld3NfX2Fycm93LS1uZXh0XCIsXG4gICAgICBwcmV2RWw6IFwiLm4tbmV3c19fYXJyb3ctLWJhY2tcIixcbiAgICB9LFxuICB9KTtcbn07XG5cbmNvbnN0IG9mZmVyc1NlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcub2ZmZXJzJyk7XG5pZiAob2ZmZXJzU2VjdGlvbikge1xuICBjb25zdCB0YWJzID0gbmV3IFN3aXBlcignLm9mZmVycyAudGFic19fc2xpZGVyJywge1xuICAgIHNsaWRlc1BlclZpZXc6IDEsXG4gICAgc3BhY2VCZXR3ZWVuOiAwLFxuICAgIGxvb3A6IHRydWUsXG4gICAgd2F0Y2hTbGlkZXNQcm9ncmVzczogdHJ1ZSxcbiAgICBwYWdpbmF0aW9uOiB7XG4gICAgICBlbDogJy5vZmZlcnNfX3RhYnMtcGFnaW5hdGlvbicsXG4gICAgICBjbGlja2FibGU6IHRydWUsXG4gICAgfSxcbiAgICBicmVha3BvaW50czoge1xuICAgICAgNzY4OiB7XG4gICAgICAgIHNsaWRlc1BlclZpZXc6IDMsXG4gICAgICAgIHNsaWRlc1Blckdyb3VwOiAzLFxuICAgICAgfSxcbiAgICAgIDEyODA6IHtcbiAgICAgICAgc2xpZGVzUGVyVmlldzogNixcbiAgICAgICAgc2xpZGVzUGVyR3JvdXA6IDEsXG4gICAgICAgIGxvb3A6IGZhbHNlLFxuICAgICAgfSxcbiAgICB9LFxuICB9KTtcblxuICBjb25zdCBzbGlkZXMgPSBuZXcgU3dpcGVyKCcub2ZmZXJzX19zbGlkZXInLCB7XG4gICAgc2xpZGVzUGVyVmlldzogMSxcbiAgICBzcGFjZUJldHdlZW46IDAsXG4gICAgbG9vcDogdHJ1ZSxcbiAgICB3YXRjaFNsaWRlc1Byb2dyZXNzOiB0cnVlLFxuICAgIG5hdmlnYXRpb246IHtcbiAgICAgIG5leHRFbDogXCIub2ZmZXJzX19idXR0b24tbmV4dFwiLFxuICAgICAgcHJldkVsOiBcIi5vZmZlcnNfX2J1dHRvbi1wcmV2XCIsXG4gICAgfSxcbiAgICBhdXRvcGxheToge1xuICAgICAgZGVsYXk6IDY1MDAsXG4gICAgICBkaXNhYmxlT25JbnRlcmFjdGlvbjogZmFsc2UsXG4gICAgICBwYXVzZU9uTW91c2VFbnRlcjogdHJ1ZSxcbiAgICAgIHdhaXRGb3JUcmFuc2l0aW9uOiB0cnVlXG4gICAgfSxcbiAgICBlZmZlY3Q6ICdmYWRlJyxcbiAgICBmYWRlRWZmZWN0OiB7XG4gICAgICBjcm9zc0ZhZGU6IHRydWVcbiAgICB9LFxuICAgIHRodW1iczoge1xuICAgICAgc3dpcGVyOiB0YWJzLFxuICAgIH0sXG4gIH0pO1xufTtcblxuY29uc3Qgc2hvd3Jvb21HYWxsZXJ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNob3dyb29tJyk7XG5pZihzaG93cm9vbUdhbGxlcnkpIHtcbiAgY29uc3Qgc2hvd3Jvb21Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2hvd3Jvb21fX3N3aXBlcicpO1xuICBsZXQgc3dpcGVyID0gbmV3IFN3aXBlcihcIi5zaG93cm9vbV9fc3dpcGVyXCIsIHtcbiAgICBzbGlkZXNQZXJWaWV3OiAnYXV0bycsXG4gICAgbG9vcDogdHJ1ZSxcbiAgICBmcmVlTW9kZTogdHJ1ZSxcbiAgICBzcGVlZDogMzAwMCxcbiAgICBhdXRvcGxheSA6IHtcbiAgICAgIGRlbGF5OiAwLFxuICAgICAgZGlzYWJsZU9uSW50ZXJhY3Rpb246IGZhbHNlLFxuICAgICAgcGF1c2VPbk1vdXNlRW50ZXI6IHRydWUsXG4gICAgICB3YWl0Rm9yVHJhbnNpdGlvbjogdHJ1ZVxuICAgIH0sXG4gICAgbmF2aWdhdGlvbjoge1xuICAgICAgbmV4dEVsOiBcIi5zaG93cm9vbV9fYXJyb3ctLW5leHRcIixcbiAgICAgIHByZXZFbDogXCIuc2hvd3Jvb21fX2Fycm93LS1iYWNrXCIsXG4gICAgfSxcbiAgfSk7XG4gIHN3aXBlci5vbignbW91c2VFbnRlcicsIGZ1bmN0aW9uICgpIHtcbiAgICBzd2lwZXIucGFyYW1zLnNwZWVkID0gMzAwO1xuXG4gIH0pO1xuXG4gIHN3aXBlci5vbignYXV0b3BsYXlSZXN1bWUnLCBmdW5jdGlvbiAoKSB7XG4gICAgc3dpcGVyLnBhcmFtcy5zcGVlZCA9IDMwMDA7XG5cbiAgfSk7XG59XG5cbmNvbnN0IGdvb2RzU2xpZGVyMSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nb29kcy0tc3dpcGVyLS0xIC5nb29kc19fc2xpZGVyJyk7XG5pZiAoZ29vZHNTbGlkZXIxKSB7XG4gIGNvbnN0IHN3aXBlciA9IG5ldyBTd2lwZXIoXCIuZ29vZHMtLXN3aXBlci0tMSAuZ29vZHNfX3NsaWRlclwiLCB7XG4gICAgc2xpZGVzUGVyVmlldzogMSxcbiAgICBzcGFjZUJldHdlZW46IDksXG4gICAgbmF2aWdhdGlvbjoge1xuICAgICAgbmV4dEVsOiBcIi5nb29kcy0tc3dpcGVyLS0xIC5nb29kc19fc2xpZGVyLWJ1dHRvbi1uZXh0XCIsXG4gICAgICBwcmV2RWw6IFwiLmdvb2RzLS1zd2lwZXItLTEgLmdvb2RzX19zbGlkZXItYnV0dG9uLXByZXZcIixcbiAgICB9LFxuICAgIGJyZWFrcG9pbnRzOiB7XG4gICAgICA0MjA6IHtcbiAgICAgICAgc2xpZGVzUGVyVmlldzogJ2F1dG8nLFxuICAgICAgfSxcbiAgICAgIDEyODA6IHtcbiAgICAgICAgc2xpZGVzUGVyVmlldzogNCxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB3YXRjaFNsaWRlc1Byb2dyZXNzOiB0cnVlXG4gIH0pO1xufVxuXG5jb25zdCBnb29kc1NsaWRlcjIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ29vZHMtLXN3aXBlci0tMiAuZ29vZHNfX3NsaWRlcicpO1xuaWYgKGdvb2RzU2xpZGVyMSkge1xuICBjb25zdCBzd2lwZXIgPSBuZXcgU3dpcGVyKFwiLmdvb2RzLS1zd2lwZXItLTIgLmdvb2RzX19zbGlkZXJcIiwge1xuICAgIHNsaWRlc1BlclZpZXc6IDEsXG4gICAgc3BhY2VCZXR3ZWVuOiA5LFxuICAgIG5hdmlnYXRpb246IHtcbiAgICAgIG5leHRFbDogXCIuZ29vZHMtLXN3aXBlci0tMiAuZ29vZHNfX3NsaWRlci1idXR0b24tbmV4dFwiLFxuICAgICAgcHJldkVsOiBcIi5nb29kcy0tc3dpcGVyLS0yIC5nb29kc19fc2xpZGVyLWJ1dHRvbi1wcmV2XCIsXG4gICAgfSxcbiAgICBicmVha3BvaW50czoge1xuICAgICAgNDIwOiB7XG4gICAgICAgIHNsaWRlc1BlclZpZXc6ICdhdXRvJyxcbiAgICAgIH0sXG4gICAgICAxMjgwOiB7XG4gICAgICAgIHNsaWRlc1BlclZpZXc6IDQsXG4gICAgICB9LFxuICAgIH0sXG4gICAgd2F0Y2hTbGlkZXNQcm9ncmVzczogdHJ1ZVxuICB9KTtcbn1cblxuY29uc3QgcG9wdWxhckdvb2RzU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nb29kcy0tcG9wdWxhcicpO1xuXG5pZiAocG9wdWxhckdvb2RzU2VjdGlvbikge1xuXG4gIChmdW5jdGlvbiAoKSB7XG5cbiAgICBjb25zdCBicmVha3BvaW50ID0gd2luZG93Lm1hdGNoTWVkaWEoJyhtaW4td2lkdGg6IDEyODBweCknKTtcbiAgICBjb25zdCBwb3BHb29kc1N3aXBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nb29kcy0tcG9wdWxhciAuZ29vZHNfX3NsaWRlcicpO1xuICAgIGNvbnN0IHBvcEdvb2RzTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nb29kcy0tcG9wdWxhciAuZ29vZHNfX2xpc3QnKTtcbiAgICBjb25zdCBwb3BHb29kc1NsaWRlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5nb29kcy0tcG9wdWxhciAuZ29vZC1saXN0X19pdGVtJyk7XG5cbiAgICBsZXQgcG9wR29vZFN3aXBlcjtcbiAgICBjb25zdCBicmVha3BvaW50Q2hlY2tlciA9ICgpID0+IHtcbiAgICAgIGlmIChicmVha3BvaW50Lm1hdGNoZXMgPT09IHRydWUpIHtcblxuICAgICAgICBpZiAocG9wR29vZFN3aXBlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcG9wR29vZFN3aXBlci5kZXN0cm95KHRydWUsIHRydWUpO1xuICAgICAgICAgIHBvcEdvb2RTd2lwZXIgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgcG9wdWxhckdvb2RzU2VjdGlvbi5jbGFzc0xpc3QucmVtb3ZlKCdnb29kcy0tc3dpcGVyJyk7XG4gICAgICAgICAgcG9wR29vZHNTd2lwZXIuY2xhc3NMaXN0LnJlbW92ZSgnc3dpcGVyJyk7XG4gICAgICAgICAgcG9wR29vZHNMaXN0LmNsYXNzTGlzdC5yZW1vdmUoJ3N3aXBlci13cmFwcGVyJyk7XG4gICAgICAgICAgcG9wR29vZHNTbGlkZXMuZm9yRWFjaCgoc2xpZGUpID0+IHtcbiAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoJ3N3aXBlci1zbGlkZScpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuO1xuXG4gICAgICB9IGVsc2UgaWYgKGJyZWFrcG9pbnQubWF0Y2hlcyA9PT0gZmFsc2UgJiYgcG9wR29vZFN3aXBlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBlbmFibGVTd2lwZXIoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3QgZW5hYmxlU3dpcGVyID0gKCkgPT4ge1xuICAgICAgcG9wdWxhckdvb2RzU2VjdGlvbi5jbGFzc0xpc3QuYWRkKCdnb29kcy0tc3dpcGVyJyk7XG4gICAgICBwb3BHb29kc1N3aXBlci5jbGFzc0xpc3QuYWRkKCdzd2lwZXInKTtcbiAgICAgIHBvcEdvb2RzTGlzdC5jbGFzc0xpc3QuYWRkKCdzd2lwZXItd3JhcHBlcicpO1xuICAgICAgcG9wR29vZHNTbGlkZXMuZm9yRWFjaCgoc2xpZGUpID0+IHtcbiAgICAgICAgc2xpZGUuY2xhc3NMaXN0LmFkZCgnc3dpcGVyLXNsaWRlJyk7XG4gICAgICB9KTtcblxuICAgICAgcG9wR29vZFN3aXBlciA9IG5ldyBTd2lwZXIoXCIuZ29vZHMtLXBvcHVsYXIgLmdvb2RzX19zbGlkZXJcIiwge1xuICAgICAgICBzbGlkZXNQZXJWaWV3OiAxLFxuICAgICAgICBzcGFjZUJldHdlZW46IDksXG4gICAgICAgIGFsbG93VG91Y2hNb3ZlOiB0cnVlLFxuICAgICAgICBuYXZpZ2F0aW9uOiB7XG4gICAgICAgICAgbmV4dEVsOiBcIi5nb29kcy0tcG9wdWxhciAuZ29vZHNfX3NsaWRlci1idXR0b24tbmV4dFwiLFxuICAgICAgICAgIHByZXZFbDogXCIuZ29vZHMtLXBvcHVsYXIgLmdvb2RzX19zbGlkZXItYnV0dG9uLXByZXZcIixcbiAgICAgICAgfSxcbiAgICAgICAgYnJlYWtwb2ludHM6IHtcbiAgICAgICAgICA0MjA6IHtcbiAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6ICdhdXRvJyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIDEyODA6IHtcbiAgICAgICAgICAgIGFsbG93VG91Y2hNb3ZlOiBmYWxzZSxcbiAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDQsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgd2F0Y2hTbGlkZXNQcm9ncmVzczogdHJ1ZVxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBicmVha3BvaW50Q2hlY2tlcik7XG4gICAgYnJlYWtwb2ludENoZWNrZXIoKTtcbiAgfSkoKTtcbn1cblxuLyogLS0tLS0tLS0tLS0tIG4tc2VsZWN0IC0tLS0tLS0tLS0tLSAqL1xuY29uc3QgaW5pdFNlbGVjdCA9ICh3cmFwcGVyKSA9PiB7XG4gIGNvbnN0IGNvbnRyb2wgPSB3cmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJy5uLXNlbGVjdF9fY29udHJvbCcpO1xuICBjb25zdCBzZWxlY3QgPSB3cmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJy5uLXNlbGVjdF9fc2VsZWN0Jyk7XG4gIGNvbnN0IGhlYWRlciA9IHNlbGVjdC5xdWVyeVNlbGVjdG9yKCcubi1zZWxlY3RfX2hlYWRlcicpO1xuICBjb25zdCBsaXN0ID0gc2VsZWN0LnF1ZXJ5U2VsZWN0b3IoJy5uLXNlbGVjdF9fbGlzdCcpO1xuICBjb25zdCBvcHRpb25zID0gbGlzdC5xdWVyeVNlbGVjdG9yQWxsKCcubi1zZWxlY3RfX29wdGlvbicpO1xuXG4gIGNvbnRyb2wudmFsdWUgPSAnJztcblxuICAvLyBsZXQgY2hhbmdlRXZlbnQgPSBuZXcgRXZlbnQoJ2NoYW5nZScsIHsgYnViYmxlczogdHJ1ZSB9KTtcblxuICBsZXQgbGlzdE1heEhlaWdodCA9IGZhbHNlO1xuXG4gIGNvbnN0IHNldExpc3RNYXhIZWlnaHQgPSAoKSA9PiB7XG4gICAgaWYgKGxpc3RNYXhIZWlnaHQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsaXN0LnN0eWxlLm1heEhlaWdodCA9IGAke2xpc3QuY2hpbGRyZW5bMF0ub2Zmc2V0SGVpZ2h0ICogbGlzdC5kYXRhc2V0Lm1heEhlaWdodH1weGA7XG4gICAgbGlzdE1heEhlaWdodCA9IHRydWU7XG4gIH07XG5cbiAgc2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAgc2V0TGlzdE1heEhlaWdodCwge29uY2U6IHRydWV9KTtcbiAgc2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2V0TGlzdE1heEhlaWdodCwge29uY2U6IHRydWV9KTtcblxuICBsZXQgY3VycmVudE9wdGlvbkluZGV4ID0gMDtcblxuICBjb25zdCBnZXROZXh0T3B0aW9uSW5kZXggPSAoKSA9PiB7XG4gICAgcmV0dXJuIChjdXJyZW50T3B0aW9uSW5kZXggKyAxKSAlIGNvbnRyb2wuY2hpbGRyZW4ubGVuZ3RoO1xuICB9O1xuXG4gIGNvbnN0IGdldFByZXZPcHRpb25JbmRleCA9ICgpID0+IHtcbiAgICByZXR1cm4gKGN1cnJlbnRPcHRpb25JbmRleCAtIDEgPCAwKSA/IGNvbnRyb2wuY2hpbGRyZW4ubGVuZ3RoIC0gMSA6IGN1cnJlbnRPcHRpb25JbmRleCAtIDE7XG4gIH07XG5cbiAgY29uc3QgY2hhbmdlVmFsdWUgPSAoaW5kZXgpID0+IHtcbiAgICBpZiAoY29udHJvbC52YWx1ZSA9PT0gY29udHJvbC5jaGlsZHJlbltpbmRleF0udmFsdWUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb250cm9sLmNoaWxkcmVuW2luZGV4XS5zZWxlY3RlZCA9IHRydWU7XG4gICAgY29udHJvbC5kaXNwYXRjaEV2ZW50KGNoYW5nZUV2ZW50KTtcbiAgfTtcblxuICBjb25zdCBoaWdobGlnaHRTZWxlY3RlZE9wdGlvbiA9ICgpID0+IHtcbiAgICBvcHRpb25zLmZvckVhY2goKG9wdGlvbikgPT4ge1xuICAgICAgb3B0aW9uLmNsYXNzTGlzdC5yZW1vdmUoJ24tc2VsZWN0X19vcHRpb24tLXNlbGVjdGVkJyk7XG4gICAgfSk7XG5cbiAgICBpZiAoY29udHJvbC52YWx1ZSA9PT0gJycpIHtcbiAgICAgIGhlYWRlci50ZXh0Q29udGVudCA9IGhlYWRlci5kYXRhc2V0LnRleHQ7XG4gICAgICBoZWFkZXIuY2xhc3NMaXN0LnJlbW92ZSgnbi1zZWxlY3RfX2hlYWRlci0tc2VsZWN0ZWQnKTtcbiAgICAgIGxpc3Quc2Nyb2xsVG9wID0gMDtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBoZWFkZXIuY2xhc3NMaXN0LmFkZCgnbi1zZWxlY3RfX2hlYWRlci0tc2VsZWN0ZWQnKTtcblxuICAgIGxpc3QuY2hpbGRyZW5bY3VycmVudE9wdGlvbkluZGV4XS5jbGFzc0xpc3QuYWRkKCduLXNlbGVjdF9fb3B0aW9uLS1zZWxlY3RlZCcpO1xuICAgIGhlYWRlci50ZXh0Q29udGVudCA9IGNvbnRyb2wuY2hpbGRyZW5bY3VycmVudE9wdGlvbkluZGV4XS50ZXh0Q29udGVudDtcblxuICAgIGlmIChsaXN0LmNoaWxkcmVuW2N1cnJlbnRPcHRpb25JbmRleF0ub2Zmc2V0VG9wICsgbGlzdC5jaGlsZHJlbltjdXJyZW50T3B0aW9uSW5kZXhdLm9mZnNldEhlaWdodCA+IGxpc3Qub2Zmc2V0SGVpZ2h0ICsgbGlzdC5zY3JvbGxUb3ApIHtcbiAgICAgIGxpc3Quc2Nyb2xsVG9wID0gbGlzdC5jaGlsZHJlbltjdXJyZW50T3B0aW9uSW5kZXhdLm9mZnNldFRvcCArIGxpc3QuY2hpbGRyZW5bY3VycmVudE9wdGlvbkluZGV4XS5vZmZzZXRIZWlnaHQgLSBsaXN0Lm9mZnNldEhlaWdodDtcbiAgICB9IGVsc2UgaWYgKGxpc3Quc2Nyb2xsVG9wID4gbGlzdC5jaGlsZHJlbltjdXJyZW50T3B0aW9uSW5kZXhdLm9mZnNldFRvcCkge1xuICAgICAgbGlzdC5zY3JvbGxUb3AgPSBsaXN0LmNoaWxkcmVuW2N1cnJlbnRPcHRpb25JbmRleF0ub2Zmc2V0VG9wO1xuICAgIH1cbiAgfTtcblxuICBzZWxlY3QuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChldnQpID0+IHtcbiAgICBzd2l0Y2ggKGV2dC5jb2RlKSB7XG4gICAgICBjYXNlIEtleS5SSUdIVDpcbiAgICAgIGNhc2UgS2V5LkRPV046XG4gICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjaGFuZ2VWYWx1ZShnZXROZXh0T3B0aW9uSW5kZXgoKSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBLZXkuVVA6XG4gICAgICBjYXNlIEtleS5MRUZUOlxuICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY2hhbmdlVmFsdWUoZ2V0UHJldk9wdGlvbkluZGV4KCkpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgS2V5LlNQQUNFOlxuICAgICAgY2FzZSBLZXkuRU5URVI6XG4gICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBzZWxlY3QuY2xhc3NMaXN0LnRvZ2dsZSgnbi1zZWxlY3RfX3NlbGVjdC0tb3BlbicpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH0pO1xuXG4gIHNlbGVjdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICh7dGFyZ2V0fSkgPT4ge1xuICAgIGNvbnN0IG9wdGlvbiA9IHRhcmdldC5jbG9zZXN0KCcubi1zZWxlY3RfX29wdGlvbicpO1xuXG4gICAgaWYgKG9wdGlvbikge1xuICAgICAgY2hhbmdlVmFsdWUob3B0aW9uLmRhdGFzZXQuaW5kZXgpO1xuICAgIH1cblxuICAgIHNlbGVjdC5jbGFzc0xpc3QudG9nZ2xlKCduLXNlbGVjdF9fc2VsZWN0LS1vcGVuJyk7XG4gIH0pO1xuXG4gIHNlbGVjdC5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgKCkgPT4ge1xuICAgIHNlbGVjdC5jbGFzc0xpc3QucmVtb3ZlKCduLXNlbGVjdF9fc2VsZWN0LS1vcGVuJyk7XG4gIH0pO1xuXG4gIGNvbnRyb2wuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgIGlmIChjb250cm9sLnZhbHVlKSB7XG4gICAgICBjdXJyZW50T3B0aW9uSW5kZXggPSArY29udHJvbC5xdWVyeVNlbGVjdG9yKGBvcHRpb25bdmFsdWU9XCIke2NvbnRyb2wudmFsdWV9XCJdYCkuZGF0YXNldC5pbmRleDtcbiAgICB9IGVsc2Uge1xuICAgICAgY3VycmVudE9wdGlvbkluZGV4ID0gMDtcbiAgICB9XG4gICAgaGlnaGxpZ2h0U2VsZWN0ZWRPcHRpb24oKTtcbiAgfSk7XG59O1xuXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubi1zZWxlY3QnKS5mb3JFYWNoKGluaXRTZWxlY3QpO1xuXG4vKiAtLS0tLS0tLS0tLS0gKi9cbi8vIGNvbnN0IFVQTE9BRF9VUkwgPSAnaHR0cHM6Ly9lY2hvLmh0bWxhY2FkZW15LnJ1L2NvdXJzZXMnO1xubGV0IFVQTE9BRF9VUkwgPSAnaHR0cHM6Ly9lY2hvLmh0bWxhY2FkZW15LnJ1L2NvdXJzZXMnO1xuXG5jb25zdCBzZW5kRGF0YSA9IChvblN1Y2Nlc3MsIG9uRmFpbCwgYm9keSkgPT4ge1xuICBmZXRjaChVUExPQURfVVJMLCB7XG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgYm9keSxcbiAgfSlcbiAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgIGlmKHJlc3BvbnNlLm9rKSB7XG4gICAgICAgIG9uU3VjY2VzcygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb25GYWlsKCk7XG4gICAgICB9XG4gICAgfSlcbiAgICAuY2F0Y2goKCkgPT4ge1xuICAgICAgb25GYWlsKCk7XG4gICAgfSk7XG59O1xuXG4vKiAtLS0tLS0tLS0tLS0gY3VzdG9tLWZvcm0tMi0tY2FsY3VsYXRpb24gLS0tLS0tLS0tLS0tICovXG5cbmNvbnN0IGluaXRDYWxjdWxhdGlvbkZvcm1zID0gKGZvcm0pID0+IHtcbiAgY29uc3QgQ0VOVElNRVRFUlNfSU5fMV9TUVVBUkVfTUVURVIgPSAxMDAwMDtcblxuICBjb25zdCBsZW5ndGhGaWVsZCA9IGZvcm0ucXVlcnlTZWxlY3RvcignW25hbWU9XCJsZW5ndGhcIl0nKTtcbiAgY29uc3Qgd2lkdGhGaWVsZCA9IGZvcm0ucXVlcnlTZWxlY3RvcignW25hbWU9XCJ3aWR0aFwiXScpO1xuICBjb25zdCBhcmVhRmllbGQgPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoJ1tuYW1lPVwiYXJlYVwiXScpO1xuICBjb25zdCBtYXRlcmlhbEZpZWxkID0gZm9ybS5xdWVyeVNlbGVjdG9yKCdbbmFtZT1cIm1hdGVyaWFsXCJdJylcbiAgY29uc3QgZm9ybVJlc3VsdCA9IGZvcm0ucXVlcnlTZWxlY3RvcignLmZvcm1fX3Jlc3VsdCcpO1xuXG4gIGNvbnN0IGlzQXJlYUZpZWxkRmlsZWQgPSAoKSA9PiB7XG4gICAgcmV0dXJuICEhK2FyZWFGaWVsZC52YWx1ZTtcbiAgfTtcblxuICBjb25zdCBjYWxjQXJlYSA9ICgpID0+IHtcbiAgICByZXR1cm4gK2xlbmd0aEZpZWxkLnZhbHVlICogK3dpZHRoRmllbGQudmFsdWUgLyBDRU5USU1FVEVSU19JTl8xX1NRVUFSRV9NRVRFUjtcbiAgfVxuXG4gIGNvbnN0IHNldEFyZWEgPSAoKSA9PiB7XG4gICAgYXJlYUZpZWxkLnZhbHVlID0gY2FsY0FyZWEoKTtcbiAgICBmb3JtUmVzdWx0LmNsYXNzTGlzdC50b2dnbGUoJ2Zvcm1fX3Jlc3VsdC0taGlkZGVuJywgKCEoaXNBcmVhRmllbGRGaWxlZCgpICYmIG1hdGVyaWFsRmllbGQudmFsdWUpKSk7XG4gIH1cblxuICBjb25zdCByZXNldEZpZWxkID0gKGZpZWxkKSA9PiB7XG4gICAgZmllbGQudmFsdWUgPSAnJztcbiAgfVxuXG4gIGxlbmd0aEZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0Jywgc2V0QXJlYSk7XG4gIHdpZHRoRmllbGQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBzZXRBcmVhKTtcbiAgYXJlYUZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKCkgPT4ge1xuICAgIHJlc2V0RmllbGQobGVuZ3RoRmllbGQpO1xuICAgIHJlc2V0RmllbGQod2lkdGhGaWVsZCk7XG4gICAgZm9ybVJlc3VsdC5jbGFzc0xpc3QudG9nZ2xlKCdmb3JtX19yZXN1bHQtLWhpZGRlbicsICghKGlzQXJlYUZpZWxkRmlsZWQoKSAmJiBtYXRlcmlhbEZpZWxkLnZhbHVlKSkpO1xuICB9KTtcblxuICBtYXRlcmlhbEZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICBmb3JtUmVzdWx0LmNsYXNzTGlzdC50b2dnbGUoJ2Zvcm1fX3Jlc3VsdC0taGlkZGVuJywgKCEoaXNBcmVhRmllbGRGaWxlZCgpICYmIG1hdGVyaWFsRmllbGQudmFsdWUpKSk7XG4gIH0pO1xuXG4gIGNvbnN0IGZvcm1XcmFwcGVyID0gZm9ybS5jbG9zZXN0KCcuY3VzdG9tLWZvcm0tMi0tY2FsY3VsYXRpb24nKTtcbiAgY29uc3QgZm9ybVN1Ym1pdCA9IGZvcm0ucXVlcnlTZWxlY3RvcignLmZvcm1fX3N1Ym1pdCcpO1xuXG4gIGNvbnN0IG9uU3VjY2VzcyA9ICgpID0+IHtcbiAgICBmb3JtV3JhcHBlci5jbGFzc0xpc3QucmVtb3ZlKCdjdXN0b20tZm9ybS0yLS1ub3RpY2UtLWVycm9yJyk7XG4gICAgZm9ybVdyYXBwZXIuY2xhc3NMaXN0LmFkZCgnY3VzdG9tLWZvcm0tMi0tbm90aWNlLS1zdWNjZXNzJyk7XG4gICAgZm9ybVN1Ym1pdC5jbGFzc0xpc3QucmVtb3ZlKCdsb2FkZXInKTtcbiAgfTtcblxuICBjb25zdCBvbkZhaWwgPSAoKSA9PiB7XG4gICAgZm9ybVdyYXBwZXIuY2xhc3NMaXN0LnJlbW92ZSgnY3VzdG9tLWZvcm0tMi0tbm90aWNlLS1zdWNjZXNzJyk7XG4gICAgZm9ybVdyYXBwZXIuY2xhc3NMaXN0LmFkZCgnY3VzdG9tLWZvcm0tMi0tbm90aWNlLS1lcnJvcicpO1xuICAgIGZvcm1TdWJtaXQuY2xhc3NMaXN0LnJlbW92ZSgnbG9hZGVyJyk7XG4gIH07XG5cbiAgZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZXZ0KSA9PiB7XG4gICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZm9ybVN1Ym1pdC5jbGFzc0xpc3QuYWRkKCdsb2FkZXInKTtcblxuICAgIC8vINCY0LzQuNGC0LDRhtC40Y8g0YPRgdC/0LXRiNC90L7QuSAo0LjQu9C4INC90LXRgikg0L7RgtC/0YDQsNCy0LrQuCDRhNC+0YDQvNGLXG4gICAgVVBMT0FEX1VSTCA9IE1hdGgucmFuZG9tKCkgPiAwLjUgPyAnaHR0cHM6Ly9lY2hvLmh0bWxhY2FkZW15LnJ1L2NvdXJzZXMnIDogJ2Vycm9yJztcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgc2VuZERhdGEoXG4gICAgICAgICgpID0+IG9uU3VjY2VzcygpLFxuICAgICAgICAoKSA9PiBvbkZhaWwoKSxcbiAgICAgICAgbmV3IEZvcm1EYXRhKGV2dC50YXJnZXQpXG4gICAgICApO1xuICAgIH0sIDEwMDApXG4gIH0pO1xufTtcblxuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmN1c3RvbS1mb3JtLTItLWNhbGN1bGF0aW9uIC5mb3JtX19ib2R5JykuZm9yRWFjaChpbml0Q2FsY3VsYXRpb25Gb3Jtcyk7XG5cbi8qIC0tLS0tLS0tLS0tLSAqL1xuXG5cblxuY29uc3QgbWF0ZXJpYWxzU2xpZGVyID0gbmV3IFN3aXBlcignLm1hdGVyaWFscy1zbGlkZXInLCB7XG4gIHNsaWRlc1BlclZpZXc6IDEsXG4gIGNzc01vZGU6IHRydWUsXG4gIG5hdmlnYXRpb246IHtcbiAgICBuZXh0RWw6ICcuc3dpcGVyLWJ1dHRvbi1uZXh0JyxcbiAgICBwcmV2RWw6ICcuc3dpcGVyLWJ1dHRvbi1wcmV2JyxcbiAgfSxcbiAgc3BlZWQ6IDAsXG4gIHdhdGNoU2xpZGVzUHJvZ3Jlc3M6IHRydWVcbn0pO1xuXG4vKiAtLS0tLS0tLS0tLS0g0KHQstGP0LfRjCDRgdC10LvQtdC60YLQsCDQuCDRgdC70LDQudC00LXRgNCwIC0tLS0tLS0tLS0tLSAqL1xuXG5jb25zdCBpbml0Q2FsY3VsYXRpb25NYXRlcmlhbFNlY3Rpb24gPSAoc2VjdGlvbikgPT4ge1xuICBjb25zdCBtYXRlcmlhbFNlbGVjdCA9IHNlY3Rpb24ucXVlcnlTZWxlY3Rvcignc2VsZWN0W25hbWU9XCJtYXRlcmlhbFwiXScpO1xuXG4gIG1hdGVyaWFsU2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICBsZXQgY3VycmVudE9wdGlvbkluZGV4O1xuXG4gICAgaWYgKG1hdGVyaWFsU2VsZWN0LnZhbHVlKSB7XG4gICAgICBjdXJyZW50T3B0aW9uSW5kZXggPSBtYXRlcmlhbFNlbGVjdC5xdWVyeVNlbGVjdG9yKGBbdmFsdWU9XCIke21hdGVyaWFsU2VsZWN0LnZhbHVlfVwiXWApLmRhdGFzZXQuaW5kZXg7XG4gICAgfVxuXG4gICAgbWF0ZXJpYWxzU2xpZGVyLnNsaWRlVG8oY3VycmVudE9wdGlvbkluZGV4LCAwKTtcbiAgfSk7XG5cbiAgbWF0ZXJpYWxzU2xpZGVyLm9uKCdyZWFsSW5kZXhDaGFuZ2UnLCAoKSA9PiB7XG4gICAgY29uc3QgdmFsdWUgPSBtYXRlcmlhbFNlbGVjdC5xdWVyeVNlbGVjdG9yKGBvcHRpb25bZGF0YS1pbmRleD1cIiR7bWF0ZXJpYWxzU2xpZGVyLnJlYWxJbmRleH1cIl1gKS52YWx1ZTtcblxuICAgIGlmIChtYXRlcmlhbFNlbGVjdC52YWx1ZSA9PT0gdmFsdWUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBtYXRlcmlhbFNlbGVjdC52YWx1ZSA9IHZhbHVlO1xuICAgIG1hdGVyaWFsU2VsZWN0LmRpc3BhdGNoRXZlbnQoY2hhbmdlRXZlbnQpO1xuICB9KTtcbn07XG5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jYWxjdWxhdGlvbi1tYXRlcmlhbCcpLmZvckVhY2goaW5pdENhbGN1bGF0aW9uTWF0ZXJpYWxTZWN0aW9uKTtcblxuLyogLS0tLS0tLS0tLS0tICovXG5cbi8qIC0tLS0tLS0tLS0tLSBuLWJhbm5lciBpbWcgcGFyYWxsYXggLS0tLS0tLS0tLS0tICovXG5cbmNvbnN0IGluaXRCYW5uZXJQYXJhbGxheEltZyA9IChpbWcpID0+IHtcbiAgY29uc3QgaW1nV3JhcHBlciA9IGltZy5wYXJlbnROb2RlO1xuXG4gIGNvbnN0IHNoaWZ0SW1nID0gKCkgPT4ge1xuICAgIGNvbnN0IGltZ1Njcm9sbFJhbmdlID0gaW1nLm9mZnNldEhlaWdodCAtIGltZ1dyYXBwZXIub2Zmc2V0SGVpZ2h0O1xuXG4gICAgaWYgKGltZ1Njcm9sbFJhbmdlIDw9IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBkaXN0YW5jZUZyb21UaGVUb3BPZlRoZVBhZ2UgPSBpbWdXcmFwcGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmJvdHRvbSArIHdpbmRvdy5wYWdlWU9mZnNldDtcbiAgICBjb25zdCBpbWdTY3JvbGzQoW9lZmZpY2llbnQgPSBpbWdTY3JvbGxSYW5nZSAvIGRpc3RhbmNlRnJvbVRoZVRvcE9mVGhlUGFnZTtcbiAgICBsZXQgdHJhbnNmb3JtWSA9IHdpbmRvdy5wYWdlWU9mZnNldCAqIGltZ1Njcm9sbNChb2VmZmljaWVudDtcblxuICAgIGlmICh0cmFuc2Zvcm1ZIDw9IDApIHtcbiAgICAgIHRyYW5zZm9ybVkgPSAwO1xuICAgIH0gZWxzZSBpZiAodHJhbnNmb3JtWSA+PSBpbWdTY3JvbGxSYW5nZSkge1xuICAgICAgdHJhbnNmb3JtWSA9IGltZ1Njcm9sbFJhbmdlO1xuICAgIH1cblxuICAgIGltZy5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlKC01MCUsIC0ke3RyYW5zZm9ybVl9cHgpYDtcbiAgfTtcblxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBzaGlmdEltZyk7XG59O1xuXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubi1iYW5uZXItLXBhcmFsbGF4LWJnIC5uLWJhbm5lcl9faW1nJykuZm9yRWFjaChpbml0QmFubmVyUGFyYWxsYXhJbWcpO1xuXG4vKiAtLS0tLS0tLS0tLS0gKi9cblxuIl0sImZpbGUiOiJuZXcuanMifQ==
