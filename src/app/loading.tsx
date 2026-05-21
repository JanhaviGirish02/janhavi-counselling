export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-beige-50">
      <div className="text-center space-y-4">
        <div className="w-12 h-12 border-3 border-sage-300 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-charcoal-lighter text-sm">Loading...</p>
      </div>
    </div>
  );
}
