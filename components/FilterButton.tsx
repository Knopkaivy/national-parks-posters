interface FilterButtonProps {
    id: string,
    label: string,
    isActive: boolean,
    updateParam: (id: string)=> void
}

export default function FilterButton({id, label, isActive, updateParam}: FilterButtonProps){
    return (
        <button type="button" className={`block text-sm transition-colors focus-visible:ring-2 focus-visible:ring-moss-400 rounded ${isActive ? 'text-moss-600 font-medium' : 'text-bark-600 hover:text-bark-900'}`} onClick={() => updateParam(id)} aria-pressed={isActive} >{label}</button>
    )
}