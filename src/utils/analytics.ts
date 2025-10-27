// Extend the Window interface to include dataLayer and fbq
declare global {
  interface Window {
    dataLayer?: any[];
    fbq?: (...args: any[]) => void;
  }
}

interface ReportEventData {
  reportName: string;
  reportId: string;
  price: number;
  orderId?: string;
}

type EventType = "select" | "purchase";

export const trackReportEvent = (
  eventType: EventType,
  { reportName, reportId, price, orderId }: ReportEventData
): void => {
  if (typeof window === "undefined") return;

  switch (eventType) {
    case "select":
      if (window.dataLayer) {
        window.dataLayer.push({
          event: "select_item",
          ecommerce: {
            items: [
              {
                item_name: reportName,
                item_id: reportId,
                price: Number(price),
                currency: "INR",
              },
            ],
          },
        });
      }
      if (window.fbq) {
        window.fbq("track", "AddToCart", {
          value: Number(price),
          currency: "INR",
          contents: [{ id: reportId, name: reportName, quantity: 1 }],
          content_type: "report",
        });
      }
      break;

    case "purchase":
      if (window.dataLayer) {
        window.dataLayer.push({
          event: "purchase",
          ecommerce: {
            transaction_id: orderId,
            affiliation: "Life Reports",
            value: Number(price),
            currency: "INR",
            items: [
              {
                item_name: reportName,
                item_id: reportId,
                price: Number(price),
                quantity: 1,
              },
            ],
          },
        });
      }
      if (window.fbq) {
        // send orderId as event_id for deduplication
        window.fbq(
          "track",
          "Purchase",
          {
            value: Number(price),
            currency: "INR",
            contents: [{ id: reportId, name: reportName, quantity: 1 }],
            content_type: "report",
          },
          orderId
        );
      }
      break;

    default:
      console.warn("Unknown eventType passed to trackReportEvent:", eventType);
  }
};
