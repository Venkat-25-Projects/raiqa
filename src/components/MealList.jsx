import { ArrowUpDown, Filter } from "lucide-react";
import MealCard from "./MealCard";

function MealList({ meals, selectedMeals, onAdd, showAll, onToggleFilter, sortOrder, onToggleSort }) {
  return (
    <section>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Meal Menu</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            {meals.length} meal{meals.length !== 1 ? "s" : ""} listed
          </p>
        </div>

        <div className="flex gap-2 flex-wrap">
          <button
            onClick={onToggleFilter}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all duration-200 ${showAll
                ? "bg-gray-800 text-white border-gray-800 hover:bg-gray-700"
                : "bg-white text-gray-700 border-gray-300 hover:border-orange-400 hover:text-orange-500"
              }`}
          >
            <Filter size={14} />
            {showAll ? "Show All" : "Available Only "}
          </button>

          <button
            onClick={onToggleSort}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-white text-gray-700 border border-gray-300 hover:border-orange-400 hover:text-orange-500 transition-all duration-200"
          >
            <ArrowUpDown size={14} />
            {sortOrder === "asc" ? "Price: Low to High" : "Price: High to Low"}
          </button>
        </div>
      </div>

      {meals.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-gray-400">
          <p className="text-lg font-medium">No meals found</p>
          <p className="text-sm">Try toggling the filter above</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {meals.map((meal) => (
            <MealCard
              key={meal.id}
              meal={meal}
              onAdd={onAdd}
              isSelected={selectedMeals.some((m) => m.id === meal.id)}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default MealList;
