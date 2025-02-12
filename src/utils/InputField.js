import { convertToRaw, EditorState } from "draft-js";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Editor } from "react-draft-wysiwyg";

const InputField = ({ label, type, placeholder, required, setValue, ...props }) => {
    const [editorState,setEditorState] = useState(EditorState.createEmpty());

    const onEditorStateChange = (state) => {
        setEditorState(state);
        
        const rawContent = convertToRaw(state.getCurrentContent());
        setValue(`${props.name}`, rawContent);
    }

    return (
        <React.Fragment>
            <Form.Group className="mb-3">
                {label && <Form.Label>{label}</Form.Label>}
                {type === "rte" ? (
                    <Editor 
                        editorState={editorState} 
                        onEditorStateChange={onEditorStateChange}
                        toolbarClassName="mx-2"
                        wrapperClassName="form-control px-0"
                        editorClassName="editorClassName"
                    />
                ) : (
                    <Form.Control type={type} placeholder={placeholder} required={required} {...props}/>
                )}
                
            </Form.Group>
        </React.Fragment>
    )
};
export default InputField;