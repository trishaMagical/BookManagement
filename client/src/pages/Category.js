import React, { Component } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom'
import "./Category.css"


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
        console.log("Trisha", this.state.input);
        const data = JSON.parse(localStorage.getItem("userInfo"));
        console.log("data", data);


        let post = await axios
            .get(`http://localhost:5002/allcategory/${data.email}`)

        console.log("post", post.data);
        this.setState({ data: post.data })

    }
    addCategory = async () => {
        console.log("Trisha", this.state.input);
        const data = JSON.parse(localStorage.getItem("userInfo"));
        console.log("data", data);

        axios
            .post(`http://localhost:5002/insertcategory/${data.email}`,
                { category: this.state.input },
                window.location = "/Category"
            )


    }
    edit = (id) => {
        console.log("id", id);
        this.setState({ edit: id })
    }
    handleEditChange = (e, id) => {
        let data = [...this.state.data]
        console.log("Dataabcdfjhgj", data);
        let ind = data.findIndex(s1 => s1.id === id)
        console.log("Index", ind, id);
        let obj = data[ind]
        obj["category"] = e.target.value
        console.log("OBJ", obj);
        data[ind] = obj
        this.setState({ data })
    }
    editCategory = async (id) => {
        console.log("Idddd", id);
        let data = [...this.state.data]
        let obj = data.find(s1 => s1.id === id)
        console.log("id", id);

        console.log("Trisha", this.state.input);
        const datavalue = JSON.parse(localStorage.getItem("userInfo"));
        console.log("datavalue", datavalue);

        axios
            .put(`http://localhost:5002/updatecategory/${id}/${datavalue.email}`,
                { category: obj.category }

            )
        this.setState({ Index: -1 })
        window.location = "/Category"
    }
    deleteCategory = async (category) => {

        console.log("Trisha", this.state.input);
        const data = JSON.parse(localStorage.getItem("userInfo"));
        console.log("data", data);

        console.log("ABCDRtyxse", category);
        axios
            .get(`http://localhost:5002/deletecategory/${data.email}/${category}`,

                window.location = "/Category"
            )
    }
    render() {
        return (
            <>
                <nav className="navbar navbar-expand-lg navbar-light bg-danger ">
                    <a className="navbar-brand text-white" href="#">Welcome</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            {/* <li className="nav-item active">
                        <a className="nav-link text-white" href="/Home">Profile </a>
                    </li> */}
                            <li className="nav-item ">
                                <a className="nav-link text-white" href="/Category">Category</a>
                            </li>
                            <li className="nav-item ms-auto">
                                <a className="nav-link text-white" href="/logout">Log Out</a>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div style={{ marginTop: "100px" }}>
                    <label className='labelContainer'>Book Category</label>

                    <br />
                    <input
                        placeholder="Add a Book Category"
                        name="text"
                        className="todo-inputAdd"

                        onChange={this.handleChange}
                        value={this.state.input}
                    />
                    <br/>
                    <br />
                    <button className="btn-add" onClick={this.addCategory} >
                        Add Category
                    </button>
                    <div className='tableclass'>


                        <table className=" styled-table" >
                            <thead>

                                <tr >
                                    <th style={{ textAlign: "center" }}>Category</th>

                                    <th style={{ textAlign: "center" }}>Actions</th>
                                </tr>

                            </thead>
                            <tbody >
                                {this.state.data.map((val, index) => {

                                    return (
                                        <tr >
                                            <td key={index}>
                                                {val.category}
                                                {
                                                    val.id === this.state.edit ?
                                                        <div>
                                                            <input
                                                                value={val.category}
                                                                placeholder="Update a Category"
                                                                name="text"
                                                                className="todo-input"
                                                                onChange={(e) => this.handleEditChange(e, val.id)}

                                                            />
                                                            <button onClick={() => this.editCategory(val.id)}>Save</button>
                                                        </div>

                                                        :
                                                        <div>
                                                        </div>

                                                }
                                            </td>
                                            <td>
                                                <button className="btn-edit" onClick={() => this.edit(val.id)}>Edit</button>

                                                <button className="btn-delete" onClick={() => this.deleteCategory(val.category)}>Delete</button>
                                                <a href={"/Todo?category=" + val.category}  >
                                                    <button className="btn-view">Go</button>
                                                </a>



                                            </td>



                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>

                    </div>
                </div>

            </>

        )
    }
}
