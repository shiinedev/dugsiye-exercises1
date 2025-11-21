import { inngest } from "@/app/inngest/client";
import { User } from "lucide-react";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  //create order event
  await inngest.send({
    name: "order/create",
    data: {
      userId: body?.userId,
      orderId: body?.orderId,
      items: body?.items || [],
    },
  });

  await new Promise((resolve) => setTimeout(resolve, 1000));
  // accept payment event
  await inngest.send({
    name: "payment/accept",
    data: {
      userId: body?.userId,
    },
  });

  return NextResponse.json({
    message: "Order created successfully",
    success: true,
    order: {
      userId: body?.userId,
      orderId: body?.orderId,
      items: body?.items || [],
    },
  });
}
