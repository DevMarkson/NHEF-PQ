// src/app/profile/page.tsx
export default function Profile() {
    return (
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">Your Profile</h1>
        <div className="bg-white rounded-lg shadow p-6 w-full max-w-md">
          <p className="text-gray-700">
            This page will display your user information and progress tracking details.
          </p>
        </div>
      </div>
    );
}
