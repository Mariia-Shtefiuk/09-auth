import Link from "next/link";
import css from "./Header.module.css";
import { Routes } from "@/config/routes";
import AuthNavigation from "../AuthNavigation/AuthNavigation";

const Header = async () => {
  return (
    <header className={css.header}>
      <Link href={Routes.Home} aria-label="Home">
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link href={Routes.Home}>Home</Link>
          </li>
          <AuthNavigation />
        </ul>
      </nav>
    </header>
  );
};

export default Header;
