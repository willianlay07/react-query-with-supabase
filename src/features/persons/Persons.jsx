import { useQuery } from "@tanstack/react-query";
import { getPersonal } from "../../services/apiPersonal";
import PersonList from "./PersonList";

const Persons = () => {
  const { isLoading, data } = useQuery({
    queryKey: ["personal"],
    queryFn: getPersonal,
    //refetchInterval: 3000,
  });

  if (isLoading) return <p>Loading</p>;

  return (
    <div>
      <h1>Persons</h1>
      <ul style={{ listStyleType: "none" }}>
        {data.map((each) => (
          <PersonList key={each.id} eachPerson={each} />
        ))}
      </ul>
    </div>
  );
};

export default Persons;
