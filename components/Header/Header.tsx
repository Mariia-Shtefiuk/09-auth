import Link from "next/link";
import css from "./Header.module.css";
import AuthNavigation from "../AuthNavigation/AuthNavigation";
import TagsMenu from "../TagsMenu/TagsMenu";

export default function Header() {
  return (
    <header className={css.header}>
      <Link href={"/"} aria-label="Home" className={css.headerLink}>
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link href={"/"} className={css.headerLink}>
              Home
            </Link>
          </li>

          <TagsMenu />

          <AuthNavigation />
        </ul>
      </nav>
    </header>
  );
}
