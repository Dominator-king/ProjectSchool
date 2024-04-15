import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { faPerson } from "@fortawesome/free-solid-svg-icons/faPerson";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { studentData as students } from "../../data";
import { faPersonDress } from "@fortawesome/free-solid-svg-icons/faPersonDress";
import { faUserGraduate } from "@fortawesome/free-solid-svg-icons/faUserGraduate";
import { GuageChart } from "@/components/ui/GuageChart";
import { BarChartHorizontal } from "@/components/ui/BarChartHorizontal";
import BarChartVertical from "@/components/ui/BarChartVertical";
import { columns } from "./columns";
import { DataTable } from "./data-table";
export default function Home() {
  const mathAvg =
    students.map((student) => student.maths).reduce((a, b) => a + b, 0) /
    students.length;
  const engAvg =
    students.map((student) => student.english).reduce((a, b) => a + b, 0) /
    students.length;
  const phyAvg =
    students.map((student) => student.physics).reduce((a, b) => a + b, 0) /
    students.length;
  const chemAvg =
    students.map((student) => student.chemistry).reduce((a, b) => a + b, 0) /
    students.length;
  const femaleStudents = students.filter(
    (student) => student.gender === "female"
  );
  const fiveStudents = students.slice(0, 8);
  const maleStudents = students.filter((student) => student.gender === "male");
  return (
    <div className=" m-6 shadow-xl p-6 grid  gap-4 lg:grid-rows-[150px_1fr] md:grid-cols-2 lg:grid-cols-4">
      <Card className="shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Male Students
          </CardTitle>
          <FontAwesomeIcon icon={faPerson} size="3x" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold -mt-2">{maleStudents.length}</div>
        </CardContent>
      </Card>
      <Card className="shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Female Students
          </CardTitle>
          <FontAwesomeIcon icon={faPersonDress} size="3x" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold"> {femaleStudents.length}</div>
        </CardContent>
      </Card>
      <Card className="shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Students</CardTitle>
          <FontAwesomeIcon icon={faUserGraduate} size="3x" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold -mt-2">{students.length}</div>
        </CardContent>
      </Card>
      <main className="md:col-span-2 shadow-lg lg:col-span-3 grid-rows-layout  grid grid-cols-2 ">
        <BarChartHorizontal male={maleStudents} female={femaleStudents} />
        <BarChartVertical male={maleStudents} female={femaleStudents} />
        <div className=" px-6 py-2 col-span-2">
          <DataTable columns={columns} data={students} />
        </div>
      </main>
      <div className=" shadow-xl m-6 lg:row-start-1 p-6 lg:row-end-3 ">
        <GuageChart type="Eng" marks={Number(mathAvg.toFixed(2))} />
        <GuageChart type="Maths" marks={Number(phyAvg.toFixed(2))} />
        <GuageChart type="Phy" marks={Number(chemAvg.toFixed(2))} />
        <GuageChart type="Eng" marks={Number(engAvg.toFixed(2))} />
      </div>
    </div>
  );
}
