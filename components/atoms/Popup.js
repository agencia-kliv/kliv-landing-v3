import { MdArrowBack } from "react-icons/md";

const Popup = ({ isOpen, closePopup, ...props }) => {
  const handleClickOutside = (e) => {
    if (e.target.id === "popup") {
      closePopup();
    }
  };

  return (
    <main
      className={`${
        isOpen === true ? "flex" : "hidden"
      } fixed w-[100vw] h-[100vh] bg-[#00000055] grid place-items-center z-[100] top-0 left-0`}
      onClick={handleClickOutside}
      id="popup"
    >
      <div
        className={`h-[100vh] sm:max-h-[90vh] max-w-[618px] relative overflow-y-auto bg-white sm:rounded-[10px] z-[200]`}
      >
        <header className="pt-[20px] pb-[20px] px-[20px] sticky top-0 left-0 backdrop-blur-[5px] bg-[#ffffffEE]">
          <span
            onClick={closePopup}
            className="flex max-w-max text-[24px] cursor-pointer"
          >
            <MdArrowBack />
          </span>
        </header>
        <section className="pb-[30px] px-[20px]">{props.children}</section>
      </div>
    </main>
  );
};

export default Popup;
