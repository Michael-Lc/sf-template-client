import * as React from "react"
import { LayoutGrid, List } from "lucide-react"
import { cn } from "@/lib/utils"

interface ViewToggleProps {
  view: 'card' | 'table'
  onViewChange: (view: 'card' | 'table') => void
  className?: string
}

export function ViewToggle({ view, onViewChange, className }: ViewToggleProps) {
  return (
    <div className={cn("flex items-center space-x-1 bg-gray-100 rounded-lg p-1", className)}>
      <button
        onClick={() => onViewChange('card')}
        className={cn(
          "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
          view === 'card'
            ? "bg-white text-blue-700 shadow-sm"
            : "text-gray-600 hover:text-gray-900"
        )}
      >
        <LayoutGrid className="w-4 h-4" />
        <span>Card View</span>
      </button>
      <button
        onClick={() => onViewChange('table')}
        className={cn(
          "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
          view === 'table'
            ? "bg-white text-blue-700 shadow-sm"
            : "text-gray-600 hover:text-gray-900"
        )}
      >
        <List className="w-4 h-4" />
        <span>Table View</span>
      </button>
    </div>
  )
}