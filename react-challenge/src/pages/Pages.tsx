import { reactChallengesMap } from "@/utils/Path";
import { useParams } from "react-router-dom";

function Pages() {
  const params = useParams();
  const id = params?.id ?? '';

  return (
    <>
      <div className="container">{reactChallengesMap[id]}</div>
    </>
  );
}

export default Pages;