import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { SlidersHorizontal, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FiltersProps {
  onFilterChange: (filters: any) => void;
}

export function Filters({ onFilterChange }: FiltersProps) {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [rating, setRating] = useState(0);

  const handleApplyFilters = () => {
    onFilterChange({ priceRange, rating });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="lg:hidden mb-4">
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <FilterContent
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          rating={rating}
          setRating={setRating}
          onApply={handleApplyFilters}
        />
      </SheetContent>

      {/* Desktop filters */}
      <div className="hidden lg:block w-64 p-4 bg-white rounded-lg shadow-lg h-fit">
        <FilterContent
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          rating={rating}
          setRating={setRating}
          onApply={handleApplyFilters}
        />
      </div>
    </Sheet>
  );
}

function FilterContent({ priceRange, setPriceRange, rating, setRating, onApply }: any) {
  return (
    <div className="space-y-6 w-[13rem]">
      <SheetHeader className="lg:hidden">
        <SheetTitle>Filters</SheetTitle>
      </SheetHeader>

      <div className="space-y-4">
        <Label>Price Range</Label>
        <Slider
          min={0}
          max={1000}
          step={50}
          value={priceRange}
          onValueChange={setPriceRange}
        />
        <div className="flex justify-between text-sm">
          <span>₹{priceRange[0]}</span>
          <span>₹{priceRange[1]}</span>
        </div>
      </div>

      <div className="space-y-4">
        <Label>Minimum Rating</Label>
        <div className="flex justify-center gap-1 ml-[1rem]">
          {[1, 2, 3, 4, 5].map((value) => (
            <Button
              key={value}
              variant={rating === value ? "default" : "outline"}
              size="sm"
              onClick={() => setRating(value)}
              className="flex-1"
            >
              <Star
                className={cn(
                  "h-4 w-3 mr-0 ",
                  rating === value ? "text-white" : "text-yellow-400"
                )}
              />
              {value}
            </Button>
          ))}
        </div>
      </div>

      <Button onClick={onApply} className="w-full">
        Apply Filters
      </Button>
    </div>
  );
}