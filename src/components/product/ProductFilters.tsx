"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";

const categories = ["All", "Clothing", "Accessories", "Watches"];

const colorOptions = [
  { label: "All", value: "All", hex: "" },
  { label: "Black", value: "Black", hex: "#000000" },
  { label: "White", value: "White", hex: "#ffffff" },
  { label: "Brown", value: "Brown", hex: "#8B4513" },
  { label: "Silver", value: "Silver", hex: "#c0c0c0" },
  { label: "Gold", value: "Gold", hex: "#FFD700" },
];

const priceRanges = ["All", "Under $30", "$30-$60", "$60-$100", "Over $100"];

const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Newest", value: "newest" },
];

export type Filters = {
  category: string;
  color: string;
  price: string;
  sort: string;
};

interface Props {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

export default function ProductFilters({ filters, onChange }: Props) {
  const set = (key: keyof Filters, value: string) =>
    onChange({ ...filters, [key]: value });

  const activeFilters: { key: keyof Filters; label: string }[] = [];
  if (filters.category !== "All") activeFilters.push({ key: "category", label: filters.category });
  if (filters.color !== "All") activeFilters.push({ key: "color", label: filters.color });
  if (filters.price !== "All") activeFilters.push({ key: "price", label: filters.price });

  const clearFilter = (key: keyof Filters) => onChange({ ...filters, [key]: "All" });
  const clearAll = () => onChange({ ...filters, category: "All", color: "All", price: "All" });

  return (
    <>
      {/* Toolbar */}
      <div className="mb-8 mt-6 flex items-center justify-between">
        {/* Left — Filters */}
        {/* Desktop filters */}
        <div className="hidden gap-2 md:flex">
          {/* Category */}
          <FilterDropdown
            label="Category"
            options={categories}
            value={filters.category}
            onSelect={(v) => set("category", v)}
          />
          {/* Color */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex cursor-pointer items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm transition-colors hover:bg-neutral-50">
              Color
              <ChevronDown className="h-3.5 w-3.5 text-neutral-400" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" sideOffset={4}>
              {colorOptions.map((c) => (
                <DropdownMenuItem
                  key={c.value}
                  onClick={() => set("color", c.value)}
                  className={filters.color === c.value ? "font-medium" : ""}
                >
                  {c.hex && (
                    <span
                      className="inline-block h-2.5 w-2.5 rounded-full border border-neutral-200"
                      style={{ backgroundColor: c.hex }}
                    />
                  )}
                  {c.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {/* Price */}
          <FilterDropdown
            label="Price"
            options={priceRanges}
            value={filters.price}
            onSelect={(v) => set("price", v)}
          />
        </div>

        {/* Mobile filter button */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger className="flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-1.5 text-sm">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </SheetTrigger>
            <SheetContent side="left" className="w-72">
              <SheetTitle className="text-lg font-semibold">Filters</SheetTitle>
              <div className="mt-6 space-y-6">
                <MobileFilterSection
                  title="Category"
                  options={categories}
                  value={filters.category}
                  onSelect={(v) => set("category", v)}
                />
                <div>
                  <h3 className="mb-2 text-sm font-medium">Color</h3>
                  <div className="space-y-1">
                    {colorOptions.map((c) => (
                      <button
                        key={c.value}
                        onClick={() => set("color", c.value)}
                        className={`flex w-full cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-sm ${
                          filters.color === c.value ? "bg-neutral-100 font-medium" : ""
                        }`}
                      >
                        {c.hex && (
                          <span
                            className="inline-block h-2.5 w-2.5 rounded-full border border-neutral-200"
                            style={{ backgroundColor: c.hex }}
                          />
                        )}
                        {c.label}
                      </button>
                    ))}
                  </div>
                </div>
                <MobileFilterSection
                  title="Price"
                  options={priceRanges}
                  value={filters.price}
                  onSelect={(v) => set("price", v)}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Right — Sort */}
        <div className="flex items-center gap-2">
          <span className="hidden text-sm text-neutral-500 sm:inline">Sort by</span>
          <Select value={filters.sort} onValueChange={(v) => v && set("sort", v)}>
            <SelectTrigger className="h-9 w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Active filter tags */}
      {activeFilters.length > 0 && (
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {activeFilters.map((f) => (
            <span
              key={f.key}
              className="flex items-center gap-1 rounded-full bg-neutral-100 px-3 py-1 text-xs"
            >
              {f.label}
              <button onClick={() => clearFilter(f.key)} className="cursor-pointer text-neutral-400 hover:text-neutral-700">
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
          <button onClick={clearAll} className="cursor-pointer text-xs text-neutral-500 underline underline-offset-2 hover:text-neutral-800">
            Clear all
          </button>
        </div>
      )}
    </>
  );
}

/* Reusable desktop filter dropdown */
function FilterDropdown({
  label,
  options,
  value,
  onSelect,
}: {
  label: string;
  options: string[];
  value: string;
  onSelect: (v: string) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex cursor-pointer items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm transition-colors hover:bg-neutral-50">
        {label}
        <ChevronDown className="h-3.5 w-3.5 text-neutral-400" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" sideOffset={4}>
        {options.map((opt) => (
          <DropdownMenuItem
            key={opt}
            onClick={() => onSelect(opt)}
            className={value === opt ? "font-medium" : ""}
          >
            {opt}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/* Reusable mobile filter section */
function MobileFilterSection({
  title,
  options,
  value,
  onSelect,
}: {
  title: string;
  options: string[];
  value: string;
  onSelect: (v: string) => void;
}) {
  return (
    <div>
      <h3 className="mb-2 text-sm font-medium">{title}</h3>
      <div className="space-y-1">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onSelect(opt)}
            className={`w-full cursor-pointer rounded px-2 py-1.5 text-left text-sm ${
              value === opt ? "bg-neutral-100 font-medium" : ""
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
