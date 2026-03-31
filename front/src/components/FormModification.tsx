import { Label } from './ui/label'
import * as React from "react"
import TimePiker from './TimePiker'
import type { attendance, attendanceModification } from './schema/Attendance';
import { FaClock } from 'react-icons/fa';
import { FiLogOut } from "react-icons/fi";
import { Button } from './ui/button';
import { useState, type ComponentProps, type Dispatch } from 'react';
import { modifyAttendanceAPI } from '@/hooks/Attendance';
import { format } from 'date-fns';

type FieldKey = 'start' | 'end' | 'breakIn' | 'breakOut'

export default function FormModification({ attendance, onClose }: { attendance: attendance; onClose?: () => void }) {
  type FormOnSubmit = NonNullable<ComponentProps<'form'>['onSubmit']>

  const [openField, setOpenField] = useState<FieldKey | null>(null)
  const [dates, setDates] = useState({
    start: attendance.clockIn ? new Date(attendance.clockIn) : undefined,
    end: attendance.clockOut ? new Date(attendance.clockOut) : undefined,
    breakIn: attendance.breakStart ? new Date(attendance.breakStart) : undefined,
    breakOut: attendance.breakEnd ? new Date(attendance.breakEnd) : undefined,
  })

  const makeSetOpen = (key: FieldKey): Dispatch<React.SetStateAction<boolean>> =>
    (value) => setOpenField(
      typeof value === 'function' ? (value(openField === key) ? key : null) : (value ? key : null)
    )

  const makeSetDate = (key: FieldKey): Dispatch<React.SetStateAction<Date | undefined>> =>
    (value) => setDates(prev => ({
      ...prev,
      [key]: typeof value === 'function' ? value(prev[key]) : value,
    }))
  const [isLate, setIsLate] = useState(attendance.isLate);
  const [isEarlyLeave, setIsEarlyLeave] = useState(attendance.isEarlyLeave);

  const handleSubmit: FormOnSubmit = async (event) => {
    event.preventDefault();
    const newAttendance:attendanceModification = {
      workDate: format(new Date(dates.start ? dates.start : attendance.workDate), "yyyy-MM-dd"),
      clockIn: dates.start ? format(dates.start, "yyyy-MM-dd'T'HH:mm:ss") : "",
      clockOut: dates.end ? format(dates.end, "yyyy-MM-dd'T'HH:mm:ss") : "",
      breakStart: dates.breakIn ? format(dates.breakIn, "yyyy-MM-dd'T'HH:mm:ss") : "",
      breakEnd: dates.breakOut ? format(dates.breakOut, "yyyy-MM-dd'T'HH:mm:ss") : "",
      isLate: isLate,
      isEarlyLeave: isEarlyLeave
    };
    try {
      await modifyAttendanceAPI(newAttendance, attendance.id);
      onClose?.();
    } catch {
      window.alert("勤怠の更新に失敗しました。");
    }
  }

    return (
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>

        <div>
          <Label htmlFor="start-date" className='mb-2'>出勤日時</Label>
          <TimePiker date={dates.start} setDate={makeSetDate('start')} open={openField === 'start'} setOpen={makeSetOpen('start')} />
        </div>
        <div>
          <Label htmlFor="end-date" className='mb-2'>退勤日時</Label>
          <TimePiker date={dates.end} setDate={makeSetDate('end')} open={openField === 'end'} setOpen={makeSetOpen('end')} />
        </div>
        <div>
          <Label htmlFor="break-in" className='mb-2'>休憩開始</Label>
          <TimePiker date={dates.breakIn} setDate={makeSetDate('breakIn')} open={openField === 'breakIn'} setOpen={makeSetOpen('breakIn')} />
        </div>
        <div>
          <Label htmlFor="break-out" className='mb-2'>休憩終了</Label>
          <TimePiker date={dates.breakOut} setDate={makeSetDate('breakOut')} open={openField === 'breakOut'} setOpen={makeSetOpen('breakOut')} />
        </div>
        <div className='flex gap-8'>
          <div className='flex gap-1  justify-items-center justify-start'>
            <FaClock className="text-red-500" />
            <Label htmlFor='late' className='pr-1'>遅刻</Label>
            <input type="checkbox" id='late' name='late' checked={isLate} onChange={(e) => setIsLate(e.target.checked)} />
          </div>
          <div className='flex gap-1  justify-items-center justify-start'>
            <FiLogOut className="text-yellow-500" />
            <Label htmlFor='early' className='pr-1'>早退</Label>
            <input type="checkbox" id='early' name='early' checked={isEarlyLeave} onChange={(e) => setIsEarlyLeave(e.target.checked)} />
          </div>
        </div>
        <Button type='submit' className='self-end'>完了</Button>
      </form>
    )
  }
