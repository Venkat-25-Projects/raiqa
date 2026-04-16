import { X, Trash2, ShoppingCart, TrendingUp, TrendingDown } from "lucide-react";

function SelectedMeals({ selectedMeals, onRemove, onReset, totalPrice, minPriceId, maxPriceId }) {
  return (
    <section className="bg-white rounded-3xl shadow-lg border border-orange-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Selected Meals</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            {selectedMeals.length} item{selectedMeals.length !== 1 ? "s" : ""} selected
          </p>
        </div>
        {selectedMeals.length > 0 && (
          <button
            onClick={onReset}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-red-50 text-red-500 hover:bg-red-100 border border-red-200 transition-all duration-200"
          >
            <Trash2 size={14} />
            Clear All
          </button>
        )}
      </div>

      {selectedMeals.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-gray-400">
          <p className="text-lg font-medium">Your selection is empty</p>
          <p className="text-sm">Add meals from the list above</p>
        </div>
      ) : (
        <>
          <div className="space-y-3 mb-6">
            {selectedMeals.map((meal) => {
              const isCheapest = meal.id === minPriceId;
              const isMostExpensive = meal.id === maxPriceId;

              return (
                <div
                  key={meal.id}
                  className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-200 ${isMostExpensive
                      ? "bg-red-50 border-red-200"
                      : isCheapest
                        ? "bg-green-50 border-green-200"
                        : "bg-gray-50 border-gray-200"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-800">{meal.name}</span>
                        {isMostExpensive && selectedMeals.length > 1 && (
                          <span className="inline-flex items-center gap-1 text-xs bg-red-100 text-red-600 font-bold px-2 py-0.5 rounded-full">
                            <TrendingUp size={10} /> Most Expensive
                          </span>
                        )}
                        {isCheapest && selectedMeals.length > 1 && (
                          <span className="inline-flex items-center gap-1 text-xs bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full">
                            <TrendingDown size={10} /> Best Value
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500">{meal.chef}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="font-bold text-orange-500 text-lg">&#8377;{meal.price}</span>
                    <button
                      onClick={() => onRemove(meal.id)}
                      className="flex items-center justify-center w-8 h-8 rounded-full bg-white border border-gray-300 text-gray-400 hover:bg-red-50 hover:text-red-500 hover:border-red-300 transition-all duration-200"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <span className="text-gray-600 font-medium">Total Amount</span>
            <span className="text-3xl font-extrabold text-orange-500">&#8377;{totalPrice}</span>
          </div>
        </>
      )}
    </section>
  );
}

export default SelectedMeals;
