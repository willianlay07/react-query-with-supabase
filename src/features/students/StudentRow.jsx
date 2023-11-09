import { useMutation, useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import { deleteStudent } from "../../services/apiStudents";
import { useState } from "react";
import CreateStudent from "./CreateStudent";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: #fff;
  border-bottom: 1px solid #f3f4f6;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: #4b5563;
  padding: 1rem 2.4rem;
`;

const Img = styled.img`
  display: block;
  width: 3.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const StudentRow = ({ student }) => {
  const [showForm, setShowForm] = useState(false);
  const { id, image, fullname, mobile, email } = student;

  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: deleteStudent,
    onSuccess: () => {
      alert("Successfully deleted");

      queryClient.invalidateQueries({
        queryKey: ["students"],
      });
    },
    onError: (error) => alert(error.message),
  });

  return (
    <>
      <TableRow role="row">
        <div>
          <Img src={image} />
        </div>
        <div>{fullname}</div>
        <div>{mobile}</div>
        <div>{email}</div>
        <div>
          <button onClick={() => setShowForm((prev) => !prev)}>Edit</button>
        </div>
        <div>
          <button disabled={isPending} onClick={() => mutate(id)}>
            Delete
          </button>
        </div>
      </TableRow>

      {showForm && <CreateStudent studentToEdit={student} />}
    </>
  );
};

export default StudentRow;
