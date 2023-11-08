import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getStudents } from "../services/apiStudents";
import StudentRow from "../features/students/StudentRow";
import { useState } from "react";
import CreateStudent from "../features/students/CreateStudent";

const Table = styled.div`
  border: 1px solid #e5e7eb;
  font-size: 13px;
  background-color: #fff;
  border-radius: 7px;
  overflow: hidden;
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: #f9fafb;
  border-bottom: 1px solid #f3f4f6;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: #4b5563;
  padding: 1rem 2.4rem;
`;

const Students = () => {
  const [newStudent, setNewStudent] = useState(false);

  const { isLoading, data } = useQuery({
    queryKey: ["students"],
    queryFn: getStudents,
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Students</h1>
      <button onClick={() => setNewStudent((prev) => !prev)}>
        Add New Student
      </button>

      <Table role="table">
        <TableHeader role="row">
          <div>Image</div>
          <div>Full Name</div>
          <div>Mobile</div>
          <div>Email</div>
          <div>Action</div>
          <div>Action</div>
        </TableHeader>
        {data.map((student) => (
          <StudentRow key={student.id} student={student} />
        ))}
      </Table>

      {newStudent && <CreateStudent setNewStudent={setNewStudent} />}
    </div>
  );
};

export default Students;
