import React from "react";
import { AlertTriangle } from "lucide-react";

const RateLimited = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-base-200 z-50">
      <div className="animate-bounce card w-96 bg-error text-error-content shadow-xl p-6 text-center">
        <div className="flex flex-col items-center gap-4">
          {/* Icon */}
          <div className="animate-pulse">
            <AlertTriangle size={48} />
          </div>

          {/* Message */}
          <h2 className="text-2xl font-bold">Whoa, slow down!</h2>
          <p className="text-sm opacity-80">
            You’ve hit the rate limit. Take a short break before trying again.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RateLimited;
