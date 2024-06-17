import React, { useState } from "react";

import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";

const Table2 = () => {
    const steps = [
        { label: 'Chờ xác nhận', icon: <CheckIcon /> },
        { label: 'Chờ lấy hàng', icon: '🚚' },
        { label: 'Đang đến', icon: '📦' },
        { label: 'Đã giao', icon: '🎉' },
        { label: 'Hủy', icon: <CancelIcon /> },
    ];
    const [currentStep, setCurrentStep] = useState(1);
    const [complete, setComplete] = useState(false);
    const [cancelled, setCancelled] = useState(false);

    const handleUpdateStatus = () => {
        console.log('Cập nhật trạng thái');
        setCurrentStep(prevStep => prevStep + 1);
        if (currentStep === steps.length - 1) {
            setComplete(true);
        }
    };

    const handleCancel = () => {
        console.log('Hủy');
        setCancelled(true);
    };

    return (
        <>
            <div className="flex justify-between">
                {steps?.map((step, i) => (
                    <div
                        key={i}
                        className={`step-item ${currentStep === i + 1 && "active"} ${i + 1 < currentStep || complete ? "complete" : ""} ${cancelled && i + 1 <= steps.length && "cancel"}`}
                    >
                        <div className="step">
                            {i + 1 < currentStep || complete ? (
                                step.icon
                            ) : (
                                i + 1
                            )}
                        </div>
                        <span className="step-label">{step.label}</span>
                    </div>
                ))}
            </div>
            {!complete && (
                <button
                    className={`btn ${cancelled && "hide"}`}
                    onClick={() => {
                        handleUpdateStatus();
                        setCurrentStep(prevStep => prevStep + 1);
                        setCancelled(false);
                    }}
                >
                    {currentStep === steps.length ? "Finish" : "Next"}
                </button>
            )}
            <button
                className={`btn ${!cancelled && currentStep === 1 && "hide"}`}
                onClick={() => {
                    handleCancel();
                    setCurrentStep(steps.length);
                    setComplete(true);
                }}
                disabled={cancelled}
            >
                Hủy
            </button>
        </>
    );
};

export default Table2;