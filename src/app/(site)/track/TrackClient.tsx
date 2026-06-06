"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import styles from "./track.module.css";

interface OrderItem {
  id: string;
  productType: string;
  material?: string;
  quantity: number;
  subtotal: number;
  designFileUrl?: string;
  size: Record<string, unknown>;
}

interface OrderStatus {
  track_id: string;
  status: string;
  items: OrderItem[];
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  created_at: string;
  total: number;
  address_street: string;
  address_city: string;
  address_state: string;
  address_zip: string;
  order_notes?: string;
}

interface OrderStep {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  current: boolean;
  date: string | null;
}

function generateOrderSteps(currentStatus: string, createdAt?: string): OrderStep[] {
  const statusMap: Record<string, number> = {
    pending: 1,
    processing: 2,
    producing: 3,
    qc_check: 4,
    shipped: 5,
    delivered: 6,
  };
  const currentStep = statusMap[currentStatus.toLowerCase()] || 1;
  const steps = [
    { id: 1, title: "Order Received", description: "Your order has been received and is being processed" },
    { id: 2, title: "Processing", description: "Order details are being reviewed and prepared" },
    { id: 3, title: "In Production", description: "Your order is currently being manufactured" },
    { id: 4, title: "Quality Check", description: "Final quality inspection and packaging for shipment" },
    { id: 5, title: "Shipped", description: "Your order has been shipped and is on its way" },
    { id: 6, title: "Delivered", description: "Your order has been successfully delivered" },
  ];
  return steps.map((step) => ({
    ...step,
    completed: currentStep >= step.id,
    current: currentStep === step.id,
    date: currentStep >= step.id ? createdAt || null : null,
  }));
}

function formatSize(size: Record<string, unknown> | string | null | undefined) {
  if (!size) return "Custom Size";
  if (typeof size === "string") return size;
  if (size.hIn && size.wIn) return `${size.wIn}"×${size.hIn}"`;
  if (size.name) return String(size.name);
  if (size.label) return String(size.label);
  if (size.width && size.height) return `${size.width}×${size.height} ${size.unit || ""}`.trim();
  return "Custom Size";
}

function getProductTypeName(productType: string) {
  const typeMap: Record<string, string> = {
    sticker: "Custom Stickers",
    mylar: "Custom Mylar Bags",
  };
  return typeMap[productType] || productType;
}

function formatMaterial(material?: string) {
  if (!material) return "";
  return material.charAt(0).toUpperCase() + material.slice(1);
}

function formatDate(dateString?: string) {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function TrackClient({ trackId: initialTrackId }: { trackId?: string }) {
  const [orderId, setOrderId] = useState(initialTrackId || "");
  const [orderStatus, setOrderStatus] = useState<OrderStatus | null>(null);
  const [orderSteps, setOrderSteps] = useState<OrderStep[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const trackOrder = useCallback(async (id?: string) => {
    const trackValue = (id || orderId).trim();
    if (!trackValue) return;

    setLoading(true);
    setErrorMessage("");
    setOrderStatus(null);

    try {
      const res = await fetch(`/api/orders/track/${trackValue}`);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const data = await res.json();

      if (data?.order) {
        setOrderStatus(data.order);
        setOrderSteps(generateOrderSteps(data.order.status, data.order.created_at));
      } else {
        setErrorMessage("We couldn't find an order with that ID. Please check your order ID and try again.");
      }
    } catch {
      setErrorMessage("There was an error retrieving your order. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    if (initialTrackId) {
      setOrderId(initialTrackId);
      trackOrder(initialTrackId);
    }
  }, [initialTrackId, trackOrder]);

  const hasTrackId = Boolean(initialTrackId);

  return (
    <div className={styles["track-page"]}>
      <section className={styles.hero}>
        <div className={styles.container}>
          {!hasTrackId ? (
            <>
              <h1>Track Your Order</h1>
              <p>Enter your order ID to get real-time updates on your order status</p>
            </>
          ) : (
            <>
              <h1>Thank you for your order!</h1>
              <p>Be sure to keep an eye on your inbox for next steps.</p>
            </>
          )}
        </div>
      </section>

      <section className={styles["tracking-section"]}>
        <div className={styles.container}>
          {!hasTrackId && (
            <div className={styles["tracking-form"]}>
              <h2>Enter Order Details</h2>
              <div className={styles["form-group"]}>
                <label htmlFor="order-id">Order ID</label>
                <input
                  id="order-id"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="Enter your order ID (e.g., 012345)"
                  onKeyDown={(e) => e.key === "Enter" && trackOrder()}
                />
              </div>
              <button type="button" className={styles["track-btn"]} disabled={!orderId.trim() || loading} onClick={() => trackOrder()}>
                {loading ? "Searching..." : "Track Order"}
              </button>
            </div>
          )}

          {orderStatus && (
            <div className={styles["order-status"]}>
              <div className={styles["status-header"]}>
                <h3>Order #{orderStatus.track_id}</h3>
                <span className={`${styles["status-badge"]} ${styles[orderStatus.status.toLowerCase().replace(" ", "-")] || ""}`}>
                  {orderStatus.status.replaceAll("_", " ")}
                </span>
              </div>

              <div className={styles["progress-timeline"]}>
                {orderSteps.map((step, index) => (
                  <div
                    key={step.id}
                    className={`${styles["timeline-step"]} ${
                      step.completed ? styles.completed : step.current ? styles.current : styles.upcoming
                    }`}
                  >
                    <div className={styles["step-icon"]}>
                      <span>{step.completed ? "✓" : index + 1}</span>
                    </div>
                    <div className={styles["step-content"]}>
                      <h4>{step.title}</h4>
                      <p>{step.description}</p>
                      {step.date && <span className={styles["step-date"]}>{formatDate(step.date)}</span>}
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles["order-items"]}>
                <h4>Order Items</h4>
                {orderStatus.items.map((item) => (
                  <div key={item.id} className={styles["item-card"]}>
                    <div className={styles["item-info"]}>
                      <div className={styles["item-details"]}>
                        <span className={styles["product-type"]}>{getProductTypeName(item.productType)}</span>
                        {item.material && <span className={styles.material}>{formatMaterial(item.material)}</span>}
                        <span className={styles.size}>{formatSize(item.size)}</span>
                      </div>
                      <div className={styles["item-pricing"]}>
                        <span className={styles.quantity}>Qty: {item.quantity}</span>
                        <span className={styles.price}>${item.subtotal.toFixed(2)}</span>
                      </div>
                    </div>
                    {item.designFileUrl && (
                      <div className={styles["design-files"]}>
                        <span className={styles["files-label"]}>Design</span><br />
                        <div className={styles["file-links"]}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={item.designFileUrl} className={styles["file-link"]} height={75} alt="Design file" />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className={styles["customer-info"]}>
                <div className={styles["info-section"]}>
                  <h4>Customer Information</h4>
                  <div className={styles["info-grid"]}>
                    <div className={styles["info-item"]}>
                      <span className={styles.label}>Name:</span>
                      <span className={styles.value}>{orderStatus.customer_name}</span>
                    </div>
                    <div className={styles["info-item"]}>
                      <span className={styles.label}>Email:</span>
                      <span className={styles.value}>{orderStatus.customer_email}</span>
                    </div>
                    <div className={styles["info-item"]}>
                      <span className={styles.label}>Phone:</span>
                      <span className={styles.value}>{orderStatus.customer_phone || "Not provided"}</span>
                    </div>
                    <div className={styles["info-item"]}>
                      <span className={styles.label}>Order Date:</span>
                      <span className={styles.value}>{formatDate(orderStatus.created_at)}</span>
                    </div>
                    <div className={styles["info-item"]}>
                      <span className={styles.label}>Total:</span>
                      <span className={styles.value}>${orderStatus.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <div className={styles["info-section"]}>
                  <h4>Shipping Address</h4>
                  <div className={styles.address}>
                    <p>{orderStatus.address_street}</p>
                    <p>{orderStatus.address_city}, {orderStatus.address_state} {orderStatus.address_zip}</p>
                  </div>
                </div>
                {orderStatus.order_notes && (
                  <div className={styles["info-section"]}>
                    <h4>Order Notes</h4>
                    <p className={styles.notes}>{orderStatus.order_notes}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {errorMessage && (
            <div className={styles["error-message"]}>
              <h3>Order Not Found</h3>
              <p>{errorMessage}</p>
              <div className={styles["help-links"]}>
                <Link href="/contact">Contact Support</Link>
                <Link href="/faq">Check FAQ</Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
