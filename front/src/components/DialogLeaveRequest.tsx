import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from 'react'
import LeaveApprovalForm from '@/components/FormLeaveApproval'
import { Button } from "@/components/ui/button"

export default function LeaveRequestDialog() {
    const [errorMessage, setErrorMessage] = useState<string>("")
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="w-fit">
                    ＋ 新規申請
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>休暇申請</DialogTitle>
                    <DialogDescription>
                        休暇の種類、期間、理由を入力して申請してください。
                    </DialogDescription>
                </DialogHeader>
                <LeaveApprovalForm setErrorMessage={setErrorMessage} />
                <DialogFooter className="flex-col sm:flex-row-reverse">
                    <p id='err-msg' style={{ whiteSpace: "pre-line" }}>{errorMessage}</p>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
