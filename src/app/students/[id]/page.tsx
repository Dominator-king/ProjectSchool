import Link from "next/link";
import { studentData } from "../../../../data";
import fs from "fs/promises";
import { Student } from "@/app/columns";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
export default function StudentPage({ params }: { params: { id: string } }) {
  const student = studentData.find(
    (student) => student.id === Number(params.id)
  ) as Student;
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">Student Details</h1>
      {student && <StudentForm student={student} />}
    </div>
  );
}
async function updateData(formData: FormData) {
  "use server";
  const student = {
    gender: formData.get("gender"),
    id: Number(formData.get("id")),
    name: formData.get("name") as string,
    maths: Number(formData.get("maths")),
    physics: Number(formData.get("physics")),
    chemistry: Number(formData.get("chemistry")),
    english: Number(formData.get("english")),
  };
  const newStudentData = studentData.map((s) =>
    s.id === student.id ? student : s
  );
  // Save the new data to the database
  await fs.writeFile(
    "data.js",
    `export const studentData = ${JSON.stringify(newStudentData)}`
  );
  // Redirect the user back to the homepage
  revalidatePath("/");
  redirect("/");
}
function StudentForm({ student }: { student: Student }) {
  return (
    <form action={updateData} className="container">
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4">
          <label htmlFor="id" className="mb-2 block text-sm font-medium">
            ID
          </label>
          <input
            id="id"
            name="id"
            type="text"
            defaultValue={student.id}
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
            readOnly
          />
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Change Name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name"
                name="name"
                type="text"
                defaultValue={student.name}
                placeholder="Enter USD amount"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
          <div className="mt-4 mb-4">
            <label htmlFor="gender" className="mb-2 block text-sm font-medium">
              Gender
            </label>
            <select name="gender" defaultValue={student.gender}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          {/** Add a new input field for each subject */}
          <div className="mb-4">
            <label htmlFor="maths" className="mb-2 block text-sm font-medium">
              Maths
            </label>
            <input
              id="maths"
              name="maths"
              type="number"
              defaultValue={student.maths}
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="physics" className="mb-2 block text-sm font-medium">
              Physics
            </label>
            <input
              id="physics"
              name="physics"
              type="number"
              defaultValue={student.physics}
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="chemistry"
              className="mb-2 block text-sm font-medium"
            >
              Chemistry
            </label>
            <input
              id="chemistry"
              name="chemistry"
              type="number"
              defaultValue={student.chemistry}
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="english" className="mb-2 block text-sm font-medium">
              English
            </label>
            <input
              id="english"
              name="english"
              type="number"
              defaultValue={student.english}
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
            />
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <button
          type="submit"
          className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </form>
  );
}
