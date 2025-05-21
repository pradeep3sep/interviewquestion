import { useEffect, useState,ChangeEvent } from "react"

interface Quote {
  quote: string;
  author: string;
}

export default function Quotegenerator() {
  const [content, setcontent] = useState<string>('')
  const [author, setauthor] = useState<string>('')
  const [inputval, setinputval] = useState<string>('')
  

  useEffect(() => {
    generator()
  }, [])


  async function generator(){
    try {
      const res = await fetch('https://dummyjson.com/quotes/random/1'+ inputval)
      const data: Quote[] = await res.json()
      setcontent(data[0].quote)
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

      <input type='text' title='tags' onChange={(e: ChangeEvent<HTMLInputElement>)=> setinputval(e.target.value)}/>
      <button onClick={generator}>Generate</button>
    </>
  )
}