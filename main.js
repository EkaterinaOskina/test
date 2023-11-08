(() => {
  const options = ["Генетика", "Анатомия человека", "Вулканы", "Зимние виды спорта", "Радуга", "Индийская культура", "Пеший туризм", "Философия", "Вселенная", "Здоровые привычки", "Бабочки", "Белые медведи", "Экономика", "Финансовая грамотность", "Фотосинтез", "Промышленная революция"];

  // функция добавления обработчика для поля ввода темы урока
  function addEventListenerForLessonTopic() {
    const lessonTopic = document.getElementById('lesson-topic');
    lessonTopic.addEventListener('input', () => {
      if (lessonTopic.value.trim().length > 0) lessonTopic.classList.add('valid');
      else lessonTopic.classList.remove('valid');
    });
  }

  // функция добавления обработчика для кнопки очистки поля темы урока
  function addEventListenerForClearLessonTopicButton() {
    const clearLessonTopicButton = document.querySelector('.btn-clear');
    clearLessonTopicButton.addEventListener('click', () => {
      const lessonTopic = document.getElementById('lesson-topic');
      lessonTopic.value = "";
      lessonTopic.classList.remove('valid');
    });
  }

  // функция выбора варианта из выпадающего списка
  function chooseOption(option) {
    // option.classList.add('active');
    const select = document.querySelector('.form__select');
    const currentOption = select.querySelector('.select__current');
    currentOption.innerText = option.querySelector('.select__option--text').innerText;
    select.classList.remove('is-active');
  }

  // функция перехода на вариант в выпадающем списке по индексу элемента
  function goToOption(index) {
    const selectBody = document.querySelector('.select__body');

    const selectOption = selectBody.children[index];
    selectOption.classList.add('active');
    selectOption.focus();

    const currentText = document.querySelector('.select__current');
    currentText.innerText = selectOption.querySelector('.select__option--text').innerText;
  }

  // функция отметки активного варианта выпадающего списка по тому, что указано в текущем значении, если активных вариантов в данный момент нет
  function markActiveOption() {
    const select = document.querySelector('.form__select');
    const activeOption = select.querySelector('.active');
    if (!activeOption) {
      const currentOption = select.querySelector('.select__current');
      const selectOptions = select.querySelectorAll('.select__option');
      for (let i = 0; i < selectOptions.length; i++) {
        const selectOptionText = selectOptions[i].querySelector('.select__option--text');
        if (selectOptionText.innerText === currentOption.innerText) {
          selectOptions[i].classList.add('active');
          break;
        }
      }
    }
  }

  // функция добавления обработчиков для "шапки" выбора класса
  function addEventsListenerForSelectHeader() {
    const selectHeader = document.querySelector('.select__header');
    const selectBody = document.querySelector('.select__body');

    selectHeader.addEventListener('click', () => {
      selectHeader.parentElement.classList.toggle('is-active');
      markActiveOption();
    });

    selectHeader.addEventListener('keydown', (evt) => {
      if (evt.key === 'Enter') {
        selectHeader.parentElement.classList.toggle('is-active');
        markActiveOption();
      }
    });

    selectHeader.addEventListener('keydown', (evt) => {
      if (evt.key === 'Tab') {
        if (selectHeader.parentElement.classList.contains('is-active')) {
          selectHeader.parentElement.classList.remove('is-active');
          markActiveOption();
        }
      }
    });

    selectHeader.addEventListener('keydown', async (evt) => {
      if (evt.key === 'ArrowDown') {
        markActiveOption();
        let activeOption = selectBody.querySelector('.active');
        let indexActive = Array.from(activeOption.parentNode.children).indexOf(activeOption);
        if (indexActive >= 0 && indexActive < selectBody.childElementCount - 1) {
          activeOption.classList.remove('active');
          goToOption(++indexActive);
        }
      }
    });

    selectHeader.addEventListener('keydown', async (evt) => {
      if (evt.key === 'ArrowUp') {
        markActiveOption();
        let activeOption = selectBody.querySelector('.active');
        let indexActive = Array.from(activeOption.parentNode.children).indexOf(activeOption);
        if (indexActive > 0 && indexActive < selectBody.childElementCount) {
          activeOption.classList.remove('active');
          goToOption(--indexActive);
        }
      }
    });
  }

  // функция добавления обработчиков для вариантов в выпадающем списке выбора класса
  function addEventsListenerForSelectOptions() {
    const selectOptions = document.querySelectorAll('.select__option');
    selectOptions.forEach(option => {
      option.addEventListener('mouseover', () => {
        option.classList.add('active');
      });

      option.addEventListener('mouseout', () => {
        option.classList.remove('active');
      });

      option.addEventListener('click', () => {
        chooseOption(option);
      });

      option.addEventListener('keydown', (evt) => {
        if (evt.key === 'Enter') {
          chooseOption(option);
        }
      });

      option.addEventListener('keydown', (evt) => {
        if (evt.key === 'Tab') {
          chooseOption(option);
        }
      });

      option.addEventListener('keydown', (evt) => {
        if (evt.key === 'ArrowDown') {
          let index = Array.from(selectOptions).indexOf(option);
          if (index >= 0 && index < selectOptions.length - 1) {
            option.classList.remove('active');
            goToOption(++index);
          }
        }
      });

      option.addEventListener('keydown', (evt) => {
        if (evt.key === 'ArrowUp') {
          let index = Array.from(selectOptions).indexOf(option);
          if (index > 0 && index < selectOptions.length) {
            option.classList.remove('active');
            goToOption(--index);
          }
        }
      });
    });
  }

  // функция добавления обработчиков для блока выбора класса
  function addEventsListenerForSelect() {
    // добавляем обработчики для "шапки" выбора класса
    addEventsListenerForSelectHeader();

    // добавляем обработчики для вариантов в выпадающем списке выбора класса
    addEventsListenerForSelectOptions();
  }

  // функция добавления обработчиков на окно браузера
  function addEventsListenerDocument() {
    // закрытие выпадающего списка выбора класса при клике по любому месту экрана браузера, кроме блока выбора класса
    window.document.addEventListener('click', (evt) => {
      const select = document.querySelector('.form__select');
      const selectHeader = select.querySelector('.select__header');
      if (select.classList.contains('is-active') && !evt.composedPath().includes(select)) {
        select.classList.remove('is-active');
        selectHeader.focus();
      }
    });

    // закрытие выпадающего списка выбора класса по нажатию клавиши Escape
    window.document.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') {
        const select = document.querySelector('.form__select');
        const selectHeader = select.querySelector('.select__header');
        if (select.classList.contains('is-active')) {
          select.classList.remove('is-active');
          selectHeader.focus();
        }
      };
    });
  }

  // функция создания вариантов тем урока
  function createOptions(count) {
    const optionsList = document.querySelector('.options__list');
    const numberOptions = Math.min(optionsList.children.length + count, options.length);

    for (let i = optionsList.children.length; i < numberOptions; i++) {
      const optionsItem = document.createElement('li');
      optionsItem.classList.add('options__item');
      optionsItem.innerText = options[i];
      optionsItem.addEventListener('click', () => {
        const lessonTopic = document.getElementById('lesson-topic');
        lessonTopic.value = optionsItem.innerText;
        lessonTopic.classList.add('valid');
      });
      optionsList.append(optionsItem);
    }
  }

  // функция добавления обработчика для кнопки добавления новых вариантов тем урока
  function addEventListenerForAddOptionsButton() {
    const addOptionsButton = document.querySelector('.options__btn');
    addOptionsButton.addEventListener('click', () => {
      createOptions(9);
    });
  }

  // функция добавления обработчика для текстового поля ввода цели урока
  function addEventListenerForPurposeLessonBlock() {
    const purposeLesson = document.getElementById('purpose-lesson');
    const purposeLessonCounterFact = document.querySelector('.purpose-lesson__counter--fact');
    const nextButton = document.querySelector('.btn-next');

    purposeLesson.addEventListener('input', () => {
      purposeLessonCounterFact.innerText = purposeLesson.value.length;

      if (purposeLesson.value.length > 0) nextButton.disabled = false;
      else nextButton.disabled = true;

      if (purposeLesson.value.length > 200) purposeLesson.classList.add('invalid');
      else purposeLesson.classList.remove('invalid');
    });
  }

  function loadingPage() {
    // добавляем обработчик на поле ввода темы урока
    addEventListenerForLessonTopic();

    // добавляем обработчик на кнопку очистки поля темы урока
    addEventListenerForClearLessonTopicButton();

    // добавляем обработчики на блок выбора класса
    addEventsListenerForSelect();

    // функция добавления обработчиков на окно браузера
    addEventsListenerDocument();

    // создаем варианты тем урока
    createOptions(6);

    // добавляем обработчик на кнопку добавления новых вариантов тем урока
    addEventListenerForAddOptionsButton();

    // добавляем обработчик на текстовое поле ввода цели урока
    addEventListenerForPurposeLessonBlock();
  }

  window.loadingPage = loadingPage;
})();
