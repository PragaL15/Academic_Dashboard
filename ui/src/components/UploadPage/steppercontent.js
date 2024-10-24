import React, { useRef } from "react";
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { Button } from 'primereact/button';

export default function BasicDemo() {
    const stepperRef = useRef(null);

    return (
        <div className="flex justify-center">
            <Stepper ref={stepperRef} style={{ width: '100%' }} orientation="vertical">
                <StepperPanel header="Subject 1">
                    <div className="flex flex-col items-center h-24">
                        <div className="border-2 border-dashed border-gray-300 p-4 w-full flex justify-center items-center text-center">Content I</div>
                    </div>
                    <div className="flex justify-end mt-4">
                        <Button label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={() => stepperRef.current.nextCallback()} />
                    </div>
                </StepperPanel>

                <StepperPanel header="Subject 2">
                    <div className="flex flex-col items-center h-24">
                        <div className="border-2 border-dashed border-gray-300 p-4 w-full flex justify-center items-center text-center">Content II</div>
                    </div>
                    <div className="flex justify-between mt-4">
                        <Button label="Back" icon="pi pi-arrow-left" onClick={() => stepperRef.current.prevCallback()} />
                        <Button label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={() => stepperRef.current.nextCallback()} />
                    </div>
                </StepperPanel>

                <StepperPanel header="Subject 3">
                    <div className="flex flex-col items-center h-24">
                        <div className="border-2 border-dashed border-gray-300 p-4 w-full flex justify-center items-center text-center">Content III</div>
                    </div>
                    <div className="flex justify-start mt-4">
                        <Button label="Back" icon="pi pi-arrow-left" onClick={() => stepperRef.current.prevCallback()} />
                    </div>
                </StepperPanel>
            </Stepper>
        </div>
    );
}
