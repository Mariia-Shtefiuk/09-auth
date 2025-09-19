// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { checkServerSession } from "./lib/api/serverApi";

const privateRoutes = ["/profile", "/notes"];
const publicRoutes = ["/sign-in", "/sign-up"];

/**
 * Функція для встановлення cookie у NextResponse
 */
function setCookiesFromHeader(
  setCookieHeader: string | string[],
  res: NextResponse
) {
  const cookiesArray = Array.isArray(setCookieHeader)
    ? setCookieHeader
    : [setCookieHeader];

  cookiesArray.forEach((line) => {
    const [nameValue] = line.split(";");
    const [name, value] = nameValue.split("=");
    if (name && value) {
      res.cookies.set(name.trim(), value.trim());
    }
  });
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const isPrivate = privateRoutes.some((route) => pathname.startsWith(route));
  const isPublic = publicRoutes.some((route) => pathname.startsWith(route));

  // Якщо немає accessToken, але є refreshToken — пробуємо оновити сесію
  if (!accessToken && refreshToken) {
    try {
      const res = await checkServerSession();
      const setCookies = res.headers["set-cookie"];
      if (setCookies) {
        // Створюємо новий NextResponse
        const response = isPublic
          ? NextResponse.redirect(new URL("/profile", request.url))
          : NextResponse.next();

        // Встановлюємо отримані cookie
        setCookiesFromHeader(setCookies, response);

        return response;
      }
    } catch {
      // Якщо refreshToken не дійсний — редірект на логін
      if (isPrivate)
        return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  // Якщо немає токена і користувач намагається зайти на приватну сторінку
  if (!accessToken && isPrivate) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // Якщо користувач авторизований і намагається зайти на публічну сторінку
  if (accessToken && isPublic) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  // У всіх інших випадках пропускаємо запит далі
  return NextResponse.next();
}

// Вказуємо, які маршрути обробляє middleware
export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};
