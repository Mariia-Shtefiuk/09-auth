import Link from "next/link";
import css from "./Header.module.css";
import AuthNavigation from "../AuthNavigation/AuthNavigation";
import TagsMenu from "../TagsMenu/TagsMenu";
import { Tags } from "@/lib/api/clientApi";

export default function Header() {
  const categories: Tags[] = ["All", "Todo", "Work", "Personal", "Shopping"];
  return (
    <header className={css.header}>
      <Link href={"/"} aria-label="Home">
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link href={"/"}>Home</Link>
          </li>

          <li>
            <TagsMenu />
          </li>
          <AuthNavigation tags={categories} />
        </ul>
      </nav>
    </header>
  );
}
