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

  const popupGood = document.querySelector('.popup--good');

  if (popupGood) {
    openPopup(popupGood);
  }

  popups.forEach((popup) => {
    const popupCloseButton = popup.querySelector('.popup__close')
    popupCloseButton.addEventListener('click', closePopup.bind(null, popup));
  });
}

const numberFields = document.querySelectorAll('.number-field');

if (numberFields) {
  const setInputWidth = (input) => {
    input.style.width = input.value.length + 1 + 'ch';
  }

  numberFields.forEach((numberField) => {
    const numberControl = numberField.querySelector('.number-field__control');

    numberField.querySelector('.number-field__button--minus').addEventListener('click', () => {
      numberControl.stepDown();
      setInputWidth(numberControl);
    });

    numberField.querySelector('.number-field__button--plus').addEventListener('click', () => {
      numberControl.stepUp();
      setInputWidth(numberControl);
    });

    numberControl.addEventListener('input', () => {
      setInputWidth(numberControl);
    });
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

    if(!accordionButton) {
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

const closeNotification = (evt) => {
  const notificationCloseButton = evt.target.closest('.notification__close');

  if (!notificationCloseButton) {
    return;
  }

  notificationCloseButton.closest('.page-body__notification').remove();
};

document.body.addEventListener('click', closeNotification);

const goodList = document.querySelector('.good-list');

if (goodList) {
  const addGoodToCart = (evt) => {
    const goodCartButton = evt.target.closest('.good__cart-button');

    if (!goodCartButton) {
      return;
    }

    const good = goodCartButton.closest('.good');
    good.classList.add('good--in-cart');
  };

  const quickOrderGood = (evt) => {
    const goodQuickOrderButton = evt.target.closest('.good__quick-order-button');

    if (!goodQuickOrderButton) {
      return;
    }

    const good = goodQuickOrderButton.closest('.good');
    good.classList.add('good--quick-order');
  };

  const cancelQuickOrder = (evt) => {
    const goodQuickOrderCancelButton = evt.target.closest('.good__cancel-order');

    if (!goodQuickOrderCancelButton) {
      return;
    }

    const good = goodQuickOrderCancelButton.closest('.good');
    good.classList.remove('good--quick-order');
  };

  const submitQuickOrder = (evt) => {
    const goodQuickOrderSubmitButton = evt.target.closest('.good__submit-order');

    if (!goodQuickOrderSubmitButton) {
      return;
    }

    const good = goodQuickOrderSubmitButton.closest('.good');
    good.classList.remove('good--quick-order');
    good.classList.add('good--in-order');
  };

  goodList.addEventListener('click', submitQuickOrder);
  goodList.addEventListener('click', addGoodToCart);
  goodList.addEventListener('click', quickOrderGood);
  goodList.addEventListener('click', cancelQuickOrder);
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

if(productsSection) {
  (function() {

    // breakpoint where swiper will be destroyed
    // and switches to a dual-column layout
    const breakpoint = window.matchMedia('(min-width: 1440px)');
    const productsSwiper = document.querySelector('.products-swiper');
    const productsList = document.querySelector('.products__list');
    const productSlides = document.querySelectorAll('.products__item');

    // keep track of swiper instances to destroy later
    let productSwiper;
    const breakpointChecker = () => {

      // if larger viewport and multi-row layout needed
      if ( breakpoint.matches === true ) {

        // clean up old instances and inline styles when available
      if ( productSwiper !== undefined ) {
        productsSwiper.destroy(true,true);
        productsSwiper.classList.remove('swiper');
        productsList.classList.remove('swiper-wrapper');
        productSlides.forEach((slide) => {
          slide.classList.remove('swiper-slide');
        });
      }

      // or/and do nothing
      return;

        // else if a small viewport and single column layout needed
        } else if ( breakpoint.matches === false ) {

          // fire small viewport version of swiper
          return enableSwiper();

        }

    };

    const enableSwiper = () => {
      productsSwiper.classList.add('swiper');
      productsList.classList.add('swiper-wrapper');
      productSlides.forEach((slide) => {
        slide.classList.add('swiper-slide');
      });

      productSwiper = new Swiper ('.products-swiper', {
        slidesPerView: 'auto',
        grid: {
          rows: 2,
        },
        spaceBetween: 8,
        navigation: {
          nextEl: ".products__arrow--next",
          prevEl: ".products__arrow--back",
        },
      });

    };

    // keep an eye on viewport size changes
    window.addEventListener('resize', breakpointChecker);

    // kickstart
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
      1024: {
        spaceBetween: 20,
      },
    }
  })
};

const popGoodsSection = document.querySelector('.popular-goods');

if(popGoodsSection) {

  (function() {
    // breakpoint where swiper will be destroyed
    // and switches to a dual-column layout
    const breakpoint = window.matchMedia('(min-width: 1280px)');
    const popGoodsSwiper = document.querySelector('.popular-goods-swiper');
    const popGoodsList = document.querySelector('.popular-goods__list');
    const popGoodsSlides = document.querySelectorAll('.popular-goods__item');

    // keep track of swiper instances to destroy later
    let popGoodSwiper;
    const breakpointChecker = () => {

      // if larger viewport and multi-row layout needed
      if ( breakpoint.matches === true ) {

        // clean up old instances and inline styles when available
      if ( popGoodSwiper !== undefined ) {
        popGoodsSwiper.destroy(true,true);
        popGoodsSwiper.classList.remove('swiper');
        popGoodsList.classList.remove('swiper-wrapper');
        popGoodsSlides.forEach((slide) => {
          slide.classList.remove('swiper-slide');
        });
      }

      // or/and do nothing
      return;

        // else if a small viewport and single column layout needed
        } else if ( breakpoint.matches === false ) {

          // fire small viewport version of swiper
          return enableSwiper();

        }

    };

    const enableSwiper = () => {
      popGoodsSwiper.classList.add('swiper');
      popGoodsList.classList.add('swiper-wrapper');
      popGoodsSlides.forEach((slide) => {
        slide.classList.add('swiper-slide');
      });

      popGoodSwiper = new Swiper ('.popular-goods-swiper', {
        slidesPerView: 'auto',
        spaceBetween: 3,
        breakpoints: {
          768: {
            spaceBetween: 8,
          },
        },
        navigation: {
          nextEl: ".popular-goods__arrow--next",
          prevEl: ".popular-goods__arrow--back",
        },
      });

    };

    // keep an eye on viewport size changes
    window.addEventListener('resize', breakpointChecker);

    // kickstart
    breakpointChecker();
  })();
}

const popGoodList = document.querySelector('.popular-goods__list');

if (popGoodList) {
  const addGoodToCart = (evt) => {
    const goodCartButton = evt.target.closest('.good__cart-button');

    if (!goodCartButton) {
      return;
    }

    const good = goodCartButton.closest('.good');
    good.classList.add('good--in-cart');
  };

  const quickOrderGood = (evt) => {
    const goodQuickOrderButton = evt.target.closest('.good__quick-order-button');

    if (!goodQuickOrderButton) {
      return;
    }

    const good = goodQuickOrderButton.closest('.good');
    good.classList.add('good--quick-order');
  };

  const cancelQuickOrder = (evt) => {
    const goodQuickOrderCancelButton = evt.target.closest('.good__cancel-order');

    if (!goodQuickOrderCancelButton) {
      return;
    }

    const good = goodQuickOrderCancelButton.closest('.good');
    good.classList.remove('good--quick-order');
  };

  const submitQuickOrder = (evt) => {
    const goodQuickOrderSubmitButton = evt.target.closest('.good__submit-order');

    if (!goodQuickOrderSubmitButton) {
      return;
    }

    const good = goodQuickOrderSubmitButton.closest('.good');
    good.classList.remove('good--quick-order');
    good.classList.add('good--in-order');
  };

  popGoodList.addEventListener('click', submitQuickOrder);
  popGoodList.addEventListener('click', addGoodToCart);
  popGoodList.addEventListener('click', quickOrderGood);
  popGoodList.addEventListener('click', cancelQuickOrder);
}

const tileSwiper = document.querySelector('.tile-range');
if (tileSwiper) {
  let swiper = new Swiper ('.tile-range-swiper', {
    slidesPerView: 'auto',
    grid: {
      rows: 2,
    },
    spaceBetween: 10,
    navigation: {
      nextEl: ".tile-range__arrow--next",
      prevEl: ".tile-range__arrow--back",
    },
  });
};
