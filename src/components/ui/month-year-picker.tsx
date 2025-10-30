import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface MonthYearPickerProps {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

const MONTHS = [
  { value: '01', label: 'January' },
  { value: '02', label: 'February' },
  { value: '03', label: 'March' },
  { value: '04', label: 'April' },
  { value: '05', label: 'May' },
  { value: '06', label: 'June' },
  { value: '07', label: 'July' },
  { value: '08', label: 'August' },
  { value: '09', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' }
]

const MonthYearPicker = React.forwardRef<HTMLDivElement, MonthYearPickerProps>(
  ({ value = '', onChange, placeholder = 'MM/YY', disabled = false, className }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const [selectedMonth, setSelectedMonth] = React.useState('')
    const [selectedYear, setSelectedYear] = React.useState('')

    const currentYear = new Date().getFullYear()
    const currentMonth = new Date().getMonth() + 1
    const years = Array.from({ length: 16 }, (_, i) => currentYear + i)

    // Parse initial value
    React.useEffect(() => {
      if (value && value.includes('/')) {
        const [month, year] = value.split('/')
        setSelectedMonth(month)
        setSelectedYear(`20${year}`)
      }
    }, [value])

    const handleMonthSelect = (month: string) => {
      setSelectedMonth(month)
      if (selectedYear) {
        const yearShort = selectedYear.slice(-2)
        const newValue = `${month}/${yearShort}`
        onChange?.(newValue)
      }
    }

    const handleYearSelect = (year: string) => {
      setSelectedYear(year)
      if (selectedMonth) {
        const yearShort = year.slice(-2)
        const newValue = `${selectedMonth}/${yearShort}`
        onChange?.(newValue)
      }
    }

    const isDateExpired = (month: string, year: string) => {
      if (!month || !year) return false
      const fullYear = parseInt(year)
      const monthNum = parseInt(month)
      const currentDate = new Date()
      const selectedDate = new Date(fullYear, monthNum - 1)
      return selectedDate < new Date(currentDate.getFullYear(), currentDate.getMonth())
    }

    const displayValue = selectedMonth && selectedYear 
      ? `${selectedMonth}/${selectedYear.slice(-2)}`
      : ''

    return (
      <div ref={ref} className={cn("relative", className)}>
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={cn(
            "flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
        >
          <span className={displayValue ? "text-gray-900" : "text-gray-500"}>
            {displayValue || placeholder}
          </span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </button>

        {isOpen && (
          <div className="absolute top-full z-50 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg">
            <div className="grid grid-cols-2 gap-2 p-3">
              {/* Month Selection */}
              <div>
                <h4 className="text-xs font-medium text-gray-700 mb-2">Month</h4>
                <div className="max-h-32 overflow-y-auto space-y-1">
                  {MONTHS.map((month) => {
                    const isExpired = selectedYear && isDateExpired(month.value, selectedYear)
                    return (
                      <button
                        key={month.value}
                        type="button"
                        onClick={() => !isExpired && handleMonthSelect(month.value)}
                        disabled={isExpired}
                        className={cn(
                          "w-full text-left px-2 py-1 text-xs rounded hover:bg-gray-100 transition-colors",
                          selectedMonth === month.value && "bg-blue-100 text-blue-700",
                          isExpired && "text-gray-400 cursor-not-allowed hover:bg-transparent"
                        )}
                      >
                        {month.label}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Year Selection */}
              <div>
                <h4 className="text-xs font-medium text-gray-700 mb-2">Year</h4>
                <div className="max-h-32 overflow-y-auto space-y-1">
                  {years.map((year) => (
                    <button
                      key={year}
                      type="button"
                      onClick={() => handleYearSelect(year.toString())}
                      className={cn(
                        "w-full text-left px-2 py-1 text-xs rounded hover:bg-gray-100 transition-colors",
                        selectedYear === year.toString() && "bg-blue-100 text-blue-700"
                      )}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 p-2">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-full px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
)

MonthYearPicker.displayName = "MonthYearPicker"

export { MonthYearPicker }