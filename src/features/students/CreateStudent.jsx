import { styled, css } from "styled-components";
import { useForm } from "react-hook-form";

import FormRow from "../../ui/FormRow";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditStudent } from "../../services/apiStudents";

const StyledDiv = styled.div`
  width: 900px;
  height: auto;
  background-color: #f9fafb;
  border-bottom: 1px solid #f3f4f6;
  padding: 10px 10px;
`;

const CreateStudent = ({ setNewStudent, studentToEdit = {} }) => {
  // For Edit -- START;
  const { id: editId, ...editValues } = studentToEdit;
  const isEditSession = Boolean(editId);
  // For Edit -- END;

  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  const queryClient = useQueryClient();

  // Create New Student;
  const { isPending: isInserting, mutate: mutateNewStudent } = useMutation({
    mutationFn: createEditStudent,
    onSuccess: () => {
      alert("Success");

      queryClient.invalidateQueries({
        queryKey: ["students"],
      });

      reset();
      setNewStudent(false);
    },
    onError: (error) => alert(error.message),
  });

  // Edit Student
  const { isPending: isEditing, mutate: mutateEditStudent } = useMutation({
    mutationFn: (x) => createEditStudent(x.newStudentData, x.id),
    onSuccess: () => {
      alert("Success Updated");

      queryClient.invalidateQueries({
        queryKey: ["students"],
      });

      reset();
    },
    onError: (error) => alert(error.message),
  });

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession) {
      mutateEditStudent({
        newStudentData: {
          ...data,
          image,
        },
        id: editId,
      });
    } else {
      mutateNewStudent({
        ...data,
        image: data.image[0],
      });
    }
  }

  function onError() {}

  const isWorking = isInserting || isEditing;

  return (
    <div>
      <h1>{isEditSession ? "Edit Student" : "Create Student"}</h1>
      <StyledDiv>
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
          <FormRow label="Full Name" error={errors?.fullname?.message}>
            <Input
              type="text"
              id="fullname"
              {...register("fullname", {
                required: "Enter the student name",
              })}
            />
          </FormRow>

          <FormRow label="Mobile" error={errors?.mobile?.message}>
            <Input
              type="text"
              id="mobile"
              {...register("mobile", {
                required: "Enter the mobile number",
              })}
            />
          </FormRow>

          <FormRow label="Email Address" error={errors?.email?.message}>
            <Input
              type="text"
              id="email"
              {...register("email", {
                required: "Enter the email address",
              })}
            />
          </FormRow>

          <FormRow label="Profile Photo" error={errors?.image?.message}>
            <FileInput
              id="image"
              accept="image/*"
              {...register("image", {
                required: isEditSession ? false : "Profile photo required",
              })}
            />
          </FormRow>

          <button disabled={isWorking}>
            {isEditSession ? "Update Student" : "Create Student"}
          </button>
        </Form>
      </StyledDiv>
    </div>
  );
};

export default CreateStudent;

const Form = styled.form`
  ${(props) =>
    props.type !== "modal" &&
    css`
      padding: 2.4rem 4rem;

      /* Box */
      background-color: #fff;
      border: 1px solid f3f4f6;
      border-radius: 7px;
    `}

  ${(props) =>
    props.type === "modal" &&
    css`
      width: 80rem;
    `}
    
  overflow: hidden;
  font-size: 1.4rem;
`;

const Input = styled.input`
  border: 1px solid #d1d5db;
  background-color: #fff;
  border-radius: 5px;
  padding: 0.8rem 1.2rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
`;

const FileInput = styled.input.attrs({ type: "file" })`
  font-size: 14px;
  border-radius: 5px;

  &::file-selector-button {
    font: inherit;
    font-weight: 500;
    padding: 0.8rem 1.2rem;
    margin-right: 1.2rem;
    border-radius: 5px;
    border: none;
    color: #eef2ff;
    background-color: #4f46e5;
    cursor: pointer;
    transition: color 0.2s, background-color 0.2s;

    &:hover {
      background-color: #4338ca;
    }
  }
`;
