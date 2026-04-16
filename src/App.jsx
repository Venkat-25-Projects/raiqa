import { useState, useEffect } from "react";
import { UtensilsCrossed, ShoppingCart } from "lucide-react";
import mealsData from "./data/meals";
import MealList from "./components/MealList";
import SelectedMeals from "./components/SelectedMeals";

function App() {
  const [showAll, setShowAll] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedMeals, setSelectedMeals] = useState(() => {
    try {
      const saved = localStorage.getItem("selectedMeals");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("selectedMeals", JSON.stringify(selectedMeals));
  }, [selectedMeals]);

  const filteredMeals = showAll
    ? mealsData
    : mealsData.filter((meal) => meal.isAvailable);

  const sortedMeals = [...filteredMeals].sort((a, b) =>
    sortOrder === "asc" ? a.price - b.price : b.price - a.price
  );

  const handleAddMeal = (meal) => {
    setSelectedMeals((prev) => {
      if (prev.some((m) => m.id === meal.id)) return prev;
      return [...prev, meal];
    });
  };

  const handleRemoveMeal = (id) => {
    setSelectedMeals((prev) => prev.filter((m) => m.id !== id));
  };

  const handleReset = () => setSelectedMeals([]);

  const handleToggleFilter = () => setShowAll((prev) => !prev);

  const handleToggleSort = () =>
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));

  const totalPrice = selectedMeals.reduce((sum, m) => sum + m.price, 0);

  const minPriceId =
    selectedMeals.length > 0
      ? selectedMeals.reduce((min, m) => (m.price < min.price ? m : min)).id
      : null;

  const maxPriceId =
    selectedMeals.length > 0
      ? selectedMeals.reduce((max, m) => (m.price > max.price ? m : max)).id
      : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-orange-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <UtensilsCrossed size={28} className="text-orange-500" />
            <div>
              <h1 className="text-xl font-extrabold text-gray-900 leading-tight">
                Raiqa<span className="text-orange-500"> Assignment</span>
              </h1>
              <p className="text-xs text-gray-500">Meals by Home Chefs</p>
            </div>
          </div>


        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        <MealList
          meals={sortedMeals}
          selectedMeals={selectedMeals}
          onAdd={handleAddMeal}
          showAll={showAll}
          onToggleFilter={handleToggleFilter}
          sortOrder={sortOrder}
          onToggleSort={handleToggleSort}
        />

        <SelectedMeals
          selectedMeals={selectedMeals}
          onRemove={handleRemoveMeal}
          onReset={handleReset}
          totalPrice={totalPrice}
          minPriceId={minPriceId}
          maxPriceId={maxPriceId}
        />
      </main>


    </div>
  );
}

export default App;