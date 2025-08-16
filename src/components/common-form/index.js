import { Label } from "@radix-ui/react-label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

function CommonForm({
  action,
  buttonText,
  isBtnDisabled,
  formControls,
  isBtnDisabled,
  btnType,
  formData,
  setFormData,
}) {
  function renderInputComponentType(getCurrentControl) {
    let content = null;

    switch (getCurrentControl.componentType) {
      case "input":
        content = (
          <div className="relative flex item-center mt-8">
            <Input
              type="text"
              disabled={getCurrentControl.disabled}
              placeholder={getCurrentControl.placeholder}
              name={getCurrentControl.name}
              id={getCurrentControl.name}
              value={formData[getCurrentControl.name]}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  [event.target.name]: event.target.value,
                })
              }
              className="w-full rounded-md h-[60px] px-4 border bg-gray-100 text-lg outline-none drop-shadow-sm transition-all duration-200 easy-in-out focus:bg-white focus:drop-shadow-lg focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 "
            />
          </div>
        );
        break;

        case "file":
            content = <Label for={getCurrentControl.name} className="flex bg-gray-100  item-center px-3 py-3 mx-auto mt-6 text-center border-2 border-dashed rounded-lg cursor-pointer">
                <h2>{getCurrentControl.label}</h2>
                <Input onChange={handleFileChange} id= {getCurrentControl.name} />
            </Label>
            break;

      default:
         content = (
          <div className="relative flex item-center mt-8">
            <Input
              type="text"
              disabled={getCurrentControl.disabled}
              placeholder={getCurrentControl.placeholder}
              name={getCurrentControl.name}
              id={getCurrentControl.name}
              value={formData[getCurrentControl.name]}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  [event.target.name]: event.target.value,
                })
              }
              className="w-full rounded-md h-[60px] px-4 border bg-gray-100 text-lg outline-none drop-shadow-sm transition-all duration-200 easy-in-out focus:bg-white focus:drop-shadow-lg focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 "
            />
          </div>
        );
        break;
    }
    return content
  }

  return (
    <form action={action}>
      {formControls.map((control) => renderInputComponentType(control))}

      <div className="mt-6 w-full">
        <Button
          disabled={isBtnDisabled}
          type={btnType || "submit"}
          className="disabled:opacity-60 flex h-11 items-center justify-center px-5"
        >
          {buttonText}
        </Button>
      </div>
    </form>
  );
}

export default CommonForm;
