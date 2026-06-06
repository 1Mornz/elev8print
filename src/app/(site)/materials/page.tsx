"use client";

import styles from "./materials.module.css";

const MATERIALS = [
  {
    id: 1,
    name: "Matte Vinyl",
    description: "Premium matte finish vinyl with excellent printability and smooth application. Perfect for professional signage with a sophisticated non-reflective finish.",
    durability: 85,
    durabilityText: "High",
    longevity: "4-6 years",
    weatherResistant: true,
    primaryUse: "Outdoor Signage",
    applications: ["Signs", "Banners", "Vehicle graphics"],
    iconClass: "icon-matte",
  },
  {
    id: 2,
    name: "Holographic",
    description: "Eye-catching holographic vinyl that creates stunning rainbow effects and prismatic patterns. Perfect for attention-grabbing applications.",
    durability: 75,
    durabilityText: "Medium-High",
    longevity: "3-5 years",
    weatherResistant: true,
    primaryUse: "Special Effects",
    applications: ["Promotional stickers", "Brand accents", "Decorative elements"],
    iconClass: "icon-holographic",
  },
  {
    id: 3,
    name: "Clear",
    description: "Crystal clear vinyl perfect for window applications and transparent overlays. Maintains transparency while providing excellent adhesion.",
    durability: 80,
    durabilityText: "High",
    longevity: "4-6 years",
    weatherResistant: true,
    primaryUse: "Windows & Glass",
    applications: ["Windows", "Glass doors", "Transparent overlays"],
    iconClass: "icon-clear",
  },
  {
    id: 4,
    name: "Window Perf",
    description: "Perforated window vinyl that allows one-way visibility while maintaining graphics on the outside. Perfect for vehicle windows and storefront advertising.",
    durability: 70,
    durabilityText: "Medium-High",
    longevity: "2-4 years",
    weatherResistant: true,
    primaryUse: "Vehicle Windows",
    applications: ["Car windows", "Store windows", "Privacy graphics"],
    iconClass: "icon-window-perf",
  },
  {
    id: 5,
    name: "Heat Transfer (Clothing)",
    description: "Specialized vinyl designed for fabric application using heat press. Durable, flexible, and washable for custom apparel and textile projects.",
    durability: 65,
    durabilityText: "Medium",
    longevity: "2-3 years",
    weatherResistant: false,
    primaryUse: "Apparel",
    applications: ["T-shirts", "Hoodies", "Bags", "Fabric items"],
    iconClass: "icon-heat-transfer",
  },
  {
    id: 6,
    name: "Wall Stickers",
    description: "Removable adhesive vinyl perfect for interior decoration and temporary applications. Easy to apply and remove without damaging surfaces.",
    durability: 60,
    durabilityText: "Medium",
    longevity: "1-3 years",
    weatherResistant: false,
    primaryUse: "Interior Decor",
    applications: ["Wall decals", "Room decoration", "Temporary signage"],
    iconClass: "icon-wall-stickers",
  },
];

export default function MaterialsPage() {
  return (
    <div className={styles["materials-page"]}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1>Our Premium Materials</h1>
          <p>Discover the perfect material for your project with our comprehensive guide to durability, longevity, and applications.</p>
        </div>
      </section>

      <section className={styles["materials-section"]}>
        <div className={styles.container}>
          <div className={styles["materials-grid"]}>
            {MATERIALS.map((material) => (
              <div key={material.id} className={styles["material-card"]}>
                <div className={styles["material-icon"]}>
                  <div className={styles[material.iconClass]} />
                </div>
                <h3>{material.name}</h3>
                <p className={styles.description}>{material.description}</p>
                <div className={styles.specs}>
                  <div className={styles["spec-item"]}>
                    <span className={styles["spec-label"]}>Durability</span>
                    <div className={styles["durability-bar"]}>
                      <div className={styles["durability-fill"]} style={{ width: `${material.durability}%` }} />
                    </div>
                    <span className={styles["spec-value"]}>{material.durabilityText}</span>
                  </div>
                  <div className={styles["spec-item"]}>
                    <span className={styles["spec-label"]}>Longevity</span>
                    <div className={styles["longevity-info"]}>
                      <span className={styles["longevity-years"]}>{material.longevity}</span>
                    </div>
                  </div>
                  <div className={styles["spec-item"]}>
                    <span className={styles["spec-label"]}>Best For</span>
                    <div className={styles.applications}>
                      {material.applications.map((app) => (
                        <span key={app} className={styles["application-tag"]}>{app}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles["comparison-section"]}>
        <div className={styles.container}>
          <h2>Material Comparison</h2>
          <div className={styles["comparison-table"]}>
            <div className={styles["table-header"]}>
              <div className={styles["header-cell"]}>Material</div>
              <div className={styles["header-cell"]}>Durability</div>
              <div className={styles["header-cell"]}>Longevity</div>
              <div className={styles["header-cell"]}>Weather Resistant</div>
              <div className={styles["header-cell"]}>Best Use</div>
            </div>
            {MATERIALS.map((material) => (
              <div key={material.id} className={styles["table-row"]}>
                <div className={`${styles["table-cell"]} ${styles["material-name"]}`}>
                  <div className={`${styles[material.iconClass]} ${styles["small-icon"]}`} />
                  {material.name}
                </div>
                <div className={styles["table-cell"]}>
                  <div className={styles["mini-durability-bar"]}>
                    <div className={styles["mini-durability-fill"]} style={{ width: `${material.durability}%` }} />
                  </div>
                </div>
                <div className={styles["table-cell"]}>{material.longevity}</div>
                <div className={styles["table-cell"]}>
                  <span className={material.weatherResistant ? styles.yes : styles.no}>
                    {material.weatherResistant ? "Yes" : "Limited"}
                  </span>
                </div>
                <div className={styles["table-cell"]}>{material.primaryUse}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
