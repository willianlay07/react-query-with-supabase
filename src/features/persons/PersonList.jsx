import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePersonal } from "../../services/apiPersonal";
import { toast } from "react-hot-toast";

const PersonList = ({ eachPerson }) => {
  const { id, fullname, age } = eachPerson;

  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate } = useMutation({
    mutationFn: (id) => deletePersonal(id),
    onSuccess: () => {
      toast.success("Successfully deleted.");

      queryClient.invalidateQueries({
        queryKey: ["personal"],
      });
    },
    onError: (error) => toast.error(error.message),
  });

  return (
    <li style={{ borderBottom: "1px solid #ddd" }}>
      <p>FullName: {fullname}</p>
      <p>
        Age: {age}
        {` `}
        <button onClick={() => mutate(id)} disabled={isDeleting}>
          Delete Me
        </button>
      </p>
    </li>
  );
};

export default PersonList;
