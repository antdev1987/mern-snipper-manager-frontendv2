import React from 'react'

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { useSnippet } from '../context/snippetContext/SnippetProvider';


const ProjectSchema = Yup.object().shape({
    projectName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
    description: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});
  


const ProjectForm = () => {

    const {newSnippetProjectfn} = useSnippet()

  return (
    <div className="form-box bg-info mx-2 rounded text-dark px-1 py-2 ">
      <h3 className="mb-2 text-center">Create Directory</h3>
    
      {/* {alerta && <Alerta>{alerta}</Alerta>} */}

      <Formik
        initialValues={{
          projectName: "",
          description: "",
        }}
        validationSchema={ProjectSchema}
        onSubmit={(values) => {
          // same shape as initial values
        //   values.id = Math.random().toString()
        //   values.snippets = []
        //  setProject(values)
        console.log(values)
        newSnippetProjectfn(values)

        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="mb-2">
              <label className="">Folder Name</label>
              <Field name="projectName" className="form-control p-1" />
              {errors.projectName && touched.projectName ? <div className="text-center mt-2 bg-warning fw-bold p-1 rounded">{errors.projectName}</div> : null}
            </div>

            <div className="mb-2">
              <label className="">Description</label>
              <Field name="description" className="form-control p-1" type="text" />
              {errors.description && touched.description ? (
                <div className="text-center mt-2 bg-warning fw-bold p-1 rounded">{errors.description}</div>
              ) : null}
            </div>

            <button type="submit" className="btn w-100 btn-primary">
              Crear
            </button>
          </Form>
        )}
      </Formik>

  
    </div>
  );
  
}

export default ProjectForm