import { useState } from 'react'
import PostComments from './PostComments'
import PostContent from './PostContent'
import postData from '../postData'
import { useForm } from 'react-hook-form'

export default function DebatePost() {
  /* Challenge 

Form çalışmıyor. Göreviniz, kullanıcı "Gönder "e tıkladığında gönderiye bir yorum ekleyen kontrollü bir form yapmaktır.

    1. Yorum, yorum dizisinin alt kısmında, girilen kullanıcı adı ve yorum metni önceki yorumlar gibi görüntülenecek şekilde görünmelidir. 
       
    2. Yorum, önceki yorumların verilerini içeren array'e eklenmelidir. 
    
    3. Girilen kullanıcı adı kaydedilmeli, ancak kullanıcı onay kutusunu işaretlerse "AnonimKullanıcı" olarak görünmelidir.
    
    4. Kullanıcı formu göndermek için text input elemanına ve comment box elemanına metin girmek zorunda olmalı ve kullanıcı bir yorum gönderdikten sonra elemanlar ve onay kutusu temizlenmelidir. Sayfa yüklendiğinde de boş olmalıdırlar.   
        
    5. Kodunuz tamamen bu dosyanın içinde yer alabilir, ancak isterseniz bazı kısımları taşıyabilirsiniz. 

*/

  const [comments, setComments] = useState(postData.comments)
  const [value, setValue] = useState("")
  const [commentValue, setCommentValue] = useState("")

  const {register, handleSubmit, formState: {errors, isSubmitting}, setError}= useForm()


  const onSubmit= async (data)=>{
    try{
        await new Promise((resovle)=> setTimeout(resovle, 500))

        const newComment = {   id: crypto.randomUUID(),
        userName: data.anonymous ? "AnonimKullanıcı" : data.firstName,
        isAnonymous: data.anonymous ? true : false,
        commentText: data.comment }

        setComments([...comments, newComment])



        setValue("")
        setCommentValue("")
    
    } catch (error) {
         setError("root", {message: "Kullanıcı adı kayıtlı değil"})
    }
  
}


  return (
    <div className='post-container'>
      <PostContent data={{ ...postData }} />
      <PostComments data={comments} />

      <form onSubmit={handleSubmit(onSubmit)}>


       <input {...register("firstName", {required:"Kullanıcı adı gerekli", validate: (value)=> {if (!/^[a-zA-Z ]*$/.test(value)) {
        return "Lütfen geçerli bir kullanıcı adı girin.";
        } return true
        }})}type="text" value={value} onChange={(e)=>setValue(e.target.value)} className='text-input' placeholder="Kullanıcı adı girin" />
        {errors.firstName && <p className="text-red-600">{errors.firstName.message}</p>}



        <textarea  {...register("comment", {required:"Yorumunuz ekleyin."})} value={commentValue} onChange={(e)=>setCommentValue(e.target.value)} placeholder='Ne düşünüyorsunuz?' />
        {errors.comment && <p className="text-red-600">{errors.comment.message}</p>}

        <label>
          <input  {...register("anonymous")} className='checkbox' type='checkbox' />
          İsimsiz mi göndereyim? 
        </label>


        <button>{isSubmitting ? "Göderiliyor..." : "Gönder"}</button>
      </form>



    </div>
  )
}
