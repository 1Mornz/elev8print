"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart";
import { getSupabase } from "@/lib/supabase";
import styles from "./navbar.module.css";

export default function Navbar() {
  const router = useRouter();
  const cart = useCart();
  const navbarRef = useRef<HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const supabase = getSupabase();

    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((open) => !open);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  const handleLoginClick = useCallback(() => {
    closeMobileMenu();
    router.push(isLoggedIn ? "/account" : "/login");
  }, [closeMobileMenu, isLoggedIn, router]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(e.target as Node)
      ) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const cartCount = cart.state.items.length;

  return (
    <nav className={styles.navbar} ref={navbarRef}>
      <div className={styles.navContainer}>
        <button
          type="button"
          className={
            mobileMenuOpen
              ? `${styles.mobileMenuBtn} ${styles.mobileMenuBtnActive}`
              : styles.mobileMenuBtn
          }
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          <span className={styles.hamburger} />
          <span className={styles.hamburger} />
          <span className={styles.hamburger} />
        </button>

        <Link className={styles.logo} href="/" onClick={closeMobileMenu}>
          <img src="/logo.png" alt="ELEV8 PRINT" className={styles.logoImg} />
        </Link>

        <div
          className={
            mobileMenuOpen
              ? `${styles.navLinks} ${styles.mobileOpen}`
              : styles.navLinks
          }
        >
          <Link
            href="/sticker-maker"
            className={styles.navLink}
            onClick={closeMobileMenu}
          >
            <span className={styles.linkText}>Stickers &amp; Labels</span>
          </Link>
          <Link
            href="/mylar-maker"
            className={styles.navLink}
            onClick={closeMobileMenu}
          >
            <span className={styles.linkText}>Mylar Bags</span>
          </Link>
          <Link
            href="/materials"
            className={styles.navLink}
            onClick={closeMobileMenu}
          >
            <span className={styles.linkText}>Materials</span>
          </Link>
          <Link
            href="/contact"
            className={styles.navLink}
            onClick={closeMobileMenu}
          >
            <span className={styles.linkText}>Contact Us</span>
          </Link>
        </div>

        <div className={styles.navActions}>
          <Link
            className={styles.actionBtn}
            href="/track"
            title="Track Order"
            onClick={closeMobileMenu}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </Link>

          <button
            type="button"
            className={styles.loginBtn}
            onClick={handleLoginClick}
            title={isLoggedIn ? "Account" : "Login"}
          >
            {!isLoggedIn ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <polyline points="10,17 15,12 10,7" />
                <line x1="15" y1="12" x2="3" y2="12" />
              </svg>
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            )}
          </button>

          <Link
            className={`${styles.actionBtn} ${styles.cartBtn}`}
            href="/cart"
            title="Shopping Cart"
            onClick={closeMobileMenu}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L5 3H3m4 10v6a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-6" />
            </svg>
            {cartCount > 0 && (
              <span className={styles.cartBadge}>{cartCount}</span>
            )}
          </Link>
        </div>
      </div>

      <div
        className={
          mobileMenuOpen
            ? `${styles.mobileOverlay} ${styles.mobileOverlayActive}`
            : styles.mobileOverlay
        }
        onClick={toggleMobileMenu}
        aria-hidden="true"
      />
    </nav>
  );
}
