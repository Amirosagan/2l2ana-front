const AddUserPage = () => {
    return ( 

      <div className="bg-admin1 p-5 rounded-lg mt-5 "> 
        <form action="" className="flex  flex-wrap justify-between form1">
          <input type="text" placeholder="title" name="title" required />
          <select name="cat" id="cat"> 
            <option value="general" > Choose a Category</option>
            <option value="جلدية" > جلدية</option>
            <option value="انف واذن" > أنف واذن</option>
            <option value="باطنة" > باطنة </option>
          </select>
          <input type="number" placeholder="price" name="price"/>
          <input type="date" placeholder="time" name="time"/>
          <input type="number" placeholder="phone number" name="phone number"/>
          <input  type="password" placeholder="password" name="password"/>
          <textarea  className="w-full h-36"
          name="desc"
          id="desc"
          rows="16"
          placeholder="Description"></textarea>
          <button className="border-none hover:bg-white rounded-md p-8 w-full bg-white/70 text-admin1 font-bold" type="submit">Submit</button>
        </form>
      </div>


     );
}
 
export default AddUserPage;