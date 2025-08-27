
import FormComponent from "@/components/forms/FormComponent"

function HomePage() {
    return (
        <div className="flex bg-black min-h-max flex-col items-center justify-center gap-2">
            <div className=" flex h-full min-w-full flex-col items-center justify-evenly sm:flex-row sm:pt-0">
                <div className="flex w-full items-center justify-center sm:w-1/2">
                    <FormComponent />
                </div>
            </div>
        </div>
    )
}

export default HomePage
