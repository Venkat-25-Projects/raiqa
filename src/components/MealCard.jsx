import { Plus, Check, Ban, Leaf, Drumstick } from "lucide-react";

function MealCard({ meal, onAdd, isSelected }) {
  return (
    <div
      className={`relative flex flex-col rounded-2xl overflow-hidden shadow-md border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${meal.isAvailable
          ? "bg-white border-orange-100"
          : "bg-gray-50 border-gray-200 opacity-70"
        }`}
    >
      <div
        className={`h-2 w-full ${meal.isAvailable
            ? "bg-gradient-to-r from-orange-400 to-amber-500"
            : "bg-gray-300"
          }`}
      />

      <div className="p-5 flex flex-col flex-1">
        <div className="mb-3">
          <h3 className="font-bold text-gray-800 text-lg leading-tight">{meal.name}</h3>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <span
            className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${meal.category === "Veg"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-600"
              }`}
          >
            {meal.category === "Veg" ? (
              <Leaf size={11} />
            ) : (
              <Drumstick size={11} />
            )}
            {meal.category}
          </span>

          <span
            className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${meal.isAvailable
                ? "bg-emerald-100 text-emerald-700"
                : "bg-gray-200 text-gray-500"
              }`}
          >
            {meal.isAvailable ? (
              <Check size={11} />
            ) : (
              <Ban size={11} />
            )}
            {meal.isAvailable ? "Available" : "Unavailable"}
          </span>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <span className="text-2xl font-extrabold text-orange-500">
            &#8377;{meal.price}
          </span>

          {meal.isAvailable ? (
            <button
              onClick={() => onAdd(meal)}
              disabled={isSelected}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${isSelected
                  ? "bg-green-100 text-green-700 cursor-not-allowed"
                  : "bg-orange-500 text-white hover:bg-orange-600 active:scale-95 shadow-sm hover:shadow-md"
                }`}
            >
              {isSelected ? (
                <>
                  <Check size={14} /> Added
                </>
              ) : (
                <>
                  <Plus size={14} /> Add
                </>
              )}
            </button>
          ) : (
            <button
              disabled
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold bg-gray-200 text-gray-400 cursor-not-allowed"
            >
              <Ban size={14} /> Unavailable
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default MealCard;
