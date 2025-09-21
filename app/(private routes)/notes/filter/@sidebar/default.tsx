import Link from "next/link";
import css from "./SidebarNotes.module.css";
import { getCategories } from "@/lib/api/clientApi";

export default async function SidebarNotes() {
  const categories = await getCategories();

  return (
    <ul className={css.menuList}>
      <li className={css.menuItem}>
        <Link href={"/notes/action/create"} className={css.menuLink}>
          Create Note
        </Link>
      </li>
      {categories.map((category) => (
        <li key={category} className={css.menuItem}>
          <Link
            href={"/notes/filter/" + category}
            scroll={false}
            className={css.menuLink}
          >
            {category}
          </Link>
        </li>
      ))}
    </ul>
  );
}
