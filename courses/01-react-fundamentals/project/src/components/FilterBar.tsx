interface FilterBarProps {
  filter: 'all' | 'active' | 'completed'
  onFilterChange: (filter: 'all' | 'active' | 'completed') => void
  sort: "Recently Added" | "Priority: High to Low" | "Priority: Low to High" | "Alphabetical" | "Due Date(Soonest First)"
  onSortChange: (sort: "Recently Added" | "Priority: High to Low" | "Priority: Low to High" | "Alphabetical" | "Due Date(Soonest First)") => void
  search: string
  onSearchChange: (search: string) => void
  category: string
  onCategoryChange: (category: string) => void
}


export default function FilterBar({ filter, onFilterChange, sort, onSortChange, search, onSearchChange, category, onCategoryChange }: FilterBarProps) {
  return (
    <>
      <input id="search-input" type="text" value={search} onChange={(e) => onSearchChange(e.target.value)} />
      {search && (<button id="clear-search" onClick={() => onSearchChange("")}>Clear</button>)}
      <div id="filter-bar">
        <button data-active={filter === "all"} onClick={() => onFilterChange("all")}>All</button>
        <button data-active={filter === "active"} onClick={() => onFilterChange("active")}>Active</button>
        <button data-active={filter === "completed"} onClick={() => onFilterChange("completed")}>Completed</button>
      </div>
      <div className="categbar">
        <select name="filtercat" value={category} id="sort-cat" onChange={(e) => onCategoryChange(e.target.value as
          | "All Categories" | "General" | "Work" | "Personal")}>
          <option value="All Categories">All Categories</option>
          <option value="General">General</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
        </select>
      </div>
      <div className="sortbar">
        <select name="sort-order" value={sort} id="sort-order" onChange={(e) => onSortChange(e.target.value as
          | "Recently Added"
          | "Priority: High to Low"
          | "Priority: Low to High"
          | "Alphabetical"
          | "Due Date(Soonest First)"
        )}>
          <option value="Recently Added">Recently Added</option>
          <option value="Priority: High to Low">Priority: High to Low</option>
          <option value="Priority: Low to High">Priority: Low to High</option>
          <option value="Alphabetical">Alphabetical</option>
          <option value="Due Date(Soonest First)">Due Date(Soonest First)</option>
        </select>
      </div >
    </>
  );
}
