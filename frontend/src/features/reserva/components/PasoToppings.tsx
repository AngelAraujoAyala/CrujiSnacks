import React from "react";
import type { Topping } from "../services/toppingService";

interface Props {
  toppings: Topping[];
  selectedToppings: number[];
  onChange: (toppings: number[]) => void;
}

const PasoToppings: React.FC<Props> = ({
  toppings,
  selectedToppings,
  onChange,
}) => {
  const MAX_TOPPINGS = 10;

  const handleToggle = (
    toppingId: number
  ) => {
    const isSelected =
      selectedToppings.includes(
        toppingId
      );

    if (isSelected) {
      onChange(
        selectedToppings.filter(
          (id) => id !== toppingId
        )
      );
    } else {
      if (
        selectedToppings.length <
        MAX_TOPPINGS
      ) {
        onChange([
          ...selectedToppings,
          toppingId,
        ]);
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Personaliza tu paquete
        </h2>

        <p className="text-gray-500 text-sm">
          Selecciona 10 toppings
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {toppings.map((topping) => {
          const isSelected =
            selectedToppings.includes(
              topping.id
            );

          const reachedLimit =
            selectedToppings.length >=
            MAX_TOPPINGS;

          return (
            <button
              key={topping.id}
              onClick={() =>
                handleToggle(
                  topping.id
                )
              }
              disabled={
                reachedLimit &&
                !isSelected
              }
              type="button"
              className={`
                relative p-4 flex flex-col items-center justify-center
                rounded-xl border-2 transition-all duration-200
                min-h-[120px]

                ${
                  isSelected
                    ? "border-orange-500 bg-orange-50 ring-2 ring-orange-200"
                    : "border-gray-100 bg-white hover:border-gray-300"
                }

                ${
                  reachedLimit &&
                  !isSelected
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }
              `}
            >
              {topping.iconURL ? (
                <img
                  src={
                    topping.iconURL
                  }
                  alt={
                    topping.nombre
                  }
                  className="w-12 h-12 mb-2 object-contain"
                />
              ) : (
                <div className="w-12 h-12 mb-2 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 font-bold">
                  {topping.nombre.charAt(
                    0
                  )}
                </div>
              )}

              <span
                className={`
                  text-sm font-medium text-center

                  ${
                    isSelected
                      ? "text-orange-900"
                      : "text-gray-600"
                  }
                `}
              >
                {topping.nombre}
              </span>

              {isSelected && (
                <div className="absolute top-2 right-2 bg-orange-500 rounded-full p-1">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>

      <span
        className={`
          text-sm font-bold mt-1 mb-2

          ${
            selectedToppings.length >=
            MAX_TOPPINGS
              ? "text-green-500"
              : "text-gray-500"
          }
        `}
      >
        Toppings seleccionados:{" "}
        {selectedToppings.length} /{" "}
        {MAX_TOPPINGS}
      </span>
    </div>
  );
};

export default PasoToppings;