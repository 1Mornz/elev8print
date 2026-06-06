"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./home.module.css";

const TESTIMONIALS = [
  { image: "/testimonial_pictures/skeleton.png", alt: "Sarah's custom sticker", text: '"Amazing quality and super fast delivery!"', author: "@sardesi" },
  { image: "/testimonial_pictures/iphone.png", alt: "Mike's custom sticker", text: '"Got the job done quick and with quality!"', author: "@mikecreative" },
  { image: "/testimonial_pictures/smiley.png", alt: "Jenny's custom sticker", text: '"Perfect colors and the precision is incredible."', author: "@jartnow" },
  { image: "/testimonial_pictures/travel_scatter.png", alt: "Alex's custom sticker", text: '"Got the exact outcome that I was hoping for."', author: "@brandlex" },
  { image: "/testimonial_pictures/lisa_shop.png", alt: "Lisa's custom sticker", text: '"My go-to for all custom printing needs."', author: "@lisa_shop" },
  { image: "/testimonial_pictures/howdy.png", alt: "Tom's custom sticker", text: '"Highest quality printing service I\'ve used."', author: "@tslabs" },
  { image: "/testimonial_pictures/retro_vending.png", alt: "Emma's custom sticker", text: '"Professional results and lightning-fast turnaround."', author: "@ebiztd" },
  { image: "/testimonial_pictures/reptilian.png", alt: "David's custom sticker", text: '"I told them what I needed and they made it a reality."', author: "@dmaker" },
];

export default function HomePage() {
  const [currentDot, setCurrentDot] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const updateScrollDots = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;
    const maxScroll = container.scrollWidth - container.clientWidth;
    if (maxScroll <= 0) {
      setCurrentDot(0);
      return;
    }
    const scrollPercent = container.scrollLeft / maxScroll;
    if (scrollPercent < 0.33) setCurrentDot(0);
    else if (scrollPercent < 0.66) setCurrentDot(1);
    else setCurrentDot(2);
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    container.addEventListener("scroll", updateScrollDots);
    return () => container.removeEventListener("scroll", updateScrollDots);
  }, [updateScrollDots]);

  const scrollTestimonials = (direction: number) => {
    const container = scrollRef.current;
    if (!container) return;
    const cardWidth = 320;
    container.scrollBy({ left: cardWidth * 3 * direction, behavior: "smooth" });
    setTimeout(updateScrollDots, 300);
  };

  const scrollToDot = (dotIndex: number) => {
    const container = scrollRef.current;
    if (!container) return;
    const maxScroll = container.scrollWidth - container.clientWidth;
    container.scrollTo({ left: (maxScroll / 2) * dotIndex, behavior: "smooth" });
    setCurrentDot(dotIndex);
  };

  return (
    <div className={styles.home}>
      <section
        className={styles.hero}
        style={{
          backgroundImage: "url(/images/top_background.png)",
          backgroundSize: "cover",
          backgroundBlendMode: "color",
        }}
      >
        <div className={styles["hero-container"]}>
          <div
            className={styles["hero-content"]}
            style={{
              background: "linear-gradient(135deg, #a855f7 0%,#8b5cf6 50%,#6366f1 100%)",
              borderRadius: "25px",
              padding: "30px",
            }}
          >
            <h1 className={styles["hero-title"]}>
              Elevate your<br />
              ideas into print!
            </h1>
            <div className={styles["hero-rating"]}>
              <div className={styles.stars}>★★★★★</div>
              <span className={styles["rating-text"]}>4.8 out of 1,422 reviews</span>
            </div>
            <p className={styles["hero-description"]}>
              With Elev8 Print you can create custom stickers and premium mylar bags tailored to your exact specifications.
            </p>
            <div className={styles["hero-buttons"]}>
              <Link className={`${styles["cta-button"]} ${styles.primary}`} href="/sticker-maker">
                Make custom stickers
              </Link>
              <Link className={`${styles["cta-button"]} ${styles.secondary}`} href="/mylar-maker">
                Make Custom Bags →
              </Link>
            </div>
          </div>
          <div className={styles["hero-image"]} />
        </div>
      </section>

      <section className={styles["product-categories"]}>
        <div className={styles.container}>
          <div className={styles["category-grid"]}>
            <div className={styles["category-card"]}>
              <div className={`${styles["category-icon"]} ${styles["design-consultation"]}`} />
              <h3>Design Consultation</h3>
              <p>Free design assistance to bring your custom sticker and bag ideas to life</p>
            </div>
            <div className={styles["category-card"]}>
              <div className={`${styles["category-icon"]} ${styles["sticker-pack"]}`} />
              <h3>Custom Stickers</h3>
              <p>Personalized stickers in any shape, size, or design</p>
            </div>
            <div className={styles["category-card"]}>
              <div className={`${styles["category-icon"]} ${styles["transfer-sticker"]}`} />
              <h3>Custom Mylar Bags</h3>
              <p>Premium packaging solutions for your products</p>
              <span className={`${styles.badge} ${styles.new}`}>POPULAR</span>
            </div>
            <div className={styles["category-card"]}>
              <div className={`${styles["category-icon"]} ${styles["labels-roll"]}`} />
              <h3>Labels & Decals</h3>
              <p>Professional labels for branding and organization</p>
              <span className={`${styles.badge} ${styles.discount}`}>HOT</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.features}>
        <div className={styles.container}>
          <h2 className={styles["section-title"]}>Customize and create with confidence</h2>
          <p className={styles["section-subtitle"]}>
            Choose from custom stickers, premium mylar bags, and professional-grade materials.
          </p>
          <div className={styles["features-grid"]}>
            <div className={`${styles["feature-card"]} ${styles.large}`}>
              <div className={styles["feature-content"]}>
                <span className={styles["feature-tag"]}>DIE CUT</span>
                <h3>In any shape</h3>
                <p>Precision cut custom stickers to match your exact design</p>
              </div>
              <div className={styles["feature-visual"]}>
                <Image src="/images/shape.png" alt="Precision die-cut custom stickers in various shapes" width={200} height={200} style={{ height: 200, width: "auto" }} />
              </div>
            </div>
            <div className={`${styles["feature-card"]} ${styles.large}`}>
              <div className={styles["feature-content"]}>
                <span className={styles["feature-tag"]}>MYLAR BAGS</span>
                <h3>Premium Packaging</h3>
                <p>Custom mylar bags with your branding for professional product packaging.</p>
              </div>
              <div className={styles["feature-visual"]}>
                <Image src="/images/mylar.png" alt="Premium custom mylar bags with branding" width={200} height={200} style={{ height: "100%", width: "auto" }} />
              </div>
            </div>
            <div className={styles["feature-card"]}>
              <div className={styles["feature-content"]}>
                <span className={styles["feature-tag"]}>MATERIAL</span>
                <h3>What&apos;s your style?</h3>
                <p>Browse dozens of premium materials for stickers and bags</p>
              </div>
              <div className={styles["feature-visual"]}>
                <Image src="/images/style.png" alt="Variety of premium sticker materials and finishes" width={200} height={200} style={{ height: "100%", width: "auto" }} />
              </div>
            </div>
            <div className={styles["feature-card"]}>
              <div className={styles["feature-content"]}>
                <span className={styles["feature-tag"]}>CUSTOM</span>
                <h3>Made to order</h3>
                <p>Every sticker and bag is crafted specifically for your needs</p>
              </div>
              <div className={styles["feature-visual"]}>
                <Image src="/images/order.png" alt="Custom-made stickers and products being crafted" width={200} height={200} style={{ height: "100%", width: "auto" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.testimonials}>
        <div className={styles.container}>
          <h2 className={styles["section-title"]}>Stickers printed with Elev8</h2>
          <div className={styles["testimonials-container"]}>
            <div className={styles["testimonials-scroll"]} ref={scrollRef}>
              {TESTIMONIALS.map((t) => (
                <div key={t.author} className={styles["testimonial-card"]}>
                  <div className={styles["customer-sticker-image"]}>
                    <Image src={t.image} alt={t.alt} width={300} height={300} />
                  </div>
                  <div className={styles["testimonial-content"]}>
                    <div className={styles.stars}>★★★★★</div>
                    <p className={styles["testimonial-text"]}>{t.text}</p>
                    <div className={styles["testimonial-author"]}>{t.author}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles["scroll-indicators"]}>
              <button type="button" className={`${styles["scroll-btn"]} ${styles.prev}`} onClick={() => scrollTestimonials(-1)}>‹</button>
              <div className={styles["scroll-dots"]}>
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className={`${styles.dot} ${currentDot === i ? styles.active : ""}`}
                    onClick={() => scrollToDot(i)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && scrollToDot(i)}
                  />
                ))}
              </div>
              <button type="button" className={`${styles["scroll-btn"]} ${styles.next}`} onClick={() => scrollTestimonials(1)}>›</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
