"use client";

import { type Dispatch, type SetStateAction, useState } from "react";
import Image from "next/image";
import { useJourneyById } from "@/lib/hooks/useJourney";
import { useCreateTransferBooking } from "@/lib/hooks/useBooking";
import { useCreatePaypalOrder } from "@/lib/hooks/usePayment";
import { API_BASE_URL } from "@/lib/api/config";
import { savePaymentBookingContext } from "@/lib/utils/paymentBookingContext";
import { formatUsd } from "@/lib/utils/currency";
import { toast } from "sonner";

function resolveImageUrl(url: string): string {
  if (!url || url.trim() === "") return "";
  const trimmed = url.trim();
  if (trimmed.startsWith("http")) return trimmed;
  return `${API_BASE_URL}/${trimmed.replace(/^\//, "")}`;
}

type TransferBookingForm = {
  fullName: string;
  email: string;
  phone: string;
  tripType: number;
  passengers: string;
  pickupDate: string;
  pickupTime: string;
  returnDate: string;
  returnTime: string;
  flightNumber: string;
  pickupNotes: string;
  dropOffNotes: string;
};

type TransferFormProps = {
  data: TransferBookingForm;
  setData: Dispatch<SetStateAction<TransferBookingForm>>;
};

interface SingleTransferPageContentProps {
  id: string;
}

export default function SingleTransferPageContent({ id }: SingleTransferPageContentProps) {
  const { data: journey, isLoading, isError } = useJourneyById(id);
  const { mutate: createTransferBooking, isPending: isCreatingBooking } = useCreateTransferBooking();
  const { mutate: createPaypalOrder, isPending: isCreatingOrder } = useCreatePaypalOrder();

  const isPending = isCreatingBooking || isCreatingOrder;

  const [transferData, setTransferData] = useState<TransferBookingForm>({
    fullName: "",
    email: "",
    phone: "",
    tripType: 1, // 1 = One Way, 2 = Round Trip
    passengers: "",
    pickupDate: "",
    pickupTime: "",
    returnDate: "",
    returnTime: "",
    flightNumber: "",
    pickupNotes: "",
    dropOffNotes: "",
  });

  if (isLoading) {
    return <div className="p-20 text-center text-gray-500">Loading journey details...</div>;
  }

  if (isError || !journey) {
    return <div className="p-20 text-center text-red-500">Failed to load journey details.</div>;
  }

  const handleTransferSubmit = () => {
    if (
      !transferData.fullName.trim() ||
      !transferData.email.trim() ||
      !transferData.phone.trim() ||
      !transferData.passengers ||
      !transferData.pickupDate ||
      !transferData.pickupTime
    ) {
      toast.error("Please fill in your contact details, passengers, pickup date, and pickup time.");
      return;
    }

    if (transferData.tripType === 2 && (!transferData.returnDate || !transferData.returnTime)) {
      toast.error("Please enter the return date and return time for a round trip.");
      return;
    }

    createTransferBooking(
      {
        journeyId: id,
        tripType: transferData.tripType,
        passengers: Number(transferData.passengers),
        pickupDate: transferData.pickupDate,
        pickupTime: transferData.pickupTime,
        returnDate: transferData.tripType === 2 ? transferData.returnDate : null,
        returnTime: transferData.tripType === 2 ? transferData.returnTime : null,
        flightNumber: transferData.flightNumber,
        pickupNotes: transferData.pickupNotes,
        dropOffNotes: transferData.dropOffNotes,
        fullName: transferData.fullName,
        email: transferData.email,
        phone: transferData.phone,
      },
      {
        onSuccess: (res) => {
          const bookingId = res.data.bookingId;
          createPaypalOrder(
            { bookingId, bookingExtensionId: null },
            {
              onSuccess: (orderRes) => {
                localStorage.setItem("paypal_order_id", orderRes.orderId);
                savePaymentBookingContext({
                  kind: "transfer",
                  bookingId,
                  bookingNumber: res.data.bookingNumber,
                  journeyId: id,
                  journeyName: journey.name,
                  pickupDate: transferData.pickupDate,
                  pickupTime: transferData.pickupTime,
                  passengers: Number(transferData.passengers),
                });
                window.location.href = orderRes.approvalUrl;
              },
              onError: (err) => {
                console.error("Failed to create PayPal order:", err);
                toast.error("Could not initiate payment. Please try again.");
              },
            }
          );
        },
        onError: (err) => {
          console.error("Failed to create transfer booking:", err);
          toast.error("Failed to create transfer booking. Please check your details and try again.");
        },
      }
    );
  };

  const totals = [
    ["Ride Fare", formatUsd(journey.basePrice)],
  ];
  const dueToday = formatUsd(journey.basePrice);

  return (
    <main className="bg-[#f8f9fa] font-[var(--font-poppins)] text-[#0f172a]">
      <section className="px-5 pb-12 pt-[30px] lg:px-0 lg:pb-20 lg:pt-14">
        <div className="mx-auto max-w-[335px] lg:max-w-[1277px]">
          
          <header className="hidden h-[76px] flex-col items-start gap-2 pt-2 lg:flex">
            <h1 className="text-[30px] font-medium leading-9 text-[#0f172a]">Book Transfer: {journey.name}</h1>
            <p className="text-[16px] leading-6 text-[#475569]">
              Complete your details and payment to confirm your booking.
            </p>
          </header>

          <div className="lg:mt-6 lg:grid lg:grid-cols-[minmax(0,845px)_minmax(0,412px)] lg:items-start lg:gap-x-5">
            <div className="flex flex-col gap-8">
              <TransferCustomerInfo data={transferData} setData={setTransferData} />
              <TransferDetailsInfo data={transferData} setData={setTransferData} />
            </div>

            <aside className="mt-6 flex flex-col gap-6 lg:mt-0 lg:w-full">
              <div className="overflow-hidden rounded-xl border border-[#f1f5f9] bg-white shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
                <div className="border-b border-[#e5e7eb] p-6 pb-[17px]">
                  <h2 className="text-[20px] font-semibold leading-7 text-[#1b1b1c]">Booking Summary</h2>
                  
                  <div className="relative mt-4 h-[187.88px] overflow-hidden rounded-md bg-gray-100">
                    {journey.imageUrl && journey.imageUrl.trim() !== "" && (
                      <Image
                        src={resolveImageUrl(journey.imageUrl)}
                        alt={journey.name}
                        fill
                        className="object-cover"
                      />
                    )}
                    <span className="absolute right-2 top-2 rounded bg-[#3b82f6] px-2 py-1 text-[12px] font-medium leading-[17px] text-white">
                      Transfer
                    </span>
                  </div>

                  <h3 className="mt-3 text-[20px] font-semibold leading-7 text-[#1b1b1c]">{journey.name}</h3>
                  <div className="mt-2 flex items-center gap-[9px] text-[12px] leading-4 text-[#4d434f]">
                    <span>{journey.fromLocationName} &rarr; {journey.toLocationName}</span>
                  </div>

                  <dl className="mt-5 space-y-3 text-[12px] leading-[16.8px]">
                    <div className="flex items-center justify-between gap-5">
                      <dt className="font-medium text-[#4d434f]">Estimated Duration</dt>
                      <dd className="font-semibold text-[#1b1b1c]">{journey.estimatedDurationMinutes} minutes</dd>
                    </div>
                  </dl>
                </div>

                <div className="bg-[#f6f3f4] p-6">
                  <dl className="space-y-3 text-[12px] leading-[16.8px]">
                    {totals.map(([label, value]) => (
                      <div key={label} className="flex items-center justify-between gap-3">
                        <dt className="font-medium text-[#4d434f]">{label}</dt>
                        <dd className="whitespace-nowrap font-semibold text-[#1b1b1c]">{value}</dd>
                      </div>
                    ))}
                  </dl>
                  <div className="mt-6 flex items-center justify-between border-t border-[#e5e7eb] pt-[17px]">
                    <span className="text-[16px] font-semibold leading-7 text-[#1b1b1c] lg:text-[20px]">Total Due Today</span>
                    <span className="text-[16px] font-semibold leading-7 text-[#2e6f57] lg:text-[20px]">{dueToday}</span>
                  </div>
                </div>
              </div>

              <SectionCard className="p-[25px]">
                <SectionHeading>Payment Method</SectionHeading>
                <div className="mt-6 space-y-4">
                  <label className="flex h-[70px] items-center justify-between rounded-xl border border-[#cfb072] bg-[#fcf9f6] px-4 py-[17px]">
                    <input type="radio" name="payment-method" defaultChecked className="sr-only" />
                    <span className="flex items-center">
                      <span className="grid size-[18px] shrink-0 place-items-center rounded-full bg-[#cfb072]">
                        <div className="size-2 rounded-full bg-white" />
                      </span>
                      <span className="ml-3">
                        <span className="block text-[14px] font-medium leading-5 text-[#0f172a] lg:font-bold">Pay Now Online</span>
                        <span className="block text-[12px] leading-4 text-[#8a9a94]">Secure payment by PayPal</span>
                      </span>
                    </span>
                  </label>
                </div>
                
                <button
                  onClick={handleTransferSubmit}
                  disabled={isPending}
                  className="mt-[24px] flex h-12 w-full items-center justify-center gap-2 rounded-[48px] bg-[#2e6f57] text-[16px] font-medium leading-6 text-white transition hover:bg-[#255f49] lg:h-14 lg:font-bold disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isPending ? "Processing..." : "Pay Now & Confirm Booking"}
                </button>
              </SectionCard>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}

function TransferCustomerInfo({ data, setData }: TransferFormProps) {
  return (
    <SectionCard className="p-[25px]">
      <SectionHeading>Customer Information</SectionHeading>
      <div className="mt-6 grid gap-x-6 gap-y-[23.59px] lg:grid-cols-2">
        <label className="block">
          <span className="text-[14px] font-medium leading-5 text-[#4d434f]">Full Name</span>
          <input
            type="text"
            value={data.fullName}
            placeholder="Enter your full name"
            required
            onChange={(e) => setData({ ...data, fullName: e.target.value })}
            className="mt-2 h-[43.59px] w-full rounded-lg border border-[#cbd5e1] bg-white px-[13px] text-[14px] outline-none focus:border-[#2e6f57]"
          />
        </label>
        <label className="block">
          <span className="text-[14px] font-medium leading-5 text-[#4d434f]">Email Address</span>
          <input
            type="email"
            value={data.email}
            placeholder="name@example.com"
            required
            onChange={(e) => setData({ ...data, email: e.target.value })}
            className="mt-2 h-[43.59px] w-full rounded-lg border border-[#cbd5e1] bg-white px-[13px] text-[14px] outline-none focus:border-[#2e6f57]"
          />
        </label>
        <label className="block lg:col-span-2">
          <span className="text-[14px] font-medium leading-5 text-[#4d434f]">Phone Number</span>
          <input
            type="tel"
            value={data.phone}
            placeholder="+20 100 000 0000"
            required
            onChange={(e) => setData({ ...data, phone: e.target.value })}
            className="mt-2 h-[43.59px] w-full rounded-lg border border-[#cbd5e1] bg-white px-[13px] text-[14px] outline-none focus:border-[#2e6f57]"
          />
        </label>
      </div>
    </SectionCard>
  );
}

function TransferDetailsInfo({ data, setData }: TransferFormProps) {
  return (
    <SectionCard className="p-[25px]">
      <SectionHeading>Transfer Details</SectionHeading>
      <div className="mt-6 grid gap-x-6 gap-y-4 lg:grid-cols-2">
        <label className="block">
          <span className="text-[14px] font-bold text-[#4d434f]">Trip Type</span>
          <select
            value={data.tripType}
            onChange={(e) => setData({ ...data, tripType: parseInt(e.target.value) })}
            className="mt-2 h-[43.59px] w-full rounded-lg border border-[#cbd5e1] bg-white px-[13px] text-[14px] outline-none focus:border-[#2e6f57]"
          >
            <option value={1}>One Way</option>
            <option value={2}>Round Trip</option>
          </select>
        </label>
        <label className="block">
          <span className="text-[14px] font-bold text-[#4d434f]">Passengers</span>
          <input
            type="number"
            min="1"
            value={data.passengers}
            placeholder="Number of passengers"
            required
            onChange={(e) => setData({ ...data, passengers: e.target.value })}
            className="mt-2 h-[43.59px] w-full rounded-lg border border-[#cbd5e1] bg-white px-[13px] text-[14px] outline-none focus:border-[#2e6f57]"
          />
        </label>
        <label className="block">
          <span className="text-[14px] font-medium text-[#4d434f]">Pickup Date</span>
          <input
            type="date"
            value={data.pickupDate}
            required
            onChange={(e) => setData({ ...data, pickupDate: e.target.value })}
            className="mt-2 h-[43.59px] w-full rounded-lg border border-[#cbd5e1] bg-white px-[13px] text-[14px] outline-none focus:border-[#2e6f57]"
          />
        </label>
        <label className="block">
          <span className="text-[14px] font-medium text-[#4d434f]">Pickup Time</span>
          <input
            type="time"
            value={data.pickupTime}
            required
            onChange={(e) => setData({ ...data, pickupTime: e.target.value })}
            className="mt-2 h-[43.59px] w-full rounded-lg border border-[#cbd5e1] bg-white px-[13px] text-[14px] outline-none focus:border-[#2e6f57]"
          />
        </label>

        {data.tripType === 2 && (
          <>
            <label className="block">
              <span className="text-[14px] font-medium text-[#4d434f]">Return Date</span>
              <input
                type="date"
                value={data.returnDate}
                required
                onChange={(e) => setData({ ...data, returnDate: e.target.value })}
                className="mt-2 h-[43.59px] w-full rounded-lg border border-[#cbd5e1] bg-white px-[13px] text-[14px] outline-none focus:border-[#2e6f57]"
              />
            </label>
            <label className="block">
              <span className="text-[14px] font-medium text-[#4d434f]">Return Time</span>
              <input
                type="time"
                value={data.returnTime}
                required
                onChange={(e) => setData({ ...data, returnTime: e.target.value })}
                className="mt-2 h-[43.59px] w-full rounded-lg border border-[#cbd5e1] bg-white px-[13px] text-[14px] outline-none focus:border-[#2e6f57]"
              />
            </label>
          </>
        )}

        <label className="block lg:col-span-2">
          <span className="text-[14px] font-medium text-[#4d434f]">Flight Number (if applicable)</span>
          <input
            type="text"
            value={data.flightNumber}
            placeholder="Example: MS911"
            onChange={(e) => setData({ ...data, flightNumber: e.target.value })}
            className="mt-2 h-[43.59px] w-full rounded-lg border border-[#cbd5e1] bg-white px-[13px] text-[14px] outline-none focus:border-[#2e6f57]"
          />
        </label>

        <label className="block lg:col-span-2">
          <span className="text-[14px] font-medium text-[#4d434f]">Pickup Notes</span>
          <textarea
            value={data.pickupNotes}
            placeholder="Example: Please pick up from the hotel lobby."
            onChange={(e) => setData({ ...data, pickupNotes: e.target.value })}
            className="mt-2 w-full rounded-lg border border-[#cbd5e1] bg-white p-[13px] text-[14px] outline-none focus:border-[#2e6f57]"
            rows={2}
          />
        </label>
        
        <label className="block lg:col-span-2">
          <span className="text-[14px] font-medium text-[#4d434f]">Drop-off Notes</span>
          <textarea
            value={data.dropOffNotes}
            placeholder="Example: Drop off at Terminal 2 entrance."
            onChange={(e) => setData({ ...data, dropOffNotes: e.target.value })}
            className="mt-2 w-full rounded-lg border border-[#cbd5e1] bg-white p-[13px] text-[14px] outline-none focus:border-[#2e6f57]"
            rows={2}
          />
        </label>
      </div>
    </SectionCard>
  );
}

function SectionCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`rounded-xl border border-[#e5e7eb] bg-white shadow-[0_1px_1px_rgba(0,0,0,0.05)] ${className}`}>
      {children}
    </section>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="flex items-center gap-2 text-[16px] font-semibold leading-7 text-[#1b1b1c] lg:text-[20px]">
      <div className={`shrink-0 size-4 bg-[#2e6f57] rounded-sm`} /> 
      {children}
    </h2>
  );
}
