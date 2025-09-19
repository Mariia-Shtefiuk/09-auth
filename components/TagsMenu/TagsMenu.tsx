"use client";

import css from "./TagsMenu.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getCategories, Tags } from "@/lib/api/clientApi";

const TagsMenu = () => {
  const [isNotesOpen, setIsNotesOpen] = useState<boolean>(false);
  const [categories, setCategories] = useState<Tags[]>([]);

  const handleClick = () => setIsNotesOpen(!isNotesOpen);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  return (
    <div className={css.menuContainer}>
      <button className={css.menuButton} onClick={handleClick}>
        Notes {isNotesOpen ? "▾" : "▴"}
      </button>
      {isNotesOpen && categories && (
        <ul className={css.menuList}>
          {categories.map((category) => (
            <li key={category} className={css.menuItem}>
              <Link
                href={"/notes/filter" + category}
                scroll={false}
                className={css.menuLink}
                onClick={() => setIsNotesOpen(false)}
              >
                {category}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TagsMenu;
