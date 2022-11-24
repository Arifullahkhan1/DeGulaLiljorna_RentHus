import React, { useState } from "react";
import "./comments.css";
import { Add, Delete, Edit } from "@material-ui/icons";
import "bootstrap/dist/css/bootstrap.min.css";

const Comments = () => {

    const [values, setValues] = useState("");
    const [items, setItems] = useState([]);
    const [toggleBtn, setToggleBtn] = useState(false);
    const [editItems, setEditItems] = useState(null)

    const inputValue = (e) => {
        setValues(e.target.value);
    };
    const GetValue = () => {
        if (values === "") {
            alert('Please Enter Before Adding...')
        } else if (values !== '' && toggleBtn !== false) {
            setItems(
                items.map((elem) => {
                    if (elem.id === editItems) {
                        return { ...elem, name: values }
                    }
                    return elem
                })
            )
            setToggleBtn(false)
            setValues('')
            setEditItems(null)
        } else {
            const UpdateAllItems = { id: new Date().getTime().toString(), name: values }
            setItems([...items, UpdateAllItems]);
            setValues("");
        }
    };

    const DeletedItems = (index) => {
        const updateditems = items.filter((Element) => {
            return (
                Element.id !== index
            )
        })
        setItems(updateditems)
        setValues('')
        setToggleBtn(false)
    }

    const RemoveAll = () => {
        setItems([])
        setValues('')
        setToggleBtn(false)
    }

    const EditItems = (id) => {
        // Getting id
        const GetId = items.find((elem) => {
            return (
                elem.id === id
            )
        })
        setToggleBtn(true)
        setValues(GetId.name)
        setEditItems(id)

        console.log(GetId)
    }

    return (
        <>
            <div className="main-div ">
                <div className="child-div">
                    {/* <Description className="todolog" /> */}
                    {/* <h1>Add Your Feedback✌ </h1> */}

                    <div className=" d-flex ">
                        <input
                            type="text"
                            placeholder="✍ comments"
                            value={values}
                            onChange={inputValue}
                        />
                        {
                            toggleBtn ? (
                                <>
                                    <button className="" onClick={GetValue}>
                                        <Edit />
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button className="btn plusbtn mt-3" onClick={GetValue}>
                                        <Add />
                                    </button>
                                </>
                            )
                        }
                    </div>
                    {
                        items.map((Element) =>
                        <>
                            <div className="showitems d-flex justify-content-between mt-5" key={Element.id}>
                                <div className="mt-2 feedback">{Element.name}</div>
                                
                            </div>
                            <button className="btn edit editbth" onClick={() => EditItems(Element.id)}>
                            <Edit />
                        </button>
                        <button className="btn delete" onClick={() => DeletedItems(Element.id)}>
                            <Delete />
                        </button>
                        </>
                        )
                    }

                   {/*  <div className="button mt-5">
                        <button className="btn btn-secondary" onClick={RemoveAll}>Clear List</button>
                    </div> */}
                </div>
            </div>
        </>
    );
};

export default Comments;
