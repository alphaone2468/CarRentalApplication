import React, { useState } from "react";
import {
  Calendar,
  Users,
  MapPin,
  Clock,
  DollarSign,
  Check,
  X,
} from "lucide-react";

const BookingCard = ({ booking, onAction, processing }) => {
  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-md transition border border-gray-200 overflow-hidden">
      {/* Top Section */}
      <div className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <img
            src={booking.user.avatar}
            alt={booking.user.name}
            className="w-14 h-14 rounded-full object-cover"
          />
          <div className="min-w-0">
            <h3 className="font-semibold text-gray-900 truncate">
              {booking.user.name}
            </h3>
            <p className="text-sm text-gray-600 truncate">{booking.user.email}</p>
            <p className="text-sm text-gray-600">{booking.user.phone}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-gray-400" />
          <span className="text-xs text-gray-500">
            {getTimeSince(booking.createdAt)}
          </span>
          <span className="px-2 py-1 text-xs bg-yellow-50 text-yellow-700 rounded-full border border-yellow-200">
            {booking.status}
          </span>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="p-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Car */}
        <div className="flex gap-4">
          <img
            src={booking.car.image}
            alt={booking.car.name}
            className="w-20 h-14 object-cover rounded-lg"
          />
          <div>
            <p className="font-medium text-gray-900">{booking.car.name}</p>
            <p className="text-sm text-gray-600">
              {booking.car.type} • {booking.car.year}
            </p>
          </div>
        </div>

        {/* Booking */}
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <div className="text-sm">
              <p className="font-medium">Period</p>
              <p className="text-gray-600">
                {formatDate(booking.startDate)} - {formatDate(booking.endDate)}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-gray-500" />
            <div className="text-sm">
              <p className="font-medium">Pickup</p>
              <p className="text-gray-600">{booking.pickupLocation}</p>
            </div>
          </div>
        </div>

        {/* Price + Actions */}
        <div className="flex flex-col gap-4 sm:items-end">
          <div>
            <p className="text-sm text-gray-600">Total</p>
            <p className="text-2xl font-bold text-blue-600">
              ${booking.totalPrice}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              onClick={() => onAction(booking.id, "accept")}
              disabled={processing.has(booking.id)}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition disabled:opacity-50"
            >
              <Check className="w-4 h-4" />
              {processing.has(booking.id) ? "Processing..." : "Accept"}
            </button>
            <button
              onClick={() => onAction(booking.id, "reject")}
              disabled={processing.has(booking.id)}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition disabled:opacity-50"
            >
              <X className="w-4 h-4" />
              {processing.has(booking.id) ? "Processing..." : "Reject"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const getTimeSince = (date) => {
  const diff = Date.now() - new Date(date);
  const hrs = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(hrs / 24);
  if (days > 0) return `${days}d ago`;
  if (hrs > 0) return `${hrs}h ago`;
  return "Just now";
};

export default function BookingRequests() {
  const [bookingRequests, setBookingRequests] = useState([
    {
      id: "507f1f77bcf86cd799439013",
      userId: "507f1f77bcf86cd799439012",
      carId: "507f1f77bcf86cd799439011",
      startDate: "2025-08-15",
      endDate: "2025-08-18",
      totalPrice: 900,
      pickupLocation: "Downtown Manhattan",
      status: "pending",
      createdAt: "2025-08-11T10:30:00Z",
      user: {
        name: "John Smith",
        email: "john.smith@email.com",
        phone: "+1 (555) 123-4567",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      },
      car: {
        name: "BMW X5",
        year: 2006,
        type: "SUV",
        image:
          "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=300&h=200&fit=crop",
      },
    },
  ]);

  const [processingIds, setProcessingIds] = useState(new Set());

  const handleBookingAction = async (bookingId, action) => {
    setProcessingIds((prev) => new Set([...prev, bookingId]));
    try {
      const newStatus = action === "accept" ? "confirmed" : "cancelled";
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setBookingRequests((prev) =>
        prev.map((b) =>
          b.id === bookingId ? { ...b, status: newStatus } : b
        )
      );
    } catch (error) {
      console.error("Error processing booking action:", error);
    } finally {
      setProcessingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(bookingId);
        return newSet;
      });
    }
  };

  const pending = bookingRequests.filter((b) => b.status === "pending");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-gray-50 min-h-screen">
      <header className="mb-8 text-center lg:text-left">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
          Booking Requests
        </h1>
        <p className="text-gray-600">Manage booking requests for your cars</p>
      </header>

      {/* Pending Section */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Pending ({pending.length})
        </h2>

        {pending.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-6 text-center text-gray-500">
            No pending requests
          </div>
        ) : (
          <div className="space-y-6">
            {pending.map((r) => (
              <BookingCard
                key={r.id}
                booking={r}
                onAction={handleBookingAction}
                processing={processingIds}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
