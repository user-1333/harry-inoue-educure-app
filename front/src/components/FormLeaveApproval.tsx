import React, { useState, type ComponentProps } from 'react'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { Label } from './ui/label'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Calendar } from './ui/calendar'
import { CalendarIcon } from 'lucide-react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { leaveRequestAPI } from '@/hooks/Leave'
import { LeaveRequestSchema, type LeaveRequest } from './schema/Leave'
import { addDays, format } from 'date-fns'
import type { DateRange } from 'react-day-picker'
import { LeaveTypeMap } from '@/lib/type'

interface Props {
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>
}

export default function LeaveApprovalForm({ setErrorMessage }: Props) {
    type FormOnSubmit = NonNullable<ComponentProps<'form'>['onSubmit']>
  
    const [date, setDate] = useState<DateRange | undefined>({
      from: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
      to: addDays(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()), 3),
    })
    const [leaveType, setLeaveType] = useState<string>("")
    const [reason, setReason] = useState<string>("")
    
  
    const handleSubmit: FormOnSubmit = (event) => {
      event.preventDefault()
  
      if (!date?.from || !date?.to) {
        setErrorMessage("休暇期間を選択してください")
        return
      }
  
      const leave: LeaveRequest = {
        leaveTypeId: Number(leaveType),
        startDate: format(date.from, "yyyy-MM-dd'T'HH:mm:ss"),
        endDate: format(date.to, "yyyy-MM-dd'T'HH:mm:ss"),
        reason,
      }
  
      const result = LeaveRequestSchema.safeParse(leave)
      if (!result.success) {
        const msg: string = JSON.parse(result.error.message).map((err: { message: string }) => err.message).join("\n")
        setErrorMessage(msg)
        return
      }
  
      setErrorMessage("")
      console.log(result.data);
      leaveRequestAPI(result.data)
      setLeaveType("");
      setReason("");
  
    }
  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <Label htmlFor="start-date">休暇の種類</Label>
        <Select value={leaveType} onValueChange={setLeaveType}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="休暇種類" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {Object.entries(LeaveTypeMap).map(([key, value]) => (
                <SelectItem value={value.id.toString()} key={key}>{value.jp}</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="range-date">休暇の期間</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date-picker-range"
              className="justify-start px-2.5 font-normal"
            >
              <CalendarIcon />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "yyyy年M月dd日")} -{" "}
                    {format(date.to, "yyyy年M月dd日")}
                  </>
                ) : (
                  format(date.from, "yyyy年M月dd日")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
              captionLayout="label"
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="reason">休暇理由</Label>
        <Textarea
          name="reason"
          value={reason}
          onChange={(event) => setReason(event.target.value)}
          aria-placeholder="Type your message here."
        />
      </div>
      <Button variant="outline" type="submit" className="w-full" id="btn">
        申請する
      </Button>
    </form>
  )
}
