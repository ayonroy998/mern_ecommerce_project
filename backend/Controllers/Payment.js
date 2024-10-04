import {Payment} from "../Models/payment.js";
import paypal from "@paypal/checkout-server-sdk";
import dotenv from "dotenv";
dotenv.config();

const environment = new paypal.core.SandboxEnvironment(
  process.env.REACT_APP_PAYPAL_CLIENT_ID,
  process.env.REACT_APP_PAYPAL_CLIENT_SECRET
);

const client = new paypal.core.PayPalHttpClient(environment);

export const checkout = async (req, res) => {
  const { amount, cartItems, userShipping, userId } = req.body;
  console.log("Checkout request body:", req.body);

  if (!amount || isNaN(amount) || amount <= 0) {
    return res.status(400).json({ error: "Invalid amount." });
  }

  //order create
  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer("return=representation");
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: amount.toFixed(2),
        },
        description: `Order receipt ${Date.now()}`,
      },
    ],
  });

  try {
    const order = await client.execute(request);

    console.log("PayPal Order Created:", JSON.stringify(order.result, null, 2));

    const payment = new Payment({
      userId,
      amount,
      orderId: order.result.id,
      paymentStatus: "created",
      orderDate: new Date(),
      cartItems,
      shippingDetails: userShipping,
      payStatus: "created",
    });
    await payment.save();

    res.json({
      orderId: order.result.id,
      amount: amount,
      cartItems,
      userShipping,
      userId,
      payStatus: "created",
      links: order.result.links,
    });
  } catch (error) {
    console.error("PayPal Order Creation Error:", error);

    if (error.statusCode === 401) {
      return res
        .status(401)
        .json({ error: "Unauthorized access: invalid client credentials." });
    }

    res
      .status(500)
      .json({ error: "Error creating PayPal order", details: error.message });
  }
};

