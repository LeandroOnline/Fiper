import "./Footer.css";
import linkedin from "../assets/linkedin.png";
import github from "../assets/github.png";
import whatsapp from "../assets/whatsapp.png";

const Footer = () => {
  return (
    <div className="footerContainer">
      <p>© 2023, Made with ❤️ by Leandro Savat</p>
      <a href="https://www.linkedin.com/in/leandrosavat/" target="_blank">
        <img className="footerIcons" src={linkedin} alt="" />
      </a>
      <a href="https://github.com/LeandroOnline" target="_blank">
        <img className="footerIcons" src={github} alt="" />
      </a>
      <a href="https://wa.me/543435267411" target="_blank">
        <img className="footerIcons" src={whatsapp} alt="" />
      </a>

    </div>
  );
};
export default Footer;
