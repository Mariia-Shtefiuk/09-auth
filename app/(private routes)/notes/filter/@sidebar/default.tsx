import Link from "next/link";
import css from "./SidebarNotes.module.css";
import { getCategories } from "@/lib/api/clientApi";
import { Routes } from "@/config/routes";

const SidebarNotes = async () => {
  const categories = await getCategories();

  return (
    <ul className={css.menuList}>
      <li className={css.menuItem}>
        <Link href={Routes.NoteCreate} className={css.menuLink}>
          Create Note
        </Link>
      </li>
      {categories.map((category) => (
        <li key={category} className={css.menuItem}>
          <Link
            href={Routes.NotesFilter + category}
            scroll={false}
            className={css.menuLink}
          >
            {category}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SidebarNotes;
