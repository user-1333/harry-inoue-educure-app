import { useEffect, useState } from 'react'
import { Button } from '../../components/ui/button'
import { clockIn, clockOut, earlyLeave, endBreak, getAttendanceByWorkDate, late, startBreak } from '@/hooks/Attendance';
import type { attendanceMin } from '@/components/schema/Attendance';

export default function Home() {
    // ---------------------------- 時刻表示のロジック ----------------------------
    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timer); // クリーンアップ（重要）
    }, []);

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString(); // HH:mm:ss
    };

    const [userAttendance, setUserAttendance] = useState<attendanceMin[]>([]);
    const fetchAttendance = async () => {
        const data = await getAttendanceByWorkDate();
        setUserAttendance(
            [...data].map((d) => ({
                ...d,
                clockIn: d.clockIn ? new Date(d.clockIn) : null,
                clockOut: d.clockOut ? new Date(d.clockOut) : null,
                breakStart: d.breakStart ? new Date(d.breakStart) : null,
                breakEnd: d.breakEnd ? new Date(d.breakEnd) : null,
            }))
        );
    };
    useEffect(() => {
        fetchAttendance();

    }, []);
    // color logic
    const btnStyle = (color: "blue" | "green" | "orange") => {
        const base = "text-5xl text-white w-40 h-40 p-32 cursor-pointer bg-input/30 border-4 rounded-full ";
        if (color === "blue") {
            return `${base}border-blue-400`;
        } else if (color === "green") {
            return `${base}border-emerald-400`;
        } else if (color === "orange") {
            return `${base}border-amber-400`;
        }
    };
    const currentAttendance = userAttendance[0];
    const hasAttendance = userAttendance.length > 0;

    const isClockOutDisabled =
        !hasAttendance ||
        currentAttendance?.clockOut != null ||
        (currentAttendance?.breakEnd == null && currentAttendance?.breakStart != null);

    const isBreakStartDisabled =
        !hasAttendance ||
        currentAttendance?.breakStart != null ||
        currentAttendance?.clockOut != null;

    const isBreakEndDisabled =
        !hasAttendance ||
        currentAttendance?.breakEnd != null ||
        currentAttendance?.clockOut != null;

    return (
        <div id="HOME" className="flex flex-col gap-8 justify-center items-center h-full">
            <div className="flex gap-8 justify-center">
                <div className="text-8xl font-bold mx-8 w-[35vw] my-auto text-center">
                    <div>
                        <div className='text-4xl font-normal mb-4'>{new Date().toLocaleDateString()}</div>
                        <div>{formatTime(time)}</div>
                    </div>
                </div>

                <div className="flex flex-col gap-8">
                    <div className="flex gap-4">
                        <Button className={btnStyle("blue")} onClick={() => clockIn().then(fetchAttendance)} disabled={hasAttendance}>出勤</Button>
                        <Button
                            className={btnStyle("blue")}
                            onClick={() => clockOut().then(fetchAttendance)}
                            disabled={isClockOutDisabled}
                        >
                            退勤
                        </Button>
                    </div>
                    <div className="flex gap-4">
                        <Button className={btnStyle("green")} onClick={() => startBreak().then(fetchAttendance)} disabled={isBreakStartDisabled}>休憩開始</Button>
                        <Button className={btnStyle("green")} onClick={() => endBreak().then(fetchAttendance)} disabled={isBreakEndDisabled}>休憩終了</Button>
                    </div>
                    <div className="flex gap-4">
                        <Button className={btnStyle("orange")} onClick={() => late().then(fetchAttendance)} disabled={hasAttendance}>遅刻</Button>
                        <Button className={btnStyle("orange")} onClick={() => earlyLeave().then(fetchAttendance)} disabled={isClockOutDisabled}>
                                早退
                            </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
