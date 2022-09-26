import React from "react";
import SearchBox from "../../LessonDetail/RollCall/SearchBox";
import GoBack from "../../Utils/GoBack";
import ShowStudent from "./ShowStudent";

function ListStudent({ match }) {
  const { listId } = match.params;

  return (
    <div>
      <GoBack />
      <SearchBox title="Danh sách học sinh" />
      <ShowStudent listId={listId} match={match} />
    </div>
  );
}

export default ListStudent;
