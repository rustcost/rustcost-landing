export default function TopBar() {
  return (
    <div className="w-full bg-gray-100 text-gray-600  text-sm py-1">
      <div className="container mx-auto flex justify-between items-center px-4">
        <p>This banner is visible only in development mode.</p>
      </div>
    </div>
  );
}
