import React, { Component } from 'react'
import axios from "axios";
export default class Todo extends Component {
    state = {
        input: "",
        data: [],
        edit: -1,
        update: ""
    }
    handleChange = (e) => {
        this.setState({ input: e.target.value });

    }
    async componentDidMount() {

        const query = new URLSearchParams(this.props.location.search);
        let category = query.get("category")
        console.log("categoryname", category);

        

        let post = await axios
            .get(`http://localhost:5002/allbooks/${category}`)

        console.log("Datapost", post.data);
        this.setState({data:post.data})

    }

    addTodo = async () => {
        const query = new URLSearchParams(this.props.location.search);
        let category = query.get("category")
        console.log("categoryname", category);

        console.log("Trisha", this.state.input);
      
        

        axios
            .post(`http://localhost:5002/insertbooks/${category}`,
                { bookname: this.state.input },
                window.location = "Todo?category=" + category

            )

    }
    edit = (id) => {
        console.log("id", id);
        this.setState({ edit: id })
    }

    editTodo = async (id) => {
        const query = new URLSearchParams(this.props.location.search);
        let category = query.get("category")
        console.log("category", category);
        console.log("Idddd", id);
        let data = [...this.state.data]
        let obj = data.find(s1 => s1.id === id)
        console.log("id", id);

        axios
            .put(`http://localhost:5002/updatebooks/${id}`,
                { bookname: obj.bookname }

            )
        this.setState({ Index: -1 })
        window.location = "Todo?category=" + category
    }
   
    handleEditChange = (e, id) => {
        let data = [...this.state.data]
        console.log("Dataabcdfjhgj", data);
        let ind = data.findIndex(s1 => s1.id === id)
        console.log("Index", ind, id);
        let obj = data[ind]
        obj["bookname"] = e.target.value
        console.log("OBJ", obj);
        data[ind] = obj
        this.setState({ data })
    }
    deleteTodo = async (id) => {
        const query = new URLSearchParams(this.props.location.search);
        let category = query.get("category")
        console.log("categoryname", category);

        console.log("ABCDRtyxse", id);
        axios
            .get(`http://localhost:5002/deletebooks/${id}`,

                window.location = "Todo?category=" + category
            )

    }

    render() {
        return (
            <div><h1>Book Name</h1>
                <input
                    placeholder="Add a Book Name"
                    name="text"
                    className="todo-input"
                    value={this.state.input}
                    onChange={this.handleChange}
                />
                <button onClick={this.addTodo} className="todo-button">
                    Add Books
                </button>
                {
                        this.state.data.map((val, index) =>
                            <div key={index}>
                                {val.bookname}

                                <div>
                                    <button onClick={() => this.edit(val.id)}>Edit</button>
                                    {
                                        val.id === this.state.edit ?
                                            <div>
                                                <input
                                                    value={val.bookname}
                                                    placeholder="Update a Book Name"
                                                    name="text"
                                                    className="todo-input"
                                                    onChange={(e) => this.handleEditChange(e, val.id)}

                                                />
                                                <button onClick={() => this.editTodo(val.id)}>Save</button>
                                            </div>

                                            :
                                            <div>
                                            </div>

                                    }

                                </div>

                                <div>
                                    <button onClick={() => this.deleteTodo(val.id)}>Delete</button>
                                </div>
                            </div>


                        )}



            </div>
        )
    }
}
