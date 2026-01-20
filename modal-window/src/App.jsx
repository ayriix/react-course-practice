import { useState } from "react";
import "./index.css";
import Main from "./components/Main";
import Modal from "./components/Modal";
import Button from "./components/Button";
// 1. Создайте отдельные компоненты:
//    - Button: универсальный компонент кнопки.
//    - Modal: универсальный компонент модального окна.
//    - Main: компонент, представляющий основное содержимое приложения.

// 2. Разместите файлы компонентов:
//    - Поместите компоненты Button, Modal и Main в отдельные файлы внутри папки src/components.

// 3. Экспортируйте и импортируйте компоненты:
//    - Экспортируйте Button, Modal и Main из их файлов.
//    - Импортируйте эти компоненты в тех местах, где они используются.

// 4. Создайте универсальный компонент Button:
//    - Настройте компонент так, чтобы он:
//      - Принимал проп `children` для отображения текста внутри кнопки.
//      - Принимал проп для изменения CSS-класса кнопки:
//          - Например, класс "button" для одной стилизации и "closeButton" для другой.
//      - Позволял добавлять разные функции в `onClick` (например, для закрытия модального окна).

// 5. Создайте универсальный компонент Modal:
//    - Настройте модальное окно с помощью следующих пропсов:
//      - `title`: текст заголовка окна.
//      - `content`: содержимое окна (текст или компоненты).
//      - `showCloseButton`: флаг, который управляет отображением кнопки закрытия.

// 6. Создайте функцию в App:
//    - Напишите функцию в компоненте App, которую можно передавать через пропсы в компонент Button.
//    - Эта функция будет выполнять какое-либо действие, например, открывать или закрывать модальное окно.

// 7. Избавьтесь от "prop drilling":
//    - Используйте технику component composition, чтобы передавать данные и функции напрямую между компонентами.
//    - Это поможет избежать передачи пропсов через промежуточный компонент Main.

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal() {
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
  }
  function alertModal() {
    setIsModalOpen(false);
    alert("OK");
  }

  return (
    <div className="app">
      <Main
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        alertModal={alertModal}
        openModal={openModal}
      >
        <Modal
          setIsModalOpen={setIsModalOpen}
          closeModal={closeModal}
          alertModal={alertModal}
          content="Are you sure you want to proceed? This action cannot be
          undone."
          title="Confirm Your Action"
          showCloseButton
        >
          <Button variant={"closeButton"} handleClick={closeModal}>
            &times;
          </Button>
          <Button variant={"secondaryButton"} handleClick={closeModal}>
            Cancel
          </Button>
          <Button variant={"primaryButton"} handleClick={alertModal}>
            Yes, Continue
          </Button>
        </Modal>
      </Main>
    </div>
  );
}

export default App;
