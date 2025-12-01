import { Label } from "../ui/label"
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "@/components/ui/textarea"

function CommonForm({
  action,
  buttonText,
  isBtnDisabled,
  formControls,
  btnType,
  formData,
  setFormData,
  handleFileChange
}) {
  function renderInputComponentType(getCurrentControl) {
    let content = null;

    switch (getCurrentControl.componentType) {
      case "input":
        content = (
          <div className="relative flex item-center mt-8">
            <Input
              type= "text"
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

      case "textarea":  
        content = (
          <div className="relative flex items-center mt-8">
            <Textarea
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
              className="w-full rounded-md min-h-[120px] px-4 py-3 border bg-gray-100 text-lg outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:drop-shadow-lg focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
        )
        break

        // case "file":
        //     content = (
        //   <Label
        //     htmlFor={getCurrentControl.name}
        //     className="flex bg-gray-100 dark:bg-black items-center px-3 py-3 mx-auto mt-6 text-center border-2 border-dashed rounded-lg cursor-pointer"
        //   >
        //     <h2>{getCurrentControl.label}</h2>
        //     <Input
        //       onChange={handleFileChange}
        //       id={getCurrentControl.name}
        //       type="file"
        //     />
        //   </Label>
        // );

        //     break;


        case "file":
  content = (
    <Label
      htmlFor={getCurrentControl.name}
      className="flex bg-gray-100 dark:bg-black items-center px-3 py-3 mx-auto mt-6 text-center border-2 border-dashed rounded-lg cursor-pointer"
    >
      <h2>{getCurrentControl.label}</h2>
      <Input
        id={getCurrentControl.name}
        type="file"
        onChange={(e) => handleFileChange && handleFileChange(e.target.files[0])}
        // className="hidden"
      />
    </Label>
  );
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
          {formControls.map((control, index) => (
      <div key={control.name || index}>
        {renderInputComponentType(control)}
      </div>
    ))}

      <div className="mt-6 w-full">
        <Button
          disabled={isBtnDisabled}
          type={btnType || "submit"}
          className="disabled:opacity-60 flex h-11 items-center justify-center px-5 bg-violet-600 text:white hover:bg-violet-700"
        >
          {buttonText}
        </Button>
      </div>
    </form>
  );
}

export default CommonForm;
