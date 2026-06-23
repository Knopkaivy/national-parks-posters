import FilterButton from "./FilterButton"

interface FilterSectionProps{
    activeId?: string,
    title: string,
    filters: {
        id: string,
        label: string,
    }[],
    updateParam: (id: string) => void
}

export default function FilterSection({activeId, title, filters, updateParam}: FilterSectionProps){
    return (
        <div className="py-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-bark-400 mb-4">{title}</h3>
            <ul className="space-y-2.5" role="list">
                {filters.map(filter => (
                    <FilterButton key={filter.id} isActive={filter.id === activeId} id={filter.id} label={filter.label} updateParam={updateParam} />
                ))}
            </ul>
        </div>
    )
}