import React, { useEffect } from "react";
import { BsBagCheckFill } from "react-icons/bs";
import Link from "next/link";
import { useRouter } from "next/router";
import { client } from "@/lib/client";

function Success() {
  const router = useRouter();

  const sessionId = router.query.session_id;

  const handlePaymentSuccess = async (sessionID: any) => {
    try {
      const response = await fetch("/api/payment-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionID }),
      });

      if (response.ok) {
        const paymentDetails = await response.json();
        const paymentId = paymentDetails.payment_intent;

        const checkoutSessionString =
          localStorage.getItem("checkoutSession") || "";
        const checkoutSession = JSON.parse(checkoutSessionString);

        if (checkoutSession && paymentId && sessionId === checkoutSession.id) {
          const items = checkoutSession.items;
          // add to bought field in Sanity
          items.map((item: any) => {
            addToBoughtField(item.productId, item.amount, paymentId);
          });
        }
      } else {
        console.error("Failed to fetch payment details");
      }
    } catch (error) {
      console.error("Error fetching payment details:", error);
    }
    // remove so user cannot FORCE adding items to bought field
    // by going to success page with copy session id
    localStorage.removeItem("checkoutSession");
  };

  // Function to add a new item to the 'bought' field
  const addToBoughtField = async (
    productId: any,
    amount: any,
    orderNumber: string
  ) => {
    try {
      // Get today's date
      const date = new Date().toISOString();

      // Create the new data to be added to the 'bought' field
      const newData = {
        _key: orderNumber,
        name: orderNumber,
        amount,
        date,
      };

      // Use the Sanity client to update the document
      await client
        .patch(productId) // Use the product ID as the document ID to be updated
        .setIfMissing({ bought: [] }) // Make sure 'bought' field exists
        .insert("after", "bought[-1]", [newData]) // Insert the new data into the 'bought' field array
        .commit(); // Commit the changes

      console.log('Item added to the "bought" field successfully.');
    } catch (error) {
      console.error('Error adding item to "bought" field:', error);
    }
  };

  useEffect(() => {
    if (sessionId) {
      handlePaymentSuccess(sessionId);
    }
  }, [sessionId]);

  return (
    <div className="pt-10 h-screen">
      <div className="success bg-dark flex flex-col border-2 border-light p-20 justify-center items-center rounded-lg text-xl gap-5">
        <p className="icon text-4xl text-green-500">
          <BsBagCheckFill />
        </p>
        <h2 className="text-5xl font-semibold">Thank you for your order!</h2>
        <p className="email-msg">Check your email inbox for the receipt.</p>
        <p className="description">
          If you have any questions, please email
          <a className="email text-red pl-2" href="mailto:order@example.com">
            order@example.com
          </a>
        </p>
        <Link href="/">
          <button type="button" className="btn cursor-pointer w-[300px]">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Success;
