import menuImg from "../media/header-menu-icon.svg";

export default function HeaderMenu() {
  function handleClick() {}
  return (
    <div className="hover:opacity-90" onClick={handleClick}>
      <img src={menuImg} alt="" />
      <div className="hidden"></div>
    </div>
  );
}
