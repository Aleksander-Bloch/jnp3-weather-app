import { ThemeSwitcher } from "../../../themes/components/theme-switcher/index.jsx";
import { FaGithub } from "react-icons/fa";
import { FooterWrapper } from "./FooterWrapper.jsx";

export const Footer = () => {
  return (
    <FooterWrapper>
      <a href="https://github.com/Aleksander-Bloch/jnp3-weather-app" target="_blank" rel="noreferrer"><FaGithub/></a>
      <ThemeSwitcher/>
    </FooterWrapper>
  )
}