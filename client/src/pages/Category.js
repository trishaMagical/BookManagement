import React, { Component } from 'react'
import axios from "axios";
import {Link} from 'react-router-dom'
 

export default class Category extends Component {
    state = {
        input: "",
        data: [],
        // edit: -1,
        // update:""
      }
      handleChange = (e) => {
        this.setState({ input: e.target.value });
    
      }
      async componentDidMount() {

       
        let post = await axios
          .get(`http://localhost:5002/allcategory`)
    
        console.log("post", post.data);
        this.setState( post.data )
        
      }
      addCategory = async () => {
        
        axios
          .post(`http://localhost:5002/insertcategory`,
            { category: this.state.input },
            window.location = "/Category"
          )
    
    
      }
      edit = (id)=>{
        console.log("id", id);
        this.setState({ edit:id })
      }
      handleEditChange = (e,id) =>{
        let data=[...this.state.data]
        console.log("Dataabcdfjhgj", data);
        let ind= data.findIndex(s1=>s1.id===id)
        console.log("Index", ind,id);
        let obj= data[ind]
        obj["categoryname"]= e.target.value
        console.log("OBJ", obj);
        data[ind]=obj
       this.setState({data})
      }
      editCategory = async(id) => {
        console.log("Idddd", id);
        let data=[...this.state.data]
        let obj = data.find(s1=>s1.id===id)
        console.log("id", id);
        axios
        .put(`http://localhost:5002/updatecategory/${id}`,
          { category: obj.category }
         
        )
        this.setState({Index:-1})
        window.location = "/Category"
    } 
      deleteCategory = async (id) =>{
        
        console.log("ABCDRtyxse", id);
        axios
          .get(`http://localhost:5002/deletecategory/${id}`,
    
            window.location = "/Category"
          )
      }
  render() {
    return (
      <div><h1>Category</h1>
        <input
          placeholder="Add a Book Category"
          name="text"
          className="todo-input"

          onChange={this.handleChange}
           value={this.state.input}
        />
         <button onClick={this.addCategory} className="todo-button">
          Add Category
        </button>
        
        {this.state.data.map((val, index) =>
          <div key={index}>

            {val.category}

            <div>
              <button onClick={()=>this.edit(val.id)}>Edit</button>
              {
                val.id === this.state.edit ?
                <div>
                 <input
                value={val.category}
                  placeholder="Update a Category"
                  name="text"
                  className="todo-input"
                  onChange={(e)=>this.handleEditChange(e,val.id)}
                 
                /> 
                <button onClick={()=>this.editCategory(val.id)}>Save</button>
                </div>

                :
                <div>
                 </div>
                
              }
             
            </div>
            <div>
              <button onClick={() => this.deleteCategory(val.id)}>Delete</button>
            </div>
            <div>
              
            <Link to={"/Todo?categoryname="+val.categoryname}  >
          <button >Go To Todo</button>
        </Link>
             
              
            </div>
          </div>

        )}
      </div>
    )
  }
}
