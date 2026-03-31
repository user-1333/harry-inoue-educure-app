import React from 'react'
import { Field, FieldGroup } from './ui/field'
import { Input } from './ui/input'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Calendar } from './ui/calendar'
import { Button } from './ui/button'
import { ChevronDownIcon } from 'lucide-react'
import { format } from 'date-fns'

export default function TimePiker({ date, setDate, open, setOpen }: 
    { 
        date: Date | undefined, 
        setDate: React.Dispatch<React.SetStateAction<Date | undefined>>, 
        open: boolean, 
        setOpen: React.Dispatch<React.SetStateAction<boolean>> 
    }) {
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [hours, minutes, seconds] = e.target.value.split(':').map(Number)
    const newDate = date ? new Date(date) : new Date()
    newDate.setHours(hours, minutes, seconds ?? 0, 0)
    setDate(new Date(newDate))
  }

  return (
        <FieldGroup className="mx-auto max-w-xs flex flex-row ">
          <Field>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="date-picker-optional"
                  className="w-32 justify-between font-normal"
                >
                  {date ? format(date, "yyyy年MM月dd日") : "Select date"}
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  captionLayout="dropdown"
                  defaultMonth={date}
                  onSelect={(d) => {
                    if (d) {
                      const merged = date ? new Date(date) : new Date(d)
                      merged.setFullYear(d.getFullYear(), d.getMonth(), d.getDate())
                      setDate(merged)
                    } else {
                      setDate(undefined)
                    }
                    setOpen(false)
                  }}
                />
              </PopoverContent>
            </Popover>
          </Field>
          <Field className="w-32">
            <Input
              type="time"
              id="time-picker-optional"
              step="1"
              value={date ? format(date, "HH:mm:ss") : ""}
              onChange={handleTimeChange}
              className="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
            />
          </Field>
        </FieldGroup>
  )
}