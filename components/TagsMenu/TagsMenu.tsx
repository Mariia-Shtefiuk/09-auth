"use client";

import css from "./TagsMenu.module.css";
import { getTagsClient } from "@/lib/api/clientApi";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function TagsMenu() {
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    getTagsClient().then((data) => setTags(data));
  }, []);

  const toggle = () => setIsNotesOpen(!isNotesOpen);

  return (
    <div className={css.menuContainer}>
      <button className={css.menuButton} onClick={toggle}>
        Notes ▾
      </button>
      {isNotesOpen && (
        <ul className={css.menuList}>
          <li className={css.menuItem}>
            <Link
              href="/notes/filter/All"
              onClick={toggle}
              className={css.menuLink}
            >
              All
            </Link>
          </li>
          {tags.map((tag) => (
            <li key={tag} className={css.menuItem}>
              <Link
                href={`/notes/filter/${tag}`}
                onClick={toggle}
                className={css.menuLink}
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
