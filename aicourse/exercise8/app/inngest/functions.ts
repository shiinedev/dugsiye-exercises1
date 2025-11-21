import { inngest } from "./client";

export const processOrder = inngest.createFunction(
  { id: "process-order", retries: 1 },
  { event: "order/create" },
  async ({ event, step }) => {
    const { userId, items ,orderId} = event.data;


    const processedOrder= await step.run("process-order", async () => {
      console.log(`Processing request: ${items}`);
      return { userId, status: "pending_approval", items ,orderId};
    });

    const waitPaymentAccept = await step.waitForEvent("wait-payment-accept", {
      event: "payment/accept",
      timeout: "1m",
      match: "data.userId", // Match on userId
    });

    if (!waitPaymentAccept) {
      return {
        message: "Payment not accepted in time",
        success: false,
        userId: userId,
        items: items,
      };
    } 
    return {
        message: "Payment accepted, order processed successfully",
        success: true,
        userId,
        items: items,
        orderId,
      };
    

  }
);

