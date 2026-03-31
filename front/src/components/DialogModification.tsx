import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { MoreHorizontal } from 'lucide-react';
import type { attendance } from './schema/Attendance';
import FormModification from "./FormModification";
import { useState } from 'react';

export default function DialogModification({attendance, onSuccess}: {attendance: attendance, onSuccess?: () => void}) {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button>
          <MoreHorizontal />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>勤怠編集</DialogTitle>
          <DialogDescription>
            {attendance.userName} さんの勤怠を編集します。<br />
            編集内容は、出勤日時、退勤日時、休憩時間の開始・終了日時です。<br />
            編集後は、勤怠の修正履歴に記録されます。
          </DialogDescription>
        </DialogHeader>
        <FormModification attendance={attendance} onClose={() => { setOpen(false); onSuccess?.(); }} />
      </DialogContent>
    </Dialog>
  )
}
