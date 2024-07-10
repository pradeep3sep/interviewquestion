import { reactChallengesMap } from "@/utils/Path";
import { Link } from "react-router-dom";


export default function Test() {
  const data = Object.keys(reactChallengesMap)
  
  return (
    <>
      <div>Home Page</div>
      <div>
        {data.length && data.map(e => <p key={e}><Link to={e}>{e}</Link></p>)}
      </div>
    </>
  )
}