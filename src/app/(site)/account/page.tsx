"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useCart } from "@/lib/cart";
import styles from "./account.module.css";

interface OrderItem {
  id: string;
  productType: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  shape?: string;
  material?: string;
  size: { label?: string; wIn?: number; hIn?: number };
}

interface Order {
  id: string;
  track_id: string;
  created_at: string;
  total: number;
  items: OrderItem[];
}

export default function AccountPage() {
  const router = useRouter();
  const { addItem } = useCart();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(`/api/orders/mine/${user.id}`);
        const data = await res.json();
        setOrders(data.orders || []);
      } catch {
        setOrders([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const formatShape = (shape?: string) =>
    (shape || "").replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

  const formatMaterial = (material?: string) =>
    material ? material.charAt(0).toUpperCase() + material.slice(1) : "";

  const trackOrder = (trackId: string) => router.push(`/track/${trackId}`);

  const reorder = async (order: Order) => {
    for (const item of order.items) {
      await addItem(item as Parameters<typeof addItem>[0]);
    }
    router.push("/cart");
  };

  return (
    <div className={styles["account-page"]}>
      <section className={styles["account-hero"]}>
        <div className={styles["hero-container"]}>
          <div className={styles["hero-content"]}>
            <h1 className={styles["hero-title"]}>My Orders</h1>
            <p className={styles["hero-subtitle"]}>Track your custom stickers and mylar bags</p>
          </div>
        </div>
      </section>

      <section className={styles["orders-section"]}>
        <div className={styles["orders-container"]}>
          {loading ? (
            <div className={styles["loading-state"]}>
              <div className={styles["loading-spinner"]} />
              <p>Loading your orders...</p>
            </div>
          ) : orders.length === 0 ? (
            <div className={styles["empty-state"]}>
              <div className={styles["empty-icon"]}>📦</div>
              <h3>No orders yet</h3>
              <p>Start creating your custom stickers and mylar bags!</p>
              <Link href="/" className={styles["cta-button"]}>Browse Products</Link>
            </div>
          ) : (
            <div className={styles["orders-grid"]}>
              {orders.map((order) => (
                <div key={order.id} className={styles["order-card"]}>
                  <div className={styles["order-header"]}>
                    <div className={styles["order-info"]}>
                      <h3 className={styles["order-number"]}>Order #{order.track_id}</h3>
                      <span className={styles["order-status"]}>Completed</span>
                    </div>
                    <div className={styles["order-date"]}>
                      {new Date(order.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  </div>

                  <div className={styles["order-items"]}>
                    <h4>Items Ordered</h4>
                    <div className={styles["items-grid"]}>
                      {order.items.map((item) => (
                        <div key={item.id} className={styles["order-item-detailed"]}>
                          <div className={styles["item-header"]}>
                            <div className={styles["item-type-badge"]}>{item.productType}</div>
                            <div className={styles["item-quantity"]}>{item.quantity} pcs</div>
                          </div>
                          <div className={styles["item-specifications"]}>
                            <div className={styles["spec-row"]}>
                              <span className={styles["spec-label"]}>Size:</span>
                              <span className={styles["spec-value"]}>
                                {item.size.label} ({item.size.wIn}&quot; × {item.size.hIn}&quot;)
                              </span>
                            </div>
                            <div className={styles["spec-row"]}>
                              <span className={styles["spec-label"]}>Shape:</span>
                              <span className={styles["spec-value"]}>{formatShape(item.shape)}</span>
                            </div>
                            <div className={styles["spec-row"]}>
                              <span className={styles["spec-label"]}>Material:</span>
                              <span className={styles["spec-value"]}>{formatMaterial(item.material)}</span>
                            </div>
                            <div className={styles["spec-row"]}>
                              <span className={styles["spec-label"]}>Unit Price:</span>
                              <span className={styles["spec-value"]}>${item.unitPrice.toFixed(3)}</span>
                            </div>
                          </div>
                          <div className={styles["item-footer"]}>
                            <div className={styles["item-subtotal"]}>
                              <span className={styles["subtotal-label"]}>Subtotal:</span>
                              <span className={styles["subtotal-amount"]}>${item.subtotal}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={styles["order-footer"]}>
                    <div className={styles["order-total"]}>
                      <span className={styles["total-label"]}>Total:</span>
                      <span className={styles["total-amount"]}>${order.total}</span>
                    </div>
                    <div className={styles["order-actions"]}>
                      <button type="button" onClick={() => trackOrder(order.track_id)} className={styles["track-button"]}>
                        <span className={styles["button-icon"]}>📦</span>
                        Track Order
                      </button>
                      <button type="button" onClick={() => reorder(order)} className={styles["reorder-button"]}>
                        <span className={styles["button-icon"]}>🔄</span>
                        Reorder
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
