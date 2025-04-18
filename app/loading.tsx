export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    </div>
  )
}
