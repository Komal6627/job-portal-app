import { Button } from "../ui/button";
import { Input } from "../ui/input";

function CommonForm({action, buttonText, isBtnDisabled, formControls, isBtnDisabled, btnType}) {

    function renderInputComponentType(getCurrentControl) {
        let content = null;

        switch (getCurrentControl.componentType) {
            case 'input':
                content = <div className="relative flex item-center mt-8">
                  <Input type="text"/>
                </div>
                break;
        
            default:
                break;
        }
    }

    return(
        <form action={action}>
            {
                formControls.map(control=> renderInputComponentType(control))
            }

            <div className="mt-6 w-full">
                <Button 
                disabled={isBtnDisabled} 
                type={btnType || 'submit'}
                className="disabled:opacity-60 flex h-11 items-center justify-center px-5"
                >
                    {buttonText}
                </Button>
                
            </div>
        </form>
    )
}

export default CommonForm