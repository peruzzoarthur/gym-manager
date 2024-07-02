import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/')({
    component: Index,
})

function Index() {
    return (
        <>
            <div className="flex flex-col items-center justify-center w-full p-40 mt-10 text-4xl">
                Hello! Welcome to ColdGymSoftware 🥶 v0.0
            </div>
        </>
    )
}
