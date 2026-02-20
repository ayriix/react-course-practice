import Button from "./Button";
export default function Main({ isModalOpen, openModal, children, title }) {
  return (
    <>
      <h1 className="title">{title}</h1>
      <Button variant="button" handleClick={openModal}>
        Open modal
      </Button>
      {isModalOpen && children}
    </>
  );
}
