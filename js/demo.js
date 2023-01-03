const closeNotification = (evt) => {
  const notificationCloseButton = evt.target.closest('.notification__close');

  if (!notificationCloseButton) {
    return;
  }

  notificationCloseButton.closest('.good-order-notification').remove();
};
document.body.addEventListener('click', closeNotification);

const goodLists = document.querySelectorAll('.good-list');
if (goodLists) {
  const addGoodToCart = (evt) => {
    const goodCartButton = evt.target.closest('.good__add-cart');

    if (!goodCartButton) {
      return;
    }

    const good = goodCartButton.closest('.good');
    good.classList.add('good--in-cart');
  };

  const removeFromCart = (evt) => {
    const goodCartButton = evt.target.closest('.good__remove-cart');

    if (!goodCartButton) {
      return;
    }

    const good = goodCartButton.closest('.good');
    good.classList.remove('good--in-cart');
  }

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

  const showGoodOrderNotification = (status, text) => {
    const notification = `
      <div class="good-order-notification">
        <div class="notification notification--alter notification--${status}">
          <p class="notification__text">${text}</p>
          <button class="notification__close" type="button">
            <span class="visually-hidden">Закрыть уведомление</span>
          </button>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', notification);
  }

  const submitQuickOrder = (evt) => {
    const goodQuickOrderSubmitButton = evt.target.closest('.good__submit-order');

    if (!goodQuickOrderSubmitButton) {
      return;
    }

    const good = goodQuickOrderSubmitButton.closest('.good');
    good.classList.remove('good--quick-order');
    showGoodOrderNotification('success', 'С вами свяжется менеджер для подтверждения заказа');
  };

  goodLists.forEach((list) => {
    list.addEventListener('click', submitQuickOrder);
    list.addEventListener('click', addGoodToCart);
    list.addEventListener('click', removeFromCart);
    list.addEventListener('click', quickOrderGood);
    list.addEventListener('click', cancelQuickOrder);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJkZW1vLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGNsb3NlTm90aWZpY2F0aW9uID0gKGV2dCkgPT4ge1xuICBjb25zdCBub3RpZmljYXRpb25DbG9zZUJ1dHRvbiA9IGV2dC50YXJnZXQuY2xvc2VzdCgnLm5vdGlmaWNhdGlvbl9fY2xvc2UnKTtcblxuICBpZiAoIW5vdGlmaWNhdGlvbkNsb3NlQnV0dG9uKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgbm90aWZpY2F0aW9uQ2xvc2VCdXR0b24uY2xvc2VzdCgnLmdvb2Qtb3JkZXItbm90aWZpY2F0aW9uJykucmVtb3ZlKCk7XG59O1xuZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlTm90aWZpY2F0aW9uKTtcblxuY29uc3QgZ29vZExpc3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdvb2QtbGlzdCcpO1xuaWYgKGdvb2RMaXN0cykge1xuICBjb25zdCBhZGRHb29kVG9DYXJ0ID0gKGV2dCkgPT4ge1xuICAgIGNvbnN0IGdvb2RDYXJ0QnV0dG9uID0gZXZ0LnRhcmdldC5jbG9zZXN0KCcuZ29vZF9fYWRkLWNhcnQnKTtcblxuICAgIGlmICghZ29vZENhcnRCdXR0b24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBnb29kID0gZ29vZENhcnRCdXR0b24uY2xvc2VzdCgnLmdvb2QnKTtcbiAgICBnb29kLmNsYXNzTGlzdC5hZGQoJ2dvb2QtLWluLWNhcnQnKTtcbiAgfTtcblxuICBjb25zdCByZW1vdmVGcm9tQ2FydCA9IChldnQpID0+IHtcbiAgICBjb25zdCBnb29kQ2FydEJ1dHRvbiA9IGV2dC50YXJnZXQuY2xvc2VzdCgnLmdvb2RfX3JlbW92ZS1jYXJ0Jyk7XG5cbiAgICBpZiAoIWdvb2RDYXJ0QnV0dG9uKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgZ29vZCA9IGdvb2RDYXJ0QnV0dG9uLmNsb3Nlc3QoJy5nb29kJyk7XG4gICAgZ29vZC5jbGFzc0xpc3QucmVtb3ZlKCdnb29kLS1pbi1jYXJ0Jyk7XG4gIH1cblxuICBjb25zdCBxdWlja09yZGVyR29vZCA9IChldnQpID0+IHtcbiAgICBjb25zdCBnb29kUXVpY2tPcmRlckJ1dHRvbiA9IGV2dC50YXJnZXQuY2xvc2VzdCgnLmdvb2RfX3F1aWNrLW9yZGVyLWJ1dHRvbicpO1xuXG4gICAgaWYgKCFnb29kUXVpY2tPcmRlckJ1dHRvbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGdvb2QgPSBnb29kUXVpY2tPcmRlckJ1dHRvbi5jbG9zZXN0KCcuZ29vZCcpO1xuICAgIGdvb2QuY2xhc3NMaXN0LmFkZCgnZ29vZC0tcXVpY2stb3JkZXInKTtcbiAgfTtcblxuICBjb25zdCBjYW5jZWxRdWlja09yZGVyID0gKGV2dCkgPT4ge1xuICAgIGNvbnN0IGdvb2RRdWlja09yZGVyQ2FuY2VsQnV0dG9uID0gZXZ0LnRhcmdldC5jbG9zZXN0KCcuZ29vZF9fY2FuY2VsLW9yZGVyJyk7XG5cbiAgICBpZiAoIWdvb2RRdWlja09yZGVyQ2FuY2VsQnV0dG9uKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgZ29vZCA9IGdvb2RRdWlja09yZGVyQ2FuY2VsQnV0dG9uLmNsb3Nlc3QoJy5nb29kJyk7XG4gICAgZ29vZC5jbGFzc0xpc3QucmVtb3ZlKCdnb29kLS1xdWljay1vcmRlcicpO1xuICB9O1xuXG4gIGNvbnN0IHNob3dHb29kT3JkZXJOb3RpZmljYXRpb24gPSAoc3RhdHVzLCB0ZXh0KSA9PiB7XG4gICAgY29uc3Qgbm90aWZpY2F0aW9uID0gYFxuICAgICAgPGRpdiBjbGFzcz1cImdvb2Qtb3JkZXItbm90aWZpY2F0aW9uXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJub3RpZmljYXRpb24gbm90aWZpY2F0aW9uLS1hbHRlciBub3RpZmljYXRpb24tLSR7c3RhdHVzfVwiPlxuICAgICAgICAgIDxwIGNsYXNzPVwibm90aWZpY2F0aW9uX190ZXh0XCI+JHt0ZXh0fTwvcD5cbiAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwibm90aWZpY2F0aW9uX19jbG9zZVwiIHR5cGU9XCJidXR0b25cIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidmlzdWFsbHktaGlkZGVuXCI+0JfQsNC60YDRi9GC0Ywg0YPQstC10LTQvtC80LvQtdC90LjQtTwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICAgIGRvY3VtZW50LmJvZHkuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBub3RpZmljYXRpb24pO1xuICB9XG5cbiAgY29uc3Qgc3VibWl0UXVpY2tPcmRlciA9IChldnQpID0+IHtcbiAgICBjb25zdCBnb29kUXVpY2tPcmRlclN1Ym1pdEJ1dHRvbiA9IGV2dC50YXJnZXQuY2xvc2VzdCgnLmdvb2RfX3N1Ym1pdC1vcmRlcicpO1xuXG4gICAgaWYgKCFnb29kUXVpY2tPcmRlclN1Ym1pdEJ1dHRvbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGdvb2QgPSBnb29kUXVpY2tPcmRlclN1Ym1pdEJ1dHRvbi5jbG9zZXN0KCcuZ29vZCcpO1xuICAgIGdvb2QuY2xhc3NMaXN0LnJlbW92ZSgnZ29vZC0tcXVpY2stb3JkZXInKTtcbiAgICBzaG93R29vZE9yZGVyTm90aWZpY2F0aW9uKCdzdWNjZXNzJywgJ9ChINCy0LDQvNC4INGB0LLRj9C20LXRgtGB0Y8g0LzQtdC90LXQtNC20LXRgCDQtNC70Y8g0L/QvtC00YLQstC10YDQttC00LXQvdC40Y8g0LfQsNC60LDQt9CwJyk7XG4gIH07XG5cbiAgZ29vZExpc3RzLmZvckVhY2goKGxpc3QpID0+IHtcbiAgICBsaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc3VibWl0UXVpY2tPcmRlcik7XG4gICAgbGlzdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFkZEdvb2RUb0NhcnQpO1xuICAgIGxpc3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCByZW1vdmVGcm9tQ2FydCk7XG4gICAgbGlzdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHF1aWNrT3JkZXJHb29kKTtcbiAgICBsaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2FuY2VsUXVpY2tPcmRlcik7XG4gIH0pO1xufVxuXG5jb25zdCBudW1iZXJGaWVsZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubnVtYmVyLWZpZWxkJyk7XG5pZiAobnVtYmVyRmllbGRzKSB7XG4gIGNvbnN0IHNldElucHV0V2lkdGggPSAoaW5wdXQpID0+IHtcbiAgICBpbnB1dC5zdHlsZS53aWR0aCA9IGlucHV0LnZhbHVlLmxlbmd0aCArIDEgKyAnY2gnO1xuICB9XG5cbiAgbnVtYmVyRmllbGRzLmZvckVhY2goKG51bWJlckZpZWxkKSA9PiB7XG4gICAgY29uc3QgbnVtYmVyQ29udHJvbCA9IG51bWJlckZpZWxkLnF1ZXJ5U2VsZWN0b3IoJy5udW1iZXItZmllbGRfX2NvbnRyb2wnKTtcblxuICAgIG51bWJlckZpZWxkLnF1ZXJ5U2VsZWN0b3IoJy5udW1iZXItZmllbGRfX2J1dHRvbi0tbWludXMnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIG51bWJlckNvbnRyb2wuc3RlcERvd24oKTtcbiAgICAgIHNldElucHV0V2lkdGgobnVtYmVyQ29udHJvbCk7XG4gICAgfSk7XG5cbiAgICBudW1iZXJGaWVsZC5xdWVyeVNlbGVjdG9yKCcubnVtYmVyLWZpZWxkX19idXR0b24tLXBsdXMnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIG51bWJlckNvbnRyb2wuc3RlcFVwKCk7XG4gICAgICBzZXRJbnB1dFdpZHRoKG51bWJlckNvbnRyb2wpO1xuICAgIH0pO1xuXG4gICAgbnVtYmVyQ29udHJvbC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsICgpID0+IHtcbiAgICAgIHNldElucHV0V2lkdGgobnVtYmVyQ29udHJvbCk7XG4gICAgfSk7XG4gIH0pO1xufVxuIl0sImZpbGUiOiJkZW1vLmpzIn0=
