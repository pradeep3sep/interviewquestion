import { useEffect, useState } from "react"

export default function Quotegenerator() {
  const [content, setcontent] = useState('')
  const [author, setauthor] = useState('')
  const [inputval, setinputval] = useState('')
  

  useEffect(() => {
    generator()
  }, [])


  async function generator(){
    try {
      const res = await fetch('https://api.quotable.io/quotes/random?tags='+ inputval)
      const data = await res.json()
      setcontent(data[0].content)
      setauthor(data[0].author)
    } catch (error) {
      console.log(error);
      setcontent('error')
      setauthor('error')
    }
  }

  // This part is important, show blank div unitll api result come
  if (!content) {
    return <div/>; 
  }
  
  return (
    <>
      <h2>{content}</h2>
      <p>- {author}</p>

      <input type='text' title='tags' onChange={(e)=> setinputval(e.target.value)}/>
      <button onClick={generator}>Generate</button>
    </>
  )
}